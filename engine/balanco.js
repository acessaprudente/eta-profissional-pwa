/*
==========================================================
ETA PROFESSIONAL PWA
Módulo Balanço de Massa
Versão Beta 1.0
==========================================================
*/

import { salvarHistorico } from '../js/storage.js';

export function balancoView() {
  return `

<div class="modulo">

<h2>Balanço de Massa</h2>

<div class="formulario">

<label>Vazão da ETA (m³/h)</label>

<input
id="vazao"
type="number"
value="100"
step="0.01">

<label>Dosagem de PAC (mg/L)</label>

<input
id="dosagem"
type="number"
value="30"
step="0.1">

<label>Concentração do PAC (%)</label>

<input
id="concentracao"
type="number"
value="10"
step="0.1">

<button id="btnBalanco">

Calcular

</button>

</div>

<div id="resultadoBalanco"></div>

</div>

`;
}

//================================================

export function inicializarBALANCO() {
  document
    .getElementById('btnBalanco')
    .addEventListener('click', calcularBalanco);
}

//================================================

export function calcularBalanco() {
  const vazao = parseFloat(document.getElementById('vazao').value);

  const dosagem = parseFloat(document.getElementById('dosagem').value);

  const concentracao = parseFloat(
    document.getElementById('concentracao').value
  );

  if (isNaN(vazao) || isNaN(dosagem) || isNaN(concentracao)) {
    alert('Preencha todos os campos.');

    return;
  }

  const consumoHora = (vazao * 1000 * dosagem) / 1000000;

  const consumoDia = consumoHora * 24;

  const consumoMes = consumoDia * 30;

  const consumoAno = consumoDia * 365;

  let html = `

<table>

<tr>

<th>Descrição</th>

<th>Valor</th>

</tr>

<tr>

<td>Consumo por hora</td>

<td>${consumoHora.toFixed(2)} kg/h</td>

</tr>

<tr>

<td>Consumo diário</td>

<td>${consumoDia.toFixed(2)} kg/dia</td>

</tr>

<tr>

<td>Consumo mensal</td>

<td>${consumoMes.toFixed(2)} kg/mês</td>

</tr>

<tr>

<td>Consumo anual</td>

<td>${consumoAno.toFixed(2)} kg/ano</td>

</tr>

</table>

`;

  document.getElementById('resultadoBalanco').innerHTML = html;

  salvarHistorico('Balanço de Massa', {
    vazao,

    dosagem,

    concentracao,

    consumoHora,

    consumoDia,

    consumoMes,

    consumoAno,
  });
}
