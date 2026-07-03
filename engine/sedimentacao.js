/*
==========================================================
ETA PROFESSIONAL PWA
Módulo: Sedimentação
Versão: Alpha 0.1 - Final Structure
==========================================================
*/


// =========================================
// CÁLCULO DE SEDIMENTAÇÃO
// =========================================

export function calcularSedimentacao(
    velocidade_particula_m_s,
    profundidade_m,
    area_m2,
    vazao_m3_s
) {

    const resultado = {};

    // =====================================
    // TEMPO DE SEDIMENTAÇÃO
    // =====================================

    const tempo_sedimentacao =
        profundidade_m / velocidade_particula_m_s;

    // =====================================
    // CARGA SUPERFICIAL
    // =====================================

    const carga_superficial =
        vazao_m3_s / area_m2;

    // =====================================
    // EFICIÊNCIA SIMPLIFICADA
    // =====================================

    let eficiencia = 0;

    if (carga_superficial > 0) {

        eficiencia =
            (velocidade_particula_m_s /
                carga_superficial) * 100;
    }

    resultado.tempo_sedimentacao_s =
        Number(tempo_sedimentacao.toFixed(2));

    resultado.carga_superficial_m3_m2_s =
        Number(carga_superficial.toFixed(4));

    resultado.eficiencia =
        Number(eficiencia.toFixed(2));

    return resultado;
}


// =========================================
// INTERFACE
// =========================================

export function sedimentacaoView() {

    return `

    <div class="modulo">

        <h2>💧 Sedimentação</h2>

        <div class="formulario">

            <label>Velocidade Partícula (m/s)</label>
            <input id="sed_vel" type="number" value="0.0005">

            <label>Profundidade (m)</label>
            <input id="sed_prof" type="number" value="3">

            <label>Área (m²)</label>
            <input id="sed_area" type="number" value="50">

            <label>Vazão (m³/s)</label>
            <input id="sed_vazao" type="number" value="0.5">

            <button id="btnCalcularSED">
                CALCULAR
            </button>

        </div>

        <div id="resultadoSED"></div>

    </div>

    `;
}


// =========================================
// INICIALIZAÇÃO
// =========================================

export function inicializarSEDIMENTACAO() {

    const btn =
        document.getElementById("btnCalcularSED");

    if (!btn) return;

    btn.addEventListener("click", () => {

        const r = calcularSedimentacao(

            Number(document.getElementById("sed_vel").value),
            Number(document.getElementById("sed_prof").value),
            Number(document.getElementById("sed_area").value),
            Number(document.getElementById("sed_vazao").value)

        );

        renderResultadoSED(r);

    });

}


// =========================================
// RESULTADO
// =========================================

function renderResultadoSED(r) {

    let html = `

    <h3>📊 Resultado</h3>

    <p>
        Tempo de Sedimentação:
        <b>${r.tempo_sedimentacao_s} s</b>
    </p>

    <p>
        Carga Superficial:
        <b>${r.carga_superficial_m3_m2_s}</b>
    </p>

    <p>
        Eficiência:
        <b>${r.eficiencia}%</b>
    </p>

    `;

    document.getElementById("resultadoSED").innerHTML = html;
}
