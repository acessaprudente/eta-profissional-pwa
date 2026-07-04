/*
==========================================================
ETA PROFESSIONAL PWA
Módulo Jar Test
Versão Beta 1.0
==========================================================
*/

import { salvarHistorico } from '../js/storage.js';

export function jarView() {
  return `

<div class="modulo">

<h2>Jar Test</h2>

<div class="formulario">

<label>Volume do Jarro (L)</label>
<input id="jarVolume" type="number" value="2" step="0.1">

<label>Concentração da Solução de PAC (mg/L)</label>
<input id="jarConcentracao" type="number" value="20000">

<label>Dosagem Inicial (mg/L)</label>
<input id="jarInicial" type="number" value="5">

<label>Dosagem Final (mg/L)</label>
<input id="jarFinal" type="number" value="50">

<label>Incremento (mg/L)</label>
<input id="jarIncremento" type="number" value="5">

<button id="btnMontarJar">
Montar Jar Test
</button>

</div>

<div id="resultadoJar"></div>

</div>

`;
}

//==========================================================

export function inicializarJAR() {
  document
    .getElementById('btnMontarJar')
    .addEventListener('click', calcularJar);
}

//==========================================================

export function calcularJar() {
  const volume = parseFloat(document.getElementById('jarVolume').value);

  const concentracao = parseFloat(
    document.getElementById('jarConcentracao').value
  );

  const inicial = parseFloat(document.getElementById('jarInicial').value);

  const final = parseFloat(document.getElementById('jarFinal').value);

  const incremento = parseFloat(document.getElementById('jarIncremento').value);

  if (
    isNaN(volume) ||
    isNaN(concentracao) ||
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

<th>Jarro</th>
<th>Dosagem (mg/L)</th>
<th>Pipetar (mL)</th>
<th>Turbidez Final (NTU)</th>
<th>Observação</th>

</tr>

`;

  let historico = [];

  let jarro = 1;

  for (let dose = inicial; dose <= final + 0.00001; dose += incremento) {
    const ml = (dose * volume * 1000) / concentracao;

    html += `

<tr>

<td>${jarro}</td>

<td>${dose.toFixed(2)}</td>

<td>${ml.toFixed(2)}</td>

<td>
<input
type="number"
id="ntu${jarro}"
style="width:80px">
</td>

<td>
<input
type="text"
id="obs${jarro}"
placeholder="Observações">
</td>

</tr>

`;

    historico.push({
      jarro,

      dosagem: dose,

      ml,
    });

    jarro++;
  }

  html += `

</table>

<br>

<button id="btnSalvarJar">

Salvar Resultado

</button>

`;

  document.getElementById('resultadoJar').innerHTML = html;

  document
    .getElementById('btnSalvarJar')
    .addEventListener('click', () => salvarResultado(historico));
}

//==========================================================

function salvarResultado(historico) {
  historico.forEach((item) => {
    item.ntu = document.getElementById('ntu' + item.jarro).value;

    item.observacao = document.getElementById('obs' + item.jarro).value;
  });

  salvarHistorico('Jar Test', historico);

  alert('Jar Test salvo com sucesso.');
}
