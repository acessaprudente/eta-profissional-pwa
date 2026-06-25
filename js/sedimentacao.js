function sedimentacaoView() {
  return `
    <h2>💧 Sedimentação</h2>
    <section class="inputs">
      <label>Largura (m)</label><input id="sed_larg" value="5" type="number" step="any">
      <label>Comprimento (m)</label><input id="sed_comp" value="10" type="number" step="any">
      <label>Profundidade (m)</label><input id="sed_prof" value="3" type="number" step="any">
      <button onclick="calcularSedimentacao()">Calcular</button>
    </section>
    <section class="results">
      <div id="sed_resumo"></div>
      <h4>Tabela de parâmetros</h4>
      <table id="sed_tabela" border="1"><tr><th>Parâmetro</th><th>Valor</th></tr></table>
      <button onclick="mostrarJSON('sed_resultado')">Verificar dados técnicos</button>
      <pre id="sed_resultado" style="display:none"></pre>
    </section>`;
}
function calcularSedimentacao() {
  const larg = parseFloat(document.getElementById('sed_larg').value) || 0;
  const comp = parseFloat(document.getElementById('sed_comp').value) || 0;
  const prof = parseFloat(document.getElementById('sed_prof').value) || 0;
  const area = larg * comp;
  const volume = area * prof;
  const resultado = { larg, comp, prof, area, volume };
  document.getElementById('sed_resumo').innerHTML = `<p><b>Área:</b> ${fmt(area,2)} m² | <b>Volume:</b> ${fmt(volume,2)} m³</p>`;
  const tabela = document.getElementById('sed_tabela');
  tabela.innerHTML = '<tr><th>Parâmetro</th><th>Valor</th></tr>' +
    `<tr><td>Largura (m)</td><td>${larg}</td></tr>` +
    `<tr><td>Comprimento (m)</td><td>${comp}</td></tr>` +
    `<tr><td>Profundidade (m)</td><td>${prof}</td></tr>` +
    `<tr><td>Área (m²)</td><td>${fmt(area,2)}</td></tr>` +
    `<tr><td>Volume (m³)</td><td>${fmt(volume,2)}</td></tr>`;
  document.getElementById('sed_resultado').innerText = JSON.stringify(resultado, null, 2);
}
