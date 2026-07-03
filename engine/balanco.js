/*
==========================================================
ETA PROFESSIONAL PWA
Módulo: Balanço de Massa
Versão: Alpha 0.1 - Final Structure
==========================================================
*/


// =========================================
// CÁLCULO PRINCIPAL
// =========================================

export function calcularBalanco(
    vazao_entrada_m3h,
    concentracao_entrada_mg_l,
    vazao_saida_m3h,
    concentracao_saida_mg_l
) {

    const resultado = {};

    // =====================================
    // MASSA ENTRADA
    // =====================================

    const massa_entrada =
        vazao_entrada_m3h *
        concentracao_entrada_mg_l *
        1000;

    // =====================================
    // MASSA SAÍDA
    // =====================================

    const massa_saida =
        vazao_saida_m3h *
        concentracao_saida_mg_l *
        1000;

    // =====================================
    // BALANÇO
    // =====================================

    const diferenca =
        massa_entrada - massa_saida;

    const eficiencia =
        massa_entrada > 0
            ? (massa_saida / massa_entrada) * 100
            : 0;

    resultado.entrada = massa_entrada;
    resultado.saida = massa_saida;
    resultado.diferenca = diferenca;
    resultado.eficiencia = Number(
        eficiencia.toFixed(2)
    );

    return resultado;
}


// =========================================
// INTERFACE
// =========================================

export function balancoView() {

    return `

    <div class="modulo">

        <h2>⚖ Balanço de Massa</h2>

        <div class="formulario">

            <label>Vazão Entrada (m³/h)</label>
            <input id="bal_qe" type="number" value="100">

            <label>Concentração Entrada (mg/L)</label>
            <input id="bal_ce" type="number" value="50">

            <label>Vazão Saída (m³/h)</label>
            <input id="bal_qs" type="number" value="100">

            <label>Concentração Saída (mg/L)</label>
            <input id="bal_cs" type="number" value="45">

            <button id="btnCalcularBAL">
                CALCULAR
            </button>

        </div>

        <div id="resultadoBAL"></div>

    </div>

    `;
}


// =========================================
// INICIALIZAÇÃO
// =========================================

export function inicializarBALANCO() {

    const btn =
        document.getElementById("btnCalcularBAL");

    if (!btn) return;

    btn.addEventListener("click", () => {

        const r = calcularBalanco(

            Number(document.getElementById("bal_qe").value),
            Number(document.getElementById("bal_ce").value),
            Number(document.getElementById("bal_qs").value),
            Number(document.getElementById("bal_cs").value)

        );

        renderResultadoBAL(r);

    });

}


// =========================================
// RESULTADO
// =========================================

function renderResultadoBAL(r) {

    let html = `

    <h3>📊 Resultado</h3>

    <p>Entrada: <b>${r.entrada}</b></p>
    <p>Saída: <b>${r.saida}</b></p>
    <p>Diferença: <b>${r.diferenca}</b></p>
    <p>Eficiência: <b>${r.eficiencia}%</b></p>

    `;

    document.getElementById("resultadoBAL").innerHTML = html;
}
