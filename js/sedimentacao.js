function sedimentacaoView() {
  let html = `
    <h2>💧 Cálculo de Sedimentação</h2>
    <input id="sed_vazao" placeholder="Vazão (m³/h)">
    <input id="sed_area" placeholder="Área do Decantador (m²)">
    <button onclick="calcularSedimentacao()">📊 Calcular</button>
    <p id="sed_resultado"></p>
  `;
  setTimeout(() => carregarDadosModulo("sedimentacao", ["sed_vazao","sed_area"]), 100);
  return html;
}

function calcularSedimentacao() {
  let vazao = parseFloat(document.getElementById("sed_vazao").value) || 0;
  let area = parseFloat(document.getElementById("sed_area").value) || 0;

  if (area > 0) {
    let velocidade = vazao / area;
    document.getElementById("sed_resultado").innerText =
      `Velocidade de Sedimentação = ${velocidade.toFixed(2)} m/h`;
  } else {
    document.getElementById("sed_resultado").innerText =
      "Informe uma área válida.";
  }

  salvarDadosModulo("sedimentacao", ["sed_vazao","sed_area"]);
}
