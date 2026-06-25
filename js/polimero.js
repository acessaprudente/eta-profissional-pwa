function polimeroView() {
  return `
    <h2>🧬 Cálculo de Polímero</h2>
    <h3>Entradas</h3>
    <label>Concentração (%)</label><input id="pol_conc" value="0.1">
    <label>Volume Jarro (L)</label><input id="pol_jarro" value="2">
    <button onclick="calcularPolimero()">Calcular</button>

    <h3>Resultados</h3>
    <div id="pol_resumo"></div>
    <h4>Tabela de dosagens calculadas automaticamente</h4>
    <table id="pol_tabela" border="1"><tr><th>Dosagem</th><th>Volume</th></tr></table>

    <button onclick="mostrarJSON('pol_resultado')">Ver detalhes técnicos (JSON)</button>
    <pre id="pol_resultado" style="display:none"></pre>
  `;
}

function calcularPolimero() {
  let conc = parseFloat(document.getElementById("pol_conc").value);
  let jarro = parseFloat(document.getElementById("pol_jarro").value);

  let volume = (conc * jarro).toFixed(2);
  let resultado = { conc, jarro, volume };

  document.getElementById("pol_resumo").innerHTML = `<p><b>Volume:</b> ${volume} mL</p>`;
  let tabela = document.getElementById("pol_tabela");
  tabela.innerHTML = "<tr><th>Dosagem</th><th>Volume</th></tr>";
  tabela.innerHTML += `<tr><td>Polímero</td><td>${volume}</td></tr>`;
  document.getElementById("pol_resultado").innerText = JSON.stringify(resultado, null, 2);
}
