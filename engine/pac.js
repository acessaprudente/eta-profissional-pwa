/*
==========================================================
ETA PROFESSIONAL PWA
Módulo PAC Férrico
Versão Beta 1.0
==========================================================
*/

export function pacView() {
  return `

<div class="modulo">

<h2>PAC Férrico</h2>

<div class="formulario">

<label>Concentração do Produto (mg/L)</label>

<input
id="pacConcentracao"
type="number"
value="100000"
>

<label>Volume do Jarro (L)</label>

<input
id="pacVolume"
type="number"
value="2"
step="0.1"
>

<label>Dosagem Inicial (mg/L)</label>

<input
id="pacInicial"
type="number"
value="5"
step="0.1"
>

<label>Dosagem Final (mg/L)</label>

<input
id="pacFinal"
type="number"
value="50"
step="0.1"
>

<label>Incremento (mg/L)</label>

<input
id="pacIncremento"
type="number"
value="5"
step="0.1"
>

<button id="btnCalcularPAC">

Calcular

</button>

</div>

<div
id="resultadoPAC"
class="resultado"
>

</div>

</div>

`;
}

//==========================================================

export function inicializarPAC() {
  document
    .getElementById('btnCalcularPAC')
    .addEventListener('click', calcularPAC);
}

//==========================================================

export function calcularPAC() {
  const concentracao = parseFloat(
    document.getElementById('pacConcentracao').value
  );

  const volume = parseFloat(document.getElementById('pacVolume').value);

  const inicial = parseFloat(document.getElementById('pacInicial').value);

  const final = parseFloat(document.getElementById('pacFinal').value);

  const incremento = parseFloat(document.getElementById('pacIncremento').value);

  let html = '';

  html += `

<table>

<tr>

<th>Dosagem</th>

<th>mL</th>

</tr>

`;

  for (let d = inicial; d <= final; d += incremento) {
    const ml = ((d * volume) / concentracao) * 1000;

    html += `

<tr>

<td>${d.toFixed(2)}</td>

<td>${ml.toFixed(3)}</td>

</tr>

`;
  }

  html += `

</table>

`;

  document.getElementById('resultadoPAC').innerHTML = html;
}
