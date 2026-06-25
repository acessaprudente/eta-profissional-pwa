function sedimentacaoView() {
  return `
    <h2>💧 Sedimentação</h2>
    <h3>Entradas</h3>
    <label>Largura (m)</label><input id="sed_larg" value="5">
    <label>Comprimento (m)</label><input id="sed_comp" value="10">
    <label>Profundidade (m)</label><input id="sed_prof" value="3">
    <button onclick="calcularSedimentacao()">Calcular</button>

    <h3>Resultados</h3>
    <div id="sed_resumo"></div>
    <h4>Tabela de parâmetros calculados automaticamente</h4>
    <table id="sed_tabela" border="1"><tr><th>Parâmetro</th><th>Valor</th></tr></table>

    <button onclick="mostrarJSON('sed_resultado')">Verificar dados técnicos</button>
    <pre id="sed_resultado" style="display:none"></pre>
  `;
}

function calcularSedimentacao() {
  let larg = parseFloat(document.getElementById("sed_larg").value);
  let comp = parseFloat(document.getElementById("sed_comp").value);
  let prof = parseFloat(document.getElementById("sed_prof").value);

  let area = (larg * comp).toFixed(2);
  let volume = (area * prof).toFixed(2);
  let resultado = { larg, comp, prof, area, volume };

  document.getElementById("sed_resumo").innerHTML = `<p><b>Área:</b> ${area} m² | <b>Volume:</b> ${volume} m³</p>`;
  let tabela = document.getElementById("sed_tabela");
  tabela.innerHTML = "<tr><th>Parâmetro</th><th>Valor</th></tr>";
  tabela.innerHTML += `<tr><td>Área</td><td>${area}</td></tr>`;
  tabela.innerHTML += `<tr><td>Volume</td><td>${volume}</td></tr>`;
  document.get
}
