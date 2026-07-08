//==============================================================
// ETA PROFESSIONAL PWA
// engine/cal.js
// Cálculo de Dosagem de Cal Hidratada (Ca(OH)2)
// Versão revisada - Correção do volume para jarro
//==============================================================

import {
    salvarParametros,
    carregarParametros
} from "../js/storage.js";

let ultimoResultado = {};

//==============================================================
// VIEW
//==============================================================

export function calView() {
    const dados = carregarParametros("cal") || {};

    return `
<div class="modulo">
    <h2>🧪 Cal Hidratada - Ca(OH)₂</h2>

    <div class="card">
        <h3>Parâmetros da Água</h3>

        <label>Alcalinidade (mg/L CaCO₃)</label>
        <input id="cal_alc" type="number" step="any" value="${dados.alc ?? ""}">

        <label>pH Inicial</label>
        <input id="cal_ph_inicial" type="number" step="any" value="${dados.ph_inicial ?? ""}">

        <label>pH Final Desejado</label>
        <input id="cal_ph_final" type="number" step="any" value="${dados.ph_final ?? ""}">
    </div>

    <div class="card">
        <h3>Solução Mãe</h3>

        <label>Concentração da Solução Mãe (g/L)</label>
        <input id="cal_conc_mae" type="number" step="any" value="${dados.conc_mae_gL ?? "10"}">

        <label>Diluição da Solução Mãe (%)</label>
        <input id="cal_dil_percent" type="number" step="any" value="${dados.dil_percent ?? "1"}">

        <small>Exemplo: 1% = 10mL da solução mãe em 990mL de água</small>
    </div>

    <div class="card">
        <h3>Volume para Teste</h3>

        <label>Volume do Jarro (L)</label>
        <input id="cal_volume_jarro" type="number" step="any" value="${dados.volume_jarro ?? "2"}">
    </div>

    <div class="card">
        <button id="btnCalcularCAL">📊 Calcular</button>
        <button id="btnSalvarCAL">💾 Salvar</button>
        <button id="btnLimparCAL">🧹 Limpar</button>
        <button id="btnCopiarCAL">📋 Copiar Resultado</button>
    </div>

    <div class="card">
        <h3>Resultado</h3>
        <div id="cal_resumo">Aguardando cálculo...</div>
    </div>

    <div class="card">
        <h3>Dados Técnicos</h3>
        <pre id="cal_json"></pre>
    </div>
</div>
`;
}

//==============================================================
// INICIALIZAÇÃO
//==============================================================

export function inicializarCAL() {
    const btnCalc = document.getElementById("btnCalcularCAL");
    const btnSalvar = document.getElementById("btnSalvarCAL");
    const btnLimpar = document.getElementById("btnLimparCAL");
    const btnCopiar = document.getElementById("btnCopiarCAL");

    if (btnCalc) {
        btnCalc.addEventListener("click", calcularCAL);
    }

    if (btnSalvar) {
        btnSalvar.addEventListener("click", salvarCAL);
    }

    if (btnLimpar) {
        btnLimpar.addEventListener("click", limparCAL);
    }

    if (btnCopiar) {
        btnCopiar.addEventListener("click", copiarResultado);
    }
}

//==============================================================
// LIMPAR
//==============================================================

function limparCAL() {
    const campos = [
        "cal_alc",
        "cal_ph_inicial",
        "cal_ph_final",
        "cal_conc_mae",
        "cal_dil_percent",
        "cal_volume_jarro"
    ];

    campos.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) campo.value = "";
    });

    const resumo = document.getElementById("cal_resumo");
    if (resumo) resumo.innerHTML = "Aguardando cálculo...";

    const json = document.getElementById("cal_json");
    if (json) json.textContent = "";

    ultimoResultado = {};
}

//==============================================================
// SALVAR
//==============================================================

function salvarCAL() {
    const dados = {
        alc: Number(document.getElementById("cal_alc")?.value || 0),
        ph_inicial: Number(document.getElementById("cal_ph_inicial")?.value || 0),
        ph_final: Number(document.getElementById("cal_ph_final")?.value || 0),
        conc_mae_gL: Number(document.getElementById("cal_conc_mae")?.value || 0),
        dil_percent: Number(document.getElementById("cal_dil_percent")?.value || 0),
        volume_jarro: Number(document.getElementById("cal_volume_jarro")?.value || 0)
    };

    salvarParametros("cal", dados);
    alert("Parâmetros salvos.");
}

//==============================================================
// COPIAR RESULTADO
//==============================================================

async function copiarResultado() {
    if (!ultimoResultado || Object.keys(ultimoResultado).length === 0) {
        alert("Nenhum cálculo realizado.");
        return;
    }

    const texto = JSON.stringify(ultimoResultado, null, 2);

    try {
        await navigator.clipboard.writeText(texto);
        alert("Resultado copiado.");
    } catch {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = texto;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert("Resultado copiado.");
        } catch (err) {
            alert("Não foi possível copiar.");
        }
    }
}

//==============================================================
// FUNÇÃO DE CÁLCULO REVISADA
//==============================================================

/**
 * Cálculo de dosagem de Cal Hidratada (Ca(OH)2) para ETA
 *
 * REVISÃO: Correção do volume para jarro
 *
 * O volume para jarro deve ser calculado considerando:
 * - Dosagem necessária em mg/L
 * - Concentração da solução diluída em mg/mL
 * - Volume do jarro em litros
 *
 * Fórmula correta: Volume (mL) = (Dosagem × VolumeJarro) / ConcentraçãoDiluida
 *
 * @param {number} alc - Alcalinidade (mg/L CaCO3)
 * @param {number} ph_inicial - pH inicial
 * @param {number} ph_final - pH desejado
 * @param {number} conc_mae_gL - Concentração da solução mãe (g/L)
 * @param {number} dil_percent - Diluição da solução mãe (%)
 * @param {number} volume_jarro - Volume do jarro em litros
 * @returns {Object} Resultados completos do cálculo
 */
function calcularCal(alc, ph_inicial, ph_final, conc_mae_gL, dil_percent, volume_jarro) {
    // Validações
    if (alc <= 0 || ph_inicial <= 0 || ph_final <= 0 || conc_mae_gL <= 0 || dil_percent <= 0) {
        throw new Error("Valores inválidos. Todos os campos devem ser maiores que zero.");
    }
    if (dil_percent > 100) {
        throw new Error("Diluição maior que 100%.");
    }
    if (ph_inicial >= ph_final) {
        throw new Error("pH inicial deve ser menor que o pH final desejado.");
    }

    // ============================================================
    // 1. CÁLCULO DA CAL NECESSÁRIA
    // ============================================================

    // CO2 livre (mg/L)
    const co2_mgL = alc * Math.pow(10, 6.3 - ph_inicial);

    // Fator de correção para pH
    const fator_correcao = (Math.pow(10, ph_final - ph_inicial) - 1) * 0.85;

    // Cal necessária (mg/L) - Fórmula corrigida
    // 1.68 mg Ca(OH)2 por mg de CO2
    // 1.2 mg Ca(OH)2 por mg de alcalinidade
    const cal_necessaria = Number((1.68 * co2_mgL + 1.2 * alc * fator_correcao).toFixed(1));

    // ============================================================
    // 2. PREPARO DA SOLUÇÃO DILUÍDA
    // ============================================================

    // Concentração da solução diluída (g/L → mg/mL)
    const conc_diluida_mg_mL = conc_mae_gL * (dil_percent / 100);

    // ============================================================
    // 3. VOLUME DA SOLUÇÃO MÃE PARA 1L DE ÁGUA
    // ============================================================

    // Volume de solução mãe necessário para 1L de água tratada
    // Fórmula: Volume (L) = Dosagem (mg/L) / Concentração Mãe (mg/L)
    // Convertendo concentração mãe para mg/L: conc_mae_gL * 1000
    const vol_mae_por_L = Number((cal_necessaria / (conc_mae_gL * 1000)).toFixed(4));
    const vol_mae_por_L_mL = Number((vol_mae_por_L * 1000).toFixed(2));

    // ============================================================
    // 4. VOLUME DA SOLUÇÃO DILUÍDA PARA 1L DE ÁGUA
    // ============================================================

    // Volume de solução diluída necessário para 1L de água
    // Fórmula: Volume (mL) = Dosagem (mg/L) / Concentração Diluída (mg/mL)
    const vol_diluido_por_L = Number((cal_necessaria / conc_diluida_mg_mL).toFixed(3));

    // ============================================================
    // 5. VOLUME PARA O JARRO - CORREÇÃO AQUI !!!
    // ============================================================

    // Volume de solução diluída para o jarro
    // Fórmula CORRETA: Volume (mL) = (Dosagem × VolumeJarro) / ConcentraçãoDiluida
    // Onde:
    //   - Dosagem = cal_necessaria (mg/L)
    //   - VolumeJarro = volume do jarro em litros
    //   - ConcentraçãoDiluida = conc_diluida_mg_mL (mg/mL)
    const vol_jarro_mL = Number(((cal_necessaria * volume_jarro) / conc_diluida_mg_mL).toFixed(2));

    // ============================================================
    // 6. VERIFICAÇÃO DO CÁLCULO
    // ============================================================

    // Verificação: A quantidade de cal no jarro deve ser igual à dosagem × volume
    const cal_no_jarro_mg = Number((conc_diluida_mg_mL * vol_jarro_mL).toFixed(2));
    const cal_esperada_mg = Number((cal_necessaria * volume_jarro).toFixed(2));

    // ============================================================
    // 7. PREPARO DE 1L DE SOLUÇÃO DILUÍDA
    // ============================================================

    // Para preparar 1L de solução diluída
    const sol_mae_1L = Number((1000 * (conc_diluida_mg_mL / conc_mae_gL)).toFixed(1));
    const agua_1L = Number((1000 - sol_mae_1L).toFixed(1));

    // ============================================================
    // 8. RESULTADO
    // ============================================================

    const resultado = {
        // Entradas
        ph_inicial: ph_inicial,
        ph_final: ph_final,
        alcalinidade: alc,
        conc_mae_gL: conc_mae_gL,
        diluicao_percent: dil_percent,
        volume_jarro_L: volume_jarro,

        // Resultados intermediários
        co2_mgL: Number(co2_mgL.toFixed(1)),
        fator_correcao: Number(fator_correcao.toFixed(3)),

        // Dosagem necessária
        cal_necessaria_mgL: cal_necessaria,

        // Concentrações
        conc_mae_mgL: Number((conc_mae_gL * 1000).toFixed(0)),
        conc_diluida_mg_mL: Number(conc_diluida_mg_mL.toFixed(3)),

        // Volumes para 1L
        vol_mae_por_L: vol_mae_por_L,
        vol_mae_por_L_mL: vol_mae_por_L_mL,
        vol_diluido_por_L_mL: vol_diluido_por_L,

        // Volume para jarro (CORRIGIDO)
        vol_jarro_mL: vol_jarro_mL,

        // Verificação
        cal_no_jarro_mg: cal_no_jarro_mg,
        cal_esperada_mg: cal_esperada_mg,
        verificacao_ok: Math.abs(cal_no_jarro_mg - cal_esperada_mg) < 0.01,

        // Preparo da solução
        preparo_1L: {
            solucao_mae_mL: sol_mae_1L,
            agua_mL: agua_1L
        }
    };

    return resultado;
}

//==============================================================
// CÁLCULO PRINCIPAL
//==============================================================

function calcularCAL() {
    try {
        // Obtém os valores dos campos
        const getValue = (id) => {
            const element = document.getElementById(id);
            return element ? Number(element.value || 0) : 0;
        };

        const alc = getValue("cal_alc");
        const ph_inicial = getValue("cal_ph_inicial");
        const ph_final = getValue("cal_ph_final");
        const conc_mae_gL = getValue("cal_conc_mae");
        const dil_percent = getValue("cal_dil_percent");
        const volume_jarro = getValue("cal_volume_jarro");

        // Validação básica
        if (alc <= 0 || ph_inicial <= 0 || ph_final <= 0 || conc_mae_gL <= 0 || dil_percent <= 0) {
            const resumo = document.getElementById("cal_resumo");
            if (resumo) {
                resumo.innerHTML = `<span style="color:red">Todos os campos devem ser maiores que zero.</span>`;
            }
            return;
        }

        if (ph_inicial >= ph_final) {
            const resumo = document.getElementById("cal_resumo");
            if (resumo) {
                resumo.innerHTML = `<span style="color:red">O pH inicial deve ser menor que o pH final desejado.</span>`;
            }
            return;
        }

        if (dil_percent > 100) {
            const resumo = document.getElementById("cal_resumo");
            if (resumo) {
                resumo.innerHTML = `<span style="color:red">A diluição não pode ser maior que 100%.</span>`;
            }
            return;
        }

        // Cálculo
        const resultado = calcularCal(
            alc,
            ph_inicial,
            ph_final,
            conc_mae_gL,
            dil_percent,
            volume_jarro
        );

        // Resultado completo
        ultimoResultado = {
            ...resultado,
            data: new Date().toLocaleString("pt-BR")
        };

        //==================================================
        // EXIBIÇÃO DO RESULTADO
        //==================================================

        const resumo = document.getElementById("cal_resumo");
        if (resumo) {
            resumo.innerHTML = `
                <div class="resultado">
                    <h4>📊 Parâmetros de Entrada</h4>
                    <p>Alcalinidade: <b>${alc}</b> mg/L CaCO₃</p>
                    <p>pH Inicial: <b>${ph_inicial}</b></p>
                    <p>pH Final: <b>${ph_final}</b></p>
                    <p>Concentração Mãe: <b>${conc_mae_gL}</b> g/L</p>
                    <p>Diluição: <b>${dil_percent}</b>%</p>

                    <hr>

                    <h4>🧪 Resultados do Cálculo</h4>
                    <p>CO₂ Livre: <b>${resultado.co2_mgL}</b> mg/L</p>
                    <p>Fator de Correção: <b>${resultado.fator_correcao}</b></p>
                    <p><strong>Cal Necessária: <b style="color: #2e7d32; font-size: 1.2em;">${resultado.cal_necessaria_mgL}</b> mg/L</strong></p>

                    <hr>

                    <h4>💧 Preparo da Solução</h4>
                    <p>Concentração Mãe: <b>${resultado.conc_mae_mgL}</b> mg/L</p>
                    <p>Concentração Diluída: <b>${resultado.conc_diluida_mg_mL}</b> mg/mL</p>
                    <p>Volume Mãe por L: <b>${resultado.vol_mae_por_L_mL}</b> mL/L</p>
                    <p>Volume Diluído por L: <b>${resultado.vol_diluido_por_L_mL}</b> mL/L</p>

                    <hr>

                    <h4>🧫 Para Jarro de ${volume_jarro}L</h4>
                    <p><strong>Volume a Aplicar: <b style="color: #1976d2; font-size: 1.4em;">${resultado.vol_jarro_mL}</b> mL</strong></p>
                    <p style="font-size: 0.9em; color: #666;">
                        Verificação: ${resultado.cal_no_jarro_mg} mg de Cal no jarro
                        ${resultado.verificacao_ok ? '✅' : '⚠️'}
                    </p>

                    <hr>

                    <h4>📋 Preparo de 1L de Solução Diluída</h4>
                    <p>Solução Mãe: <b>${resultado.preparo_1L.solucao_mae_mL}</b> mL</p>
                    <p>Água: <b>${resultado.preparo_1L.agua_mL}</b> mL</p>
                </div>
            `;
        }

        // Exibe o JSON técnico
        const json = document.getElementById("cal_json");
        if (json) {
            json.textContent = JSON.stringify(ultimoResultado, null, 4);
        }

        // Salva automaticamente
        salvarParametros("cal", ultimoResultado);

    } catch (erro) {
        console.error('Erro no cálculo:', erro);
        const resumo = document.getElementById("cal_resumo");
        if (resumo) {
            resumo.innerHTML = `<span style="color:red">Erro no cálculo:<br>${erro.message}</span>`;
        }
    }
}

//==============================================================
// EXPORTAR PDF
//==============================================================

export function exportarPDFCal() {
    if (!ultimoResultado || Object.keys(ultimoResultado).length === 0) {
        alert("Realize um cálculo primeiro.");
        return;
    }

    if (typeof window.jspdf === 'undefined') {
        alert("Biblioteca jsPDF não carregada.");
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("ETA Professional", 20, 20);
        doc.setFontSize(15);
        doc.text("Relatório - Cal Hidratada (Ca(OH)₂)", 20, 35);
        doc.setFontSize(11);

        let y = 50;

        // Dados de entrada
        doc.text("DADOS DE ENTRADA:", 20, y);
        y += 8;
        doc.text(`Alcalinidade: ${ultimoResultado.alcalinidade} mg/L CaCO₃`, 25, y);
        y += 7;
        doc.text(`pH Inicial: ${ultimoResultado.ph_inicial}`, 25, y);
        y += 7;
        doc.text(`pH Final: ${ultimoResultado.ph_final}`, 25, y);
        y += 7;
        doc.text(`Concentração Mãe: ${ultimoResultado.conc_mae_gL} g/L`, 25, y);
        y += 7;
        doc.text(`Diluição: ${ultimoResultado.diluicao_percent}%`, 25, y);
        y += 7;
        doc.text(`Volume do Jarro: ${ultimoResultado.volume_jarro_L} L`, 25, y);
        y += 10;

        // Resultados
        doc.text("RESULTADOS:", 20, y);
        y += 8;
        doc.text(`CO₂ Livre: ${ultimoResultado.co2_mgL} mg/L`, 25, y);
        y += 7;
        doc.text(`Fator de Correção: ${ultimoResultado.fator_correcao}`, 25, y);
        y += 7;
        doc.text(`Cal Necessária: ${ultimoResultado.cal_necessaria_mgL} mg/L`, 25, y);
        y += 10;

        doc.text("PREPARO DA SOLUÇÃO:", 20, y);
        y += 8;
        doc.text(`Concentração Diluída: ${ultimoResultado.conc_diluida_mg_mL} mg/mL`, 25, y);
        y += 7;
        doc.text(`Volume Mãe por L: ${ultimoResultado.vol_mae_por_L_mL} mL/L`, 25, y);
        y += 7;
        doc.text(`Volume Diluído por L: ${ultimoResultado.vol_diluido_por_L_mL} mL/L`, 25, y);
        y += 10;

        doc.text("APLICAÇÃO NO JARRO:", 20, y);
        y += 8;
        doc.text(`Volume a Aplicar: ${ultimoResultado.vol_jarro_mL} mL`, 25, y);
        y += 7;
        doc.text(`Verificação: ${ultimoResultado.cal_no_jarro_mg} mg`, 25, y);
        y += 10;

        doc.text("PREPARO DE 1L DE SOLUÇÃO DILUÍDA:", 20, y);
        y += 8;
        doc.text(`Solução Mãe: ${ultimoResultado.preparo_1L.solucao_mae_mL} mL`, 25, y);
        y += 7;
        doc.text(`Água: ${ultimoResultado.preparo_1L.agua_mL} mL`, 25, y);
        y += 10;

        doc.text(`Data: ${ultimoResultado.data}`, 20, y);

        doc.save("cal_hidratada.pdf");
    } catch (error) {
        console.error('Erro ao exportar PDF:', error);
        alert('Erro ao exportar PDF.');
    }
}

//==============================================================
// EXPORTAR EXCEL
//==============================================================

export function exportarExcelCal() {
    if (!ultimoResultado || Object.keys(ultimoResultado).length === 0) {
        alert("Realize um cálculo primeiro.");
        return;
    }

    if (typeof XLSX === 'undefined') {
        alert("Biblioteca XLSX não carregada.");
        return;
    }

    try {
        const dadosExcel = {
            'Alcalinidade (mg/L CaCO₃)': ultimoResultado.alcalinidade,
            'pH Inicial': ultimoResultado.ph_inicial,
            'pH Final': ultimoResultado.ph_final,
            'CO₂ Livre (mg/L)': ultimoResultado.co2_mgL,
            'Fator de Correção': ultimoResultado.fator_correcao,
            'Cal Necessária (mg/L)': ultimoResultado.cal_necessaria_mgL,
            'Concentração Mãe (g/L)': ultimoResultado.conc_mae_gL,
            'Diluição (%)': ultimoResultado.diluicao_percent,
            'Concentração Diluída (mg/mL)': ultimoResultado.conc_diluida_mg_mL,
            'Volume Mãe por L (mL)': ultimoResultado.vol_mae_por_L_mL,
            'Volume Diluído por L (mL)': ultimoResultado.vol_diluido_por_L_mL,
            'Volume do Jarro (L)': ultimoResultado.volume_jarro_L,
            'Volume a Aplicar no Jarro (mL)': ultimoResultado.vol_jarro_mL,
            'Cal no Jarro (mg)': ultimoResultado.cal_no_jarro_mg,
            'Solução Mãe para 1L (mL)': ultimoResultado.preparo_1L.solucao_mae_mL,
            'Água para 1L (mL)': ultimoResultado.preparo_1L.agua_mL,
            'Data': ultimoResultado.data
        };

        const ws = XLSX.utils.json_to_sheet([dadosExcel]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Cal Hidratada");
        XLSX.writeFile(wb, "cal_hidratada.xlsx");
    } catch (error) {
        console.error('Erro ao exportar Excel:', error);
        alert('Erro ao exportar Excel.');
    }
}

//==============================================================
// ATALHOS GLOBAIS
//==============================================================

if (typeof window.exportarPDFCal === 'undefined') {
    window.exportarPDFCal = exportarPDFCal;
}
if (typeof window.exportarExcelCal === 'undefined') {
    window.exportarExcelCal = exportarExcelCal;
}

//==============================================================
// FIM
//==============================================================
