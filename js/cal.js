function calView() {
  return `
    <h2>🧂 Cálculo de Cal</h2>
    <h3>Entradas</h3>
    <label>Massa (g)</label><input id="cal_massa" value="100">
    <label>Pureza (%)</label><input id="cal_pureza" value="90">
    <button onclick="calcularCal()">Calcular</button>

    <h3>Resultados</h3>
    <div id="cal_resumo"></div>
    <h4>Tabela de dosagens calculadas automaticamente</h4>
    <table id="cal_tabela" border="1"><tr><th>Dosagem</th><th>Valor</th></tr></table>

    <button onclick="mostrarJSON('cal_resultado')">Ver detalhes técnicos (JSON)</button>
    <pre id="cal_resultado" style="display:none"></pre>
  `;
}

function calcularCal() {
  let massa = parseFloat(document.getElementById("cal_massa").value);
  let pureza = parseFloat(document.getElementById("cal_pureza").value);

  let dosagem = (massa * pureza / 100).toFixed(2);
  let resultado = { massa, pureza, dosagem };

  document.getElementById("cal_resumo").innerHTML = `<p><b>Dosagem:</b> ${dosagem} g</p>`;
  let tabela = document.getElementById("cal_tabela");
  tabela.innerHTML = "<tr><th>Dosagem</th><th>Valor</th></tr>";
  tabela.innerHTML += `<tr><td>Cal Hidratada</td><td>${dosagem}</td></tr>`;
  document.getElementById("cal_resultado").innerText = JSON.stringify(resultado, null, 2);
}
