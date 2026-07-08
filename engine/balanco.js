//==============================================================
// ETA PROFESSIONAL PWA
// engine/balanco.js
// Balanço de Massa - Mistura de Turbidez
// Versão baseada 100% no algoritmo Python
//==============================================================

import {
    salvarParametros,
    carregarParametros
} from "../js/storage.js";

let ultimoResultado = {};

//==============================================================
// VIEW
//==============================================================

export function balancoView() {

    const dados = carregarParametros("balanco") || {};

    return `

<div class="modulo">

<h2>⚖️ Balanço de Massa - Mistura de Turbidez</h2>

<div class="card">

<h3>Rio do Peixe</h3>

<label>Vazão (m³/h)</label>

<input
id="bal_q1"
type="number"
step="any"
value="${dados.Q1 ?? ""}">

<label>Turbidez (NTU)</label>

<input
id="bal_t1"
type="number"
step="any"
value="${dados.T1 ?? ""}">

</div>

<div class="card">

<h3>Santo Anastácio</h3>

<label>Vazão (m³/h)</label>

<input
id="bal_q2"
type="number"
step="any"
value="${dados.Q2 ?? ""}">

<label>Turbidez (NTU)</label>

<input
id="bal_t2"
type="number"
step="any"
value="${dados.T2 ?? ""}">

</div>

<div class="card">

<h3>Balneário</h3>

<label>Vazão (m³/h)</label>

<input
id="bal_q3"
type="number"
step="any"
value="${dados.Q3 ?? ""}">

<label>Turbidez (NTU)</label>

<input
id="bal_t3"
type="number"
step="any"
value="${dados.T3 ?? ""}">

</div>

<div class="card">

<h3>Mistura Final</h3>

<label>Turbidez Final (NTU)</label>

<input
id="bal_t4"
type="number"
step="any"
value="${dados.T4 ?? ""}">

<p>

Digite <b>0</b> no campo que deseja calcular.

</p>

</div>

<div class="card">

<button id="btnCalcularBalanco">

📊 Calcular

</button>

<button id="btnSalvarBalanco">

💾 Salvar

</button>

<button id="btnLimparBalanco">

🧹 Limpar

</button>

<button id="btnCopiarBalanco">

📋 Copiar Resultado

</button>

</div>

<div class="card">

<h3>Resultado</h3>

<div id="bal_resumo">

Aguardando cálculo...

</div>

</div>

<div class="card">

<h3>Dados Técnicos</h3>

<pre id="bal_json"></pre>

</div>

</div>

`;

}
//==============================================================
// INICIALIZAÇÃO
//==============================================================

export function inicializarBalanco() {

    const btnCalc = document.getElementById("btnCalcularBalanco");
    const btnSalvar = document.getElementById("btnSalvarBalanco");
    const btnLimpar = document.getElementById("btnLimparBalanco");
    const btnCopiar = document.getElementById("btnCopiarBalanco");

    if (btnCalc) {
        btnCalc.addEventListener("click", calcularBalanco);
    }

    if (btnSalvar) {
        btnSalvar.addEventListener("click", salvarBalanco);
    }

    if (btnLimpar) {
        btnLimpar.addEventListener("click", limparBalanco);
    }

    if (btnCopiar) {
        btnCopiar.addEventListener("click", copiarResultado);
    }

}

//==============================================================
// LIMPAR
//==============================================================

function limparBalanco() {

    [
        "bal_q1",
        "bal_q2",
        "bal_q3",
        "bal_t1",
        "bal_t2",
        "bal_t3",
        "bal_t4"
    ].forEach(id => {

        const campo = document.getElementById(id);

        if (campo)
            campo.value = "";

    });

    document.getElementById("bal_resumo").innerHTML =
        "Aguardando cálculo...";

    document.getElementById("bal_json").textContent = "";

    ultimoResultado = {};

}

//==============================================================
// SALVAR
//==============================================================

function salvarBalanco() {

    const dados = {

        Q1: Number(document.getElementById("bal_q1").value || 0),
        Q2: Number(document.getElementById("bal_q2").value || 0),
        Q3: Number(document.getElementById("bal_q3").value || 0),

        T1: Number(document.getElementById("bal_t1").value || 0),
        T2: Number(document.getElementById("bal_t2").value || 0),
        T3: Number(document.getElementById("bal_t3").value || 0),
        T4: Number(document.getElementById("bal_t4").value || 0)

    };

    salvarParametros("balanco", dados);

    alert("Parâmetros salvos.");

}

//==============================================================
// COPIAR RESULTADO
//==============================================================

async function copiarResultado() {

    if (!ultimoResultado.Qtotal) {

        alert("Nenhum cálculo realizado.");

        return;

    }

    const texto = JSON.stringify(
        ultimoResultado,
        null,
        2
    );

    try {

        await navigator.clipboard.writeText(texto);

        alert("Resultado copiado.");

    } catch {

        alert("Não foi possível copiar.");

    }

}
//==============================================================
// CÁLCULO
// 100% fiel ao algoritmo Python
//==============================================================

function calcularBalanco() {

    try {

        const Q1 = Number(document.getElementById("bal_q1").value || 0);
        const Q2 = Number(document.getElementById("bal_q2").value || 0);
        const Q3 = Number(document.getElementById("bal_q3").value || 0);

        let T1 = Number(document.getElementById("bal_t1").value || 0);
        let T2 = Number(document.getElementById("bal_t2").value || 0);
        let T3 = Number(document.getElementById("bal_t3").value || 0);
        let T4 = Number(document.getElementById("bal_t4").value || 0);

        const vazao_total = Q1 + Q2 + Q3;

        let mensagem = "";

        //==================================================
        // ALGORITMO ORIGINAL PYTHON
        //==================================================

        if (T4 === 0 && vazao_total > 0) {

            T4 = (Q1 * T1 + Q2 * T2 + Q3 * T3) / vazao_total;

            mensagem =
                `Turbidez Final (T4) = ${T4.toFixed(2)} NTU<br>` +
                `Vazão Total = ${vazao_total.toFixed(2)} m³/h`;

        }

        else if (T1 === 0 && Q1 > 0) {

            T1 = (T4 * vazao_total - Q2 * T2 - Q3 * T3) / Q1;

            mensagem =
                `Turbidez Rio do Peixe (T1) = ${T1.toFixed(2)} NTU<br>` +
                `Vazão Total = ${vazao_total.toFixed(2)} m³/h`;

        }

        else if (T2 === 0 && Q2 > 0) {

            T2 = (T4 * vazao_total - Q1 * T1 - Q3 * T3) / Q2;

            mensagem =
                `Turbidez Santo Anastácio (T2) = ${T2.toFixed(2)} NTU<br>` +
                `Vazão Total = ${vazao_total.toFixed(2)} m³/h`;

        }

        else if (T3 === 0 && Q3 > 0) {

            T3 = (T4 * vazao_total - Q1 * T1 - Q2 * T2) / Q3;

            mensagem =
                `Turbidez Balneário (T3) = ${T3.toFixed(2)} NTU<br>` +
                `Vazão Total = ${vazao_total.toFixed(2)} m³/h`;

        }

        else {

            mensagem =
                "Insira <b>0</b> no campo que deseja calcular.";

        }

        //==================================================
        // RESULTADO
        //==================================================

        ultimoResultado = {

            Q1,
            Q2,
            Q3,

            T1,
            T2,
            T3,
            T4,

            Qtotal: vazao_total,

            data: new Date().toLocaleString("pt-BR")

        };

        document.getElementById("bal_resumo").innerHTML = `

            <div class="resultado">

                ${mensagem}

            </div>

        `;

        document.getElementById("bal_json").textContent =
            JSON.stringify(
                ultimoResultado,
                null,
                4
            );

        salvarParametros(
            "balanco",
            ultimoResultado
        );

    }

    catch (erro) {

        console.error(erro);

        document.getElementById("bal_resumo").innerHTML =

            `<span style="color:red">

                Erro no cálculo:<br>${erro.message}

            </span>`;

    }

}
//==============================================================
// EXPORTAR PDF
//==============================================================

export function exportarPDFBalanco() {

    if (!ultimoResultado.Qtotal) {

        alert("Realize um cálculo primeiro.");

        return;

    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("ETA Professional",20,20);

    doc.setFontSize(15);

    doc.text("Relatório de Balanço de Massa",20,35);

    doc.setFontSize(11);

    let y=50;

    Object.entries(ultimoResultado).forEach(([k,v])=>{

        doc.text(`${k}: ${v}`,20,y);

        y+=8;

    });

    doc.save("balanco.pdf");

}

//==============================================================
// EXPORTAR EXCEL
//==============================================================

export function exportarExcelBalanco() {

    if(!ultimoResultado.Qtotal){

        alert("Realize um cálculo primeiro.");

        return;

    }

    const ws=XLSX.utils.json_to_sheet([ultimoResultado]);

    const wb=XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        wb,

        ws,

        "Balanço"

    );

    XLSX.writeFile(

        wb,

        "balanco.xlsx"

    );

}

//==============================================================
// ATALHOS
//==============================================================

window.exportarPDFBalanco=exportarPDFBalanco;

window.exportarExcelBalanco=exportarExcelBalanco;

//==============================================================
// FIM
//==============================================================
