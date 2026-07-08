/*
==========================================================
ETA PROFESSIONAL PWA
Módulo Sedimentação
Versão Beta 1.0
==========================================================
*/

import { salvarHistorico } from '../js/storage.js';

export function sedimentacaoView() {
  return `

<div class="modulo">

<h2>Sedimentação / Decantação</h2>

<div class="formulario">

<label>Vazão da ETA (m³/h)</label>
<input
id="sedVazao"
type="number"
value="100"
step="0.01">

<label>Área do Decantador (m²)</label>
<input
id="sedArea"
type="number"
value="50"
step="0.01">

<label>Volume do Decantador (m³)</label>
<input
id="sedVolume"
type="number"
value="150"
step="0.01">

<label>Turbidez de Entrada (NTU)</label>
<input
id="sedEntrada"
type="number"
value="100"
step="0.1">

<label>Turbidez de Saída (NTU)</label>
<input
id="sedSaida"
type="number"
value="2"
step="0.1">

<button id="btnSedimentacao">

Calcular

</button>

</div>

<div id="resultadoSedimentacao"></div>

</div>

`;
}

//==================================================

export function inicializarSEDIMENTACAO() {
  document
    .getElementById('btnSedimentacao')
    .addEventListener('click', calcularSedimentacao);
}

//==================================================

export function calcularSedimentacao() {
  const vazao = parseFloat(document.getElementById('sedVazao').value);

  const area = parseFloat(document.getElementById('sedArea').value);

  const volume = parseFloat(document.getElementById('sedVolume').value);

  const entrada = parseFloat(document.getElementById('sedEntrada').value);

  const saida = parseFloat(document.getElementById('sedSaida').value);

  if (
    isNaN(vazao) ||
    isNaN(area) ||
    isNaN(volume) ||
    isNaN(entrada) ||
    isNaN(saida)
  ) {
    alert('Preencha todos os campos.');

    return;
  }

  //------------------------------------
  // Taxa de aplicação superficial
  //------------------------------------

  const taxa = vazao / area;

  //------------------------------------
  // Tempo de detenção
  //------------------------------------

  const tempo = volume / vazao;

  //------------------------------------
  // Eficiência
  //------------------------------------

  const eficiencia = ((entrada - saida) / entrada) * 100;

  //------------------------------------

  let classificacao = '';

  if (eficiencia >= 95) {
    classificacao = 'Excelente';
  } else if (eficiencia >= 90) {
    classificacao = 'Muito Boa';
  } else if (eficiencia >= 80) {
    classificacao = 'Boa';
  } else if (eficiencia >= 70) {
    classificacao = 'Regular';
  } else {
    classificacao = 'Necessita Ajustes';
  }

  //------------------------------------

  let html = `

<table>

<tr>

<th>Parâmetro</th>

<th>Resultado</th>

</tr>

<tr>

<td>Taxa Superficial</td>

<td>${taxa.toFixed(2)} m³/m².h</td>

</tr>

<tr>

<td>Tempo de Detenção</td>

<td>${tempo.toFixed(2)} horas</td>

</tr>

<tr>

<td>Eficiência de Remoção</td>

<td>${eficiencia.toFixed(2)} %</td>

</tr>

<tr>

<td>Classificação</td>

<td><strong>${classificacao}</strong></td>

</tr>

</table>

`;

  document.getElementById('resultadoSedimentacao').innerHTML = html;

  //------------------------------------

  salvarHistorico('Sedimentação', {
    vazao,

    area,

    volume,

    entrada,

    saida,

    taxa,

    tempo,

    eficiencia,

    classificacao,
  });
}
