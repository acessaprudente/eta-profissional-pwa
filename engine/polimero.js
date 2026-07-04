/*
==========================================================
ETA PROFESSIONAL PWA
Módulo Polímero
Versão Beta 1.0
==========================================================
*/

import { salvarHistorico } from '../js/storage.js';

export function polimeroView() {
  return `

<div class="modulo">

<h2>Polímero</h2>

<div class="formulario">

<label>Concentração da solução (mg/L)</label>

<input
id="polConcentracao"
type="number"
value="1000"
>

<label>Volume do Jarro (L)</label>

<input
id="polVolume"
type="number"
value="2"
step="0.1"
>

<label>Dosagem Inicial (mg/L)</label>

<input
id="polInicial"
type="number"
value="0.10"
step="0.05"
>

<label>Dosagem Final (mg/L)</label>

<input
id="polFinal"
type="number"
value="2.00"
step="0.05"
>

<label>Incremento (mg/L)</label>

<input
id="polIncremento"
type="number"
value="0.10"
step="0.05"
>

<button id="btnCalcularPOL">

Calcular

</button>

</div>

<div
id="resultadoPOL"
class="resultado">

</div>

</div>

`;
}

//==========================================================

export function inicializarPOLIMERO() {
  document
    .getElementById('btnCalcularPOL')
    .addEventListener('click', calcularPOLIMERO);
}

//==========================================================

export function calcularPOLIMERO() {
  const concentracao = parseFloat(
    document.getElementById('polConcentracao').value
  );

  const volume = parseFloat(document.getElementById('polVolume').value);

  const inicial = parseFloat(document.getElementById('polInicial').value);

  const final = parseFloat(document.getElementById('polFinal').value);

  const incremento = parseFloat(document.getElementById('polIncremento').value);

  if (
    isNaN(concentracao) ||
    isNaN(volume) ||
    isNaN(inicial) ||
    isNaN(final) ||
    isNaN(incremento)
  ) {
    alert('Preencha todos os campos.');

    return;
  }

  let html = `

<table>

<tr>

<th>Dosagem (mg/L)</th>

<th>Volume (mL)</th>

</tr>

`;

  const historico = [];

  for (let dose = inicial; dose <= final + 0.00001; dose += incremento) {
    const ml = (dose * volume * 1000) / concentracao;

    historico.push({
      dosagem: dose,

      ml: ml,
    });

    html += `

<tr>

<td>${dose.toFixed(2)}</td>

<td>${ml.toFixed(3)}</td>

</tr>

`;
  }

  html += `

</table>

`;

  document.getElementById('resultadoPOL').innerHTML = html;

  salvarHistorico('Polímero', historico);
}
