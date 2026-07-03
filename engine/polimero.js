/*
==========================================================
ETA PROFESSIONAL PWA
Módulo: Polímero
Versão: Alpha 0.1 - Final Structure
==========================================================
*/


// =========================================
// CÁLCULO PRINCIPAL
// =========================================

export function calcularPolimero(
    concentracao_solucao_mg_l,
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
            (dosagem *
                volume_jarro_l *
                1000) /
            concentracao_solucao_mg_l;

        tabela.push({
            dosagem: Number(dosagem.toFixed(3)),
            ml: Number(ml_jarro.toFixed(2))
        });

        dosagem += incremento;
    }

    resultado.concentracao =
        concentracao_solucao_mg_l;

    resultado.tabela = tabela;

    return resultado;
}


// =========================================
// INTERFACE
// =========================================

export function polimeroView() {

    return `

    <div class="modulo">

        <h2>🧬 Polímero</h2>

        <div class="formulario">

            <label>Concentração (mg/L)</label>
            <input id="pol_conc" type="number" value="1000">

            <label>Volume do Jarro (L)</label>
            <input id="pol_jarro" type="number" value="2">

            <label>Dosagem Inicial</label>
            <input id="pol_ini" type="number" value="20">

            <label>Dosagem Final</label>
            <input id="pol_fim" type="number" value="120">

            <label>Incremento</label>
            <input id="pol_inc" type="number" value="10">

            <button id="btnCalcularPOL">
                CALCULAR
            </button>

        </div>

        <div id="resultadoPOL"></div>

    </div>

    `;
}


// =========================================
// INICIALIZAÇÃO
// =========================================

export function inicializarPOLIMERO() {

    const btn =
        document.getElementById("btnCalcularPOL");

    if (!btn) return;

    btn.addEventListener("click", () => {

        const resultado = calcularPolimero(

            Number(document.getElementById("pol_conc").value),
            Number(document.getElementById("pol_jarro").value),
            Number(document.getElementById("pol_ini").value),
            Number(document.getElementById("pol_fim").value),
            Number(document.getElementById("pol_inc").value)

        );

        renderResultadoPOL(resultado);

    });

}


// =========================================
// RESULTADO
// =========================================

function renderResultadoPOL(r) {

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

    document.getElementById("resultadoPOL").innerHTML = html;
}
