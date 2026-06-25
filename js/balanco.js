function balancoView() {
  return `
    <h2>⚖️ Balanço de Massa</h2>
    <h3>Entradas</h3>
    <label>Vazão (m³/h)</label><input id="bal_q" value="100">
    <label>Concentração (mg/L)</label><input id="bal_c" value="50">
    <button onclick="calcularBalanco()">Calcular</button>

    <h3>Resultados</h3>
    <div id="bal_resumo"></div>
    <h4>Tabela de fluxos calculados automaticamente</h4>
    <table id="bal_tabela" border="1"><tr><th>Fluxo</th><th>Valor</th></tr></table>

    <button onclick="mostrarJSON('bal_resultado')">Ver detalhes técnicos (JSON)</button>
    <pre id="bal_resultado" style="display:none"></pre>
  `;
}

function calcularBalanco() {
  let q = parseFloat(document.getElementById("bal_q").value);
  let c = parseFloat(document.getElementById("bal_c").value);

  let carga = (q * c).toFixed(2);
  let resultado = { vazao: q, concentracao: c, carga };

  document.getElementById("bal_resumo").innerHTML = `<p><b>Carga:</b> ${carga} mg/h</p>`;
  let tabela = document.getElementById("bal_tabela");
  tabela.innerHTML = "<tr><th>Fluxo</th><th>Valor</th></tr>";
  tabela.innerHTML += `<tr><td>Carga</td><td>${carga}</td></tr>`;
  document.getElementById("bal_resultado").innerText = JSON.stringify(resultado, null, 2);
}
