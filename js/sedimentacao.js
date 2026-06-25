function sedimentacaoView() {
  let html = `
    <h2>💧 Cálculo de Sedimentação</h2>
    <input id="sed_largura" placeholder="Largura (m)">
    <input id="sed_comprimento" placeholder="Comprimento (m)">
    <input id="sed_n" placeholder="Nº Decantadores">
    <input id="sed_qeta" placeholder="Vazão ETA (m³/h)">
    <input id="sed_profundidade" placeholder="Profundidade (m)">
    <button onclick="calcularSedimentacao()">📊 Calcular</button>
    <pre id="sed_resultado"></pre>
  `;
  return html;
}

function calcularSedimentacao() {
  let largura = parseFloat(document.getElementById("sed_largura").value) || 0;
  let comprimento = parseFloat(document.getElementById("sed_comprimento").value) || 0;
  let n = parseFloat(document.getElementById("sed_n").value) || 0;
  let qeta = parseFloat(document.getElementById("sed_qeta").value) || 0;
  let profundidade = parseFloat(document.getElementById("sed_profundidade").value) || 0;

  let area = largura * comprimento * n;
  let qdia = qeta * 24;
  let taxa = qdia / area;

  let volume = largura * comprimento * profundidade * n;
  let tdh = volume / qeta;

  let altura_cm = profundidade * 100;
  let tempo_min = tdh * 60;
  let vel = altura_cm / tempo_min;

  let resultado = {
    area_m2: area.toFixed(2),
    taxa_m3_m2_dia: taxa.toFixed(2),
    volume_m3: volume.toFixed(2),
    tdh_h: tdh.toFixed(2),
    vel_cm_min: vel.toFixed(3),
    tempo_min: tempo_min.toFixed(2)
  };

  document.getElementById("sed_resultado").innerText = JSON.stringify(resultado, null, 2);
}
