/*
==========================================================
ETA PROFESSIONAL PWA
Módulo: Jar Test
Versão: Alpha 0.1 - Final Structure
==========================================================
*/


// =========================================
// CÁLCULO SIMULADO DE JAR TEST
// =========================================

export function calcularJarTest(
    dosagem_inicial,
    dosagem_final,
    incremento,
    turbidez_inicial = 100
) {

    const resultado = {};
    const tabela = [];

    let melhorDosagem = null;
    let menorTurbidez = Infinity;

    for (
        let dosagem = dosagem_inicial;
        dosagem <= dosagem_final;
        dosagem += incremento
    ) {

        // Simulação simplificada de redução de turbidez
        const turbidez_final =
            turbidez_inicial *
            Math.exp(-dosagem / 50);

        tabela.push({
            dosagem: Number(dosagem.toFixed(2)),
            turbidez: Number(turbidez_final.toFixed(2))
        });

        // Identifica melhor ponto
        if (turbidez_final < menorTurbidez) {
            menorTurbidez = turbidez_final;
            melhorDosagem = dosagem;
        }
    }

    resultado.tabela = tabela;
    resultado.melhorDosagem = Number(
        melhorDosagem.toFixed(2)
    );
    resultado.menorTurbidez = Number(
        menorTurbidez.toFixed(2)
    );

    return resultado;
}


// =========================================
// INTERFACE
// =========================================

export function jarView() {

    return `

    <div class="modulo">

        <h2>🧫 Jar Test</h2>

        <div class="formulario">

            <label>Dosagem Inicial</label>
            <input id="jar_ini" type="number" value="10">

            <label>Dosagem Final</label>
            <input id="jar_fim" type="number" value="200">

            <label>Incremento</label>
            <input id="jar_inc" type="number" value="10">

            <label>Turbidez Inicial</label>
            <input id="jar_turb" type="number" value="100">

            <button id="btnCalcularJAR">
                CALCULAR
            </button>

        </div>

        <div id="resultadoJAR"></div>

    </div>

    `;
}


// =========================================
// INICIALIZAÇÃO
// =========================================

export function inicializarJAR() {

    const btn =
        document.getElementById("btnCalcularJAR");

    if (!btn) return;

    btn.addEventListener("click", () => {

        const r = calcularJarTest(

            Number(document.getElementById("jar_ini").value),
            Number(document.getElementById("jar_fim").value),
            Number(document.getElementById("jar_inc").value),
            Number(document.getElementById("jar_turb").value)

        );

        renderResultadoJAR(r);

    });

}


// =========================================
// RESULTADO
// =========================================

function renderResultadoJAR(r) {

    let html = `

    <h3>📊 Resultado</h3>

    <p>
        Melhor Dosagem:
        <b>${r.melhorDosagem}</b>
    </p>

    <p>
        Menor Turbidez:
        <b>${r.menorTurbidez}</b>
    </p>

    <hr>

    <h4>Tabela de Resultados</h4>

    <table>

        <tr>
            <th>Dosagem</th>
            <th>Turbidez</th>
        </tr>

    `;

    r.tabela.forEach(l => {

        html += `
        <tr>
            <td>${l.dosagem}</td>
            <td>${l.turbidez}</td>
        </tr>
        `;

    });

    html += `
    </table>
    `;

    document.getElementById("resultadoJAR").innerHTML = html;
}
