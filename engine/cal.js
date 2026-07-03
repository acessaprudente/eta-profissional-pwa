/*
==========================================================
ETA PROFESSIONAL PWA
Módulo: Cal Hidratada
Versão: Alpha 0.1 - Final Structure
==========================================================
*/


// =========================================
// CÁLCULO PRINCIPAL
// =========================================

export function calcularCAL(
    concentracao_solucao_gl,
    volume_jarro_l,
    dosagem_inicial,
    dosagem_final,
    incremento
) {

    const resultado = {};
    const tabela = [];

    let dosagem = dosagem_inicial;

    while (dosagem <= dosagem_final) {

        const ml_jarro =
            (dosagem * volume_jarro_l) /
            concentracao_solucao_gl;

        tabela.push({
            dosagem: Number(dosagem.toFixed(2)),
            ml: Number(ml_jarro.toFixed(2))
        });

        dosagem += incremento;
    }

    resultado.concentracao =
        concentracao_solucao_gl * 1000;

    resultado.tabela = tabela;

    return resultado;
}


// =========================================
// INTERFACE
// =========================================

export function calView() {

    return `

    <div class="modulo">

        <h2>⚪ Cal Hidratada</h2>

        <div class="formulario">

            <label>Concentração (g/L)</label>
            <input id="cal_conc" type="number" value="10">

            <label>Volume do Jarro (L)</label>
            <input id="cal_jarro" type="number" value="2">

            <label>Dosagem Inicial</label>
            <input id="cal_ini" type="number" value="20">

            <label>Dosagem Final</label>
            <input id="cal_fim" type="number" value="120">

            <label>Incremento</label>
            <input id="cal_inc" type="number" value="10">

            <button id="btnCalcularCAL">
                CALCULAR
            </button>

        </div>

        <div id="resultadoCAL"></div>

    </div>

    `;
}


// =========================================
// INICIALIZAÇÃO
// =========================================

export function inicializarCAL() {

    const btn =
        document.getElementById("btnCalcularCAL");

    if (!btn) return;

    btn.addEventListener("click", () => {

        const resultado = calcularCAL(

            Number(document.getElementById("cal_conc").value),
            Number(document.getElementById("cal_jarro").value),
            Number(document.getElementById("cal_ini").value),
            Number(document.getElementById("cal_fim").value),
            Number(document.getElementById("cal_inc").value)

        );

        renderResultadoCAL(resultado);

    });

}


// =========================================
// RESULTADO
// =========================================

function renderResultadoCAL(r) {

    let html = `

    <h3>📊 Resultado</h3>

    <p>
        Concentração:
        <b>${r.concentracao} mg/L</b>
    </p>

    <hr>

    <h4>Tabela de Dosagem</h4>

    <table>

        <tr>
            <th>Dosagem</th>
            <th>mL</th>
        </tr>

    `;

    r.tabela.forEach(l => {

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

    document.getElementById("resultadoCAL").innerHTML = html;
}
