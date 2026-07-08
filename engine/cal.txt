/*
==========================================================
ETA PROFESSIONAL PWA
Módulo Cal Hidratada
Versão Beta 1.0
==========================================================
*/

export function calView() {
  return `

<div class="modulo">

<h2>Cal Hidratada</h2>

<div class="formulario">

<label>Concentração da solução (mg/L)</label>

<input
id="calConcentracao"
type="number"
value="10000"
>

<label>Volume do Jarro (L)</label>

<input
id="calVolume"
type="number"
value="2"
step="0.1"
>

<label>Dosagem Inicial (mg/L)</label>

<input
id="calInicial"
type="number"
value="5"
step="0.1"
>

<label>Dosagem Final (mg/L)</label>

<input
id="calFinal"
type="number"
value="50"
step="0.1"
>

<label>Incremento (mg/L)</label>

<input
id="calIncremento"
type="number"
value="5"
step="0.1"
>

<button id="btnCalcularCAL">

Calcular

</button>

</div>

<div
id="resultadoCAL"
class="resultado">

</div>

</div>

`;
}

//==========================================================

export function inicializarCAL() {
  document
    .getElementById('btnCalcularCAL')
    .addEventListener('click', calcularCAL);
}

//==========================================================

export function calcularCAL() {
  const concentracao = parseFloat(
    document.getElementById('calConcentracao').value
  );

  const volume = parseFloat(document.getElementById('calVolume').value);

  const inicial = parseFloat(document.getElementById('calInicial').value);

  const final = parseFloat(document.getElementById('calFinal').value);

  const incremento = parseFloat(document.getElementById('calIncremento').value);

  let html = '';

  html += `

<table>

<tr>

<th>Dosagem (mg/L)</th>

<th>Volume (mL)</th>

</tr>

`;

  for (let dose = inicial; dose <= final; dose += incremento) {
    const ml = (dose * volume * 1000) / concentracao;

    html += `

<tr>

<td>${dose.toFixed(2)}</td>

<td>${ml.toFixed(2)}</td>

</tr>

`;
  }

  html += `

</table>

`;

  document.getElementById('resultadoCAL').innerHTML = html;
}
