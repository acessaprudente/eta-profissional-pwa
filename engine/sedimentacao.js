//==============================================================
// ETA PROFESSIONAL PWA
// engine/sedimentacao.js
// Sedimentação e Detenção Hidráulica
// Versão baseada 100% no algoritmo Python
//==============================================================
import { salvarHistorico } from '../js/storage.js';
import { salvarParametros, carregarParametros } from '../js/storage.js';

let ultimoResultado = {};

//==============================================================
// VIEW
//==============================================================

export function sedimentacaoView() {
  const dados = carregarParametros('sedimentacao') || {};

  return `
<div class="modulo">
    <h2>🧪 Sedimentação e Detenção Hidráulica</h2>

    <div class="card">
        <h3>Dimensões do Decantador</h3>

        <label>Largura (m)</label>
        <input id="sed_largura" type="number" step="any" value="${dados.largura_m ?? ''}">

        <label>Comprimento (m)</label>
        <input id="sed_comprimento" type="number" step="any" value="${dados.comprimento_m ?? ''}">

        <label>Profundidade (m)</label>
        <input id="sed_profundidade" type="number" step="any" value="${dados.profundidade_m ?? ''}">

        <label>Número de Decantadores</label>
        <input id="sed_n_dec" type="number" step="1" value="${dados.n_dec ?? ''}">
    </div>

    <div class="card">
        <h3>Vazão</h3>
        <label>Vazão ETA (m³/h)</label>
        <input id="sed_qeta" type="number" step="any" value="${dados.qeta_m3_h ?? ''}">
    </div>

    <div class="card">
        <button id="btnCalcularSedimentacao">📊 Calcular</button>
        <button id="btnSalvarSedimentacao">💾 Salvar</button>
        <button id="btnLimparSedimentacao">🧹 Limpar</button>
        <button id="btnCopiarSedimentacao">📋 Copiar Resultado</button>
    </div>

    <div class="card">
        <h3>Resultado</h3>
        <div id="sed_resumo">Aguardando cálculo...</div>
    </div>

    <div class="card">
        <h3>Dados Técnicos</h3>
        <pre id="sed_json"></pre>
    </div>
</div>
`;
}

//==============================================================
// INICIALIZAÇÃO
//==============================================================

export function inicializarSEDIMENTACAO() {
  const btnCalc = document.getElementById('btnCalcularSedimentacao');
  const btnSalvar = document.getElementById('btnSalvarSedimentacao');
  const btnLimpar = document.getElementById('btnLimparSedimentacao');
  const btnCopiar = document.getElementById('btnCopiarSedimentacao');

  if (btnCalc) {
    btnCalc.addEventListener('click', calcularSedimentacao);
  }

  if (btnSalvar) {
    btnSalvar.addEventListener('click', salvarSedimentacao);
  }

  if (btnLimpar) {
    btnLimpar.addEventListener('click', limparSedimentacao);
  }

  if (btnCopiar) {
    btnCopiar.addEventListener('click', copiarResultado);
  }
}

//==============================================================
// LIMPAR
//==============================================================

function limparSedimentacao() {
  const campos = [
    'sed_largura',
    'sed_comprimento',
    'sed_profundidade',
    'sed_n_dec',
    'sed_qeta',
  ];

  campos.forEach((id) => {
    const campo = document.getElementById(id);
    if (campo) campo.value = '';
  });

  const resumo = document.getElementById('sed_resumo');
  if (resumo) resumo.innerHTML = 'Aguardando cálculo...';

  const json = document.getElementById('sed_json');
  if (json) json.textContent = '';

  ultimoResultado = {};
}

//==============================================================
// SALVAR
//==============================================================

function salvarSedimentacao() {
  const dados = {
    largura_m: Number(document.getElementById('sed_largura')?.value || 0),
    comprimento_m: Number(
      document.getElementById('sed_comprimento')?.value || 0
    ),
    profundidade_m: Number(
      document.getElementById('sed_profundidade')?.value || 0
    ),
    n_dec: Number(document.getElementById('sed_n_dec')?.value || 0),
    qeta_m3_h: Number(document.getElementById('sed_qeta')?.value || 0),
  };

  salvarParametros('sedimentacao', dados);
  alert('Parâmetros salvos.');
}

//==============================================================
// COPIAR RESULTADO
//==============================================================

async function copiarResultado() {
  if (!ultimoResultado || Object.keys(ultimoResultado).length === 0) {
    alert('Nenhum cálculo realizado.');
    return;
  }

  const texto = JSON.stringify(ultimoResultado, null, 2);

  try {
    await navigator.clipboard.writeText(texto);
    alert('Resultado copiado.');
  } catch {
    // Fallback para navegadores mais antigos
    try {
      const textArea = document.createElement('textarea');
      textArea.value = texto;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Resultado copiado.');
    } catch (err) {
      alert('Não foi possível copiar.');
    }
  }
}

//==============================================================
// FUNÇÕES DE CÁLCULO
// 100% fiéis ao algoritmo Python
//==============================================================

/**
 * Calcula a taxa de sedimentação (m³/m².dia)
 *
 * @param {number} largura_m - Largura do decantador em metros
 * @param {number} comprimento_m - Comprimento do decantador em metros
 * @param {number} n_dec - Número de decantadores
 * @param {number} qeta_m3_h - Vazão da ETA em m³/h
 * @returns {Object} Área em m² e taxa em m³/m².dia
 */
function calcularTaxaSed(largura_m, comprimento_m, n_dec, qeta_m3_h) {
  const area = largura_m * comprimento_m * n_dec;
  const qdia = qeta_m3_h * 24;
  const taxa = qdia / area;

  return {
    area_m2: Number(area.toFixed(2)),
    taxa_m3_m2_dia: Number(taxa.toFixed(2)),
  };
}

/**
 * Calcula o Tempo de Detenção Hidráulica (h)
 *
 * @param {number} largura_m - Largura do decantador em metros
 * @param {number} comprimento_m - Comprimento do decantador em metros
 * @param {number} profundidade_m - Profundidade do decantador em metros
 * @param {number} n_dec - Número de decantadores
 * @param {number} qeta_m3_h - Vazão da ETA em m³/h
 * @returns {Object} Volume em m³ e TDH em horas
 */
function calcularTDH(
  largura_m,
  comprimento_m,
  profundidade_m,
  n_dec,
  qeta_m3_h
) {
  const volume = largura_m * comprimento_m * profundidade_m * n_dec;
  const tdh = volume / qeta_m3_h;

  return {
    volume_m3: Number(volume.toFixed(2)),
    tdh_h: Number(tdh.toFixed(2)),
  };
}

/**
 * Calcula velocidade de sedimentação (cm/min) e tempo de decantação (min)
 *
 * @param {number} profundidade_m - Profundidade do decantador em metros
 * @param {number} tdh_h - Tempo de Detenção Hidráulica em horas
 * @returns {Object} Velocidade em cm/min e tempo em minutos
 */
function calcularVelTempoDec(profundidade_m, tdh_h) {
  const altura_cm = profundidade_m * 100;
  const tempo_min = tdh_h * 60;
  const vel = altura_cm / tempo_min;

  return {
    vel_cm_min: Number(vel.toFixed(3)),
    tempo_min: Number(tempo_min.toFixed(2)),
  };
}

//==============================================================
// CÁLCULO PRINCIPAL
//==============================================================

function calcularSedimentacao() {
  try {
    // Obtém os valores dos campos
    const getValue = (id) => {
      const element = document.getElementById(id);
      return element ? Number(element.value || 0) : 0;
    };

    const largura_m = getValue('sed_largura');
    const comprimento_m = getValue('sed_comprimento');
    const profundidade_m = getValue('sed_profundidade');
    const n_dec = getValue('sed_n_dec');
    const qeta_m3_h = getValue('sed_qeta');

    // Validação dos dados
    if (
      largura_m <= 0 ||
      comprimento_m <= 0 ||
      profundidade_m <= 0 ||
      n_dec <= 0 ||
      qeta_m3_h <= 0
    ) {
      const resumo = document.getElementById('sed_resumo');
      if (resumo) {
        resumo.innerHTML = `<span style="color:red">Todos os campos devem ser maiores que zero.</span>`;
      }
      return;
    }

    //==================================================
    // CÁLCULOS - 100% FIÉIS AO PYTHON
    //==================================================

    // 1. Taxa de Sedimentação
    const resultadoTaxa = calcularTaxaSed(
      largura_m,
      comprimento_m,
      n_dec,
      qeta_m3_h
    );

    // 2. Tempo de Detenção Hidráulica
    const resultadoTDH = calcularTDH(
      largura_m,
      comprimento_m,
      profundidade_m,
      n_dec,
      qeta_m3_h
    );

    // 3. Velocidade e Tempo de Decantação
    const resultadoVelTempo = calcularVelTempoDec(
      profundidade_m,
      resultadoTDH.tdh_h
    );

    //==================================================
    // MONTAGEM DO RESULTADO
    //==================================================

    ultimoResultado = {
      // Dados de entrada
      largura_m: largura_m,
      comprimento_m: comprimento_m,
      profundidade_m: profundidade_m,
      n_dec: n_dec,
      qeta_m3_h: qeta_m3_h,

      // Resultados da Taxa de Sedimentação
      area_m2: resultadoTaxa.area_m2,
      taxa_m3_m2_dia: resultadoTaxa.taxa_m3_m2_dia,

      // Resultados do TDH
      volume_m3: resultadoTDH.volume_m3,
      tdh_h: resultadoTDH.tdh_h,

      // Resultados da Velocidade/Tempo
      vel_cm_min: resultadoVelTempo.vel_cm_min,
      tempo_min: resultadoVelTempo.tempo_min,

      // Metadados
      data: new Date().toLocaleString('pt-BR'),
    };

    //==================================================
    // EXIBIÇÃO DO RESULTADO
    //==================================================

    const resumo = document.getElementById('sed_resumo');
    if (resumo) {
      resumo.innerHTML = `
                <div class="resultado">
                    <h4>Taxa de Sedimentação</h4>
                    <p>Área: <b>${resultadoTaxa.area_m2}</b> m²</p>
                    <p>Taxa: <b>${resultadoTaxa.taxa_m3_m2_dia}</b> m³/m².dia</p>

                    <hr>

                    <h4>Tempo de Detenção Hidráulica (TDH)</h4>
                    <p>Volume: <b>${resultadoTDH.volume_m3}</b> m³</p>
                    <p>TDH: <b>${resultadoTDH.tdh_h}</b> h</p>

                    <hr>

                    <h4>Velocidade e Tempo de Decantação</h4>
                    <p>Velocidade: <b>${resultadoVelTempo.vel_cm_min}</b> cm/min</p>
                    <p>Tempo: <b>${resultadoVelTempo.tempo_min}</b> min</p>
                </div>
            `;
    }

    // Exibe o JSON técnico
    const json = document.getElementById('sed_json');
    if (json) {
      json.textContent = JSON.stringify(ultimoResultado, null, 4);
    }

    // Salva automaticamente
    salvarParametros('sedimentacao', ultimoResultado);
  } catch (erro) {
    console.error('Erro no cálculo:', erro);
    const resumo = document.getElementById('sed_resumo');
    if (resumo) {
      resumo.innerHTML = `<span style="color:red">Erro no cálculo:<br>${erro.message}</span>`;
    }
  }
}

//==============================================================
// EXPORTAR PDF
//==============================================================

export function exportarPDFSedimentacao() {
  if (!ultimoResultado || Object.keys(ultimoResultado).length === 0) {
    alert('Realize um cálculo primeiro.');
    return;
  }

  if (typeof window.jspdf === 'undefined') {
    alert(
      'Biblioteca jsPDF não carregada. Verifique a conexão com a internet.'
    );
    return;
  }

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('ETA Professional', 20, 20);
    doc.setFontSize(15);
    doc.text('Relatório de Sedimentação', 20, 35);
    doc.setFontSize(11);

    let y = 50;

    // Dados de entrada
    doc.text('DADOS DE ENTRADA:', 20, y);
    y += 8;
    doc.text(`Largura: ${ultimoResultado.largura_m} m`, 25, y);
    y += 7;
    doc.text(`Comprimento: ${ultimoResultado.comprimento_m} m`, 25, y);
    y += 7;
    doc.text(`Profundidade: ${ultimoResultado.profundidade_m} m`, 25, y);
    y += 7;
    doc.text(`Nº Decantadores: ${ultimoResultado.n_dec}`, 25, y);
    y += 7;
    doc.text(`Vazão ETA: ${ultimoResultado.qeta_m3_h} m³/h`, 25, y);
    y += 10;

    // Resultados
    doc.text('RESULTADOS:', 20, y);
    y += 8;
    doc.text(`Área: ${ultimoResultado.area_m2} m²`, 25, y);
    y += 7;
    doc.text(
      `Taxa de Sedimentação: ${ultimoResultado.taxa_m3_m2_dia} m³/m².dia`,
      25,
      y
    );
    y += 7;
    doc.text(`Volume: ${ultimoResultado.volume_m3} m³`, 25, y);
    y += 7;
    doc.text(`TDH: ${ultimoResultado.tdh_h} h`, 25, y);
    y += 7;
    doc.text(`Velocidade: ${ultimoResultado.vel_cm_min} cm/min`, 25, y);
    y += 7;
    doc.text(`Tempo de Decantação: ${ultimoResultado.tempo_min} min`, 25, y);
    y += 10;

    doc.text(`Data: ${ultimoResultado.data}`, 20, y);

    doc.save('sedimentacao.pdf');
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    alert('Erro ao exportar PDF. Verifique o console para mais detalhes.');
  }
}

//==============================================================
// EXPORTAR EXCEL
//==============================================================

export function exportarExcelSedimentacao() {
  if (!ultimoResultado || Object.keys(ultimoResultado).length === 0) {
    alert('Realize um cálculo primeiro.');
    return;
  }

  if (typeof XLSX === 'undefined') {
    alert('Biblioteca XLSX não carregada. Verifique a conexão com a internet.');
    return;
  }

  try {
    const ws = XLSX.utils.json_to_sheet([ultimoResultado]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sedimentação');
    XLSX.writeFile(wb, 'sedimentacao.xlsx');
  } catch (error) {
    console.error('Erro ao exportar Excel:', error);
    alert('Erro ao exportar Excel. Verifique o console para mais detalhes.');
  }
}

//==============================================================
// ATALHOS GLOBAIS
//==============================================================

if (typeof window.exportarPDFSedimentacao === 'undefined') {
  window.exportarPDFSedimentacao = exportarPDFSedimentacao;
}
if (typeof window.exportarExcelSedimentacao === 'undefined') {
  window.exportarExcelSedimentacao = exportarExcelSedimentacao;
}

//==============================================================
// FIM
//==============================================================
