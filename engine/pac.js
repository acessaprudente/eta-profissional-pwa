/*
==========================================================
ETA PROFESSIONAL PWA
Módulo: PAC Férrico
Versão: Alpha 0.1 - Final Structure
==========================================================
*/


// =========================================
// CÁLCULO PRINCIPAL
// =========================================

export function calcularPAC(
    concentracao_gl,
    densidade,
    diluicao_percentual = 2,
    volume_solucao_ml = 1000,
    volume_jarro_l = 2
) {

    const resultado = {};

    // =====================================
    // TAL QUAL
    // =====================================

    const massa_produto = diluicao_percentual * 10;

    const volume_talqual_ml = massa_produto / densidade;

    const concentracao_talqual_gl =
        (concentracao_gl * volume_talqual_ml) /
        volume_solucao_ml;

    const concentracao_talqual_mgl =
        concentracao_talqual_gl * 1000;

    resultado.talqual = {
        volume_produto_ml: Number(volume_talqual_ml.toFixed(2)),
        concentracao_mgl: Number(concentracao_talqual_mgl.toFixed(0))
    };


    // =====================================
    // SOLUÇÃO SAL
    // =====================================

    const concentracao_desejada_gl =
        diluicao_percentual * 10;

    const volume_sal_ml =
        (concentracao_desejada_gl * volume_solucao_ml) /
        concentracao_gl;

    const concentracao_sal_mgl =
        concentracao_desejada_gl * 1000;

    resultado.sal = {
        volume_produto_ml: Number(volume_sal_ml.toFixed(2)),
        concentracao_mgl: Number(concentracao_sal_mgl.toFixed(0))
    };


    // =====================================
    // TABELAS DE DOSAGEM
    // =====================================

    resultado.tabelaTalQual = [];
    resultado.tabelaSal = [];

    for (let dosagem = 20; dosagem <= 120; dosagem += 10) {

        const mlTalQual =
            (dosagem * volume_jarro_l * 1000) /
            concentracao_talqual_mgl;

        const mlSal =
            (dosagem * volume_jarro_l * 1000) /
            concentracao_sal_mgl;

        resultado.tabelaTalQual.push({
            dosagem,
            ml: Number(mlTalQual.toFixed(2))
        });

        resultado.tabelaSal.push({
            dosagem,
            ml: Number(mlSal.toFixed(2))
        });
    }

    return resultado;
}


// =========================================
// INTERFACE DO MÓDULO
// =========================================

export function pacView() {

    return `

    <div class="modulo">

        <h2>🧪 PAC Férrico</h2>

        <div class="formulario">

            <label>Concentração (g/L)</label>
            <input id="pac_conc" type="number" value="170">

            <label>Densidade</label>
            <input id="pac_dens" type="number" value="1.38" step="0.01">

            <label>Diluição (%)</label>
            <input id="pac_diluicao" type="number" value="2">

            <label>Volume solução (mL)</label>
            <input id="pac_vol" type="number" value="1000">

            <label>Volume jarro (L)</label>
            <input id="pac_jarro" type="number" value="2">

            <button id="btnCalcularPAC">
                CALCULAR
            </button>

        </div>

        <div id="resultadoPAC"></div>

    </div>

    `;
}


// =========================================
// INICIALIZAÇÃO DO MÓDULO
// =========================================

export function inicializarPAC() {

    const btn = document.getElementById("btnCalcularPAC");

    if (!btn) return;

    btn.addEventListener("click", () => {

        const resultado = calcularPAC(

            Number(document.getElementById("pac_conc").value),
            Number(document.getElementById("pac_dens").value),
            Number(document.getElementById("pac_diluicao").value),
            Number(document.getElementById("pac_vol").value),
            Number(document.getElementById("pac_jarro").value)

        );

        renderResultado(resultado);

    });

}


// =========================================
// RENDER RESULTADO
// =========================================

function renderResultado(r) {

    let html = `

    <h3>📊 Resultados</h3>

    <h4>Tal Qual</h4>

    <p>Volume: <b>${r.talqual.volume_produto_ml} mL</b></p>
    <p>Concentração: <b>${r.talqual.concentracao_mgl} mg/L</b></p>

    <hr>

    <h4>Solução Sal</h4>

    <p>Volume: <b>${r.sal.volume_produto_ml} mL</b></p>
    <p>Concentração: <b>${r.sal.concentracao_mgl} mg/L</b></p>

    <hr>

    <h4>Tabela Tal Qual</h4>

    <table>
        <tr>
            <th>Dosagem</th>
            <th>mL</th>
        </tr>
    `;

    r.tabelaTalQual.forEach(l => {
        html += `
        <tr>
            <td>${l.dosagem}</td>
            <td>${l.ml}</td>
        </tr>
        `;
    });

    html += `
    </table>
    `;

    document.getElementById("resultadoPAC").innerHTML = html;
}
