function balancoView() {
  return `
    <h2>⚖️ Balanço de Massa</h2>
    <section class="inputs">
      <label>Vazão (m³/h)</label><input id="bal_q" value="100" type="number" step="any">
      <label>Concentração (mg/L)</label><input id="bal_c" value="50" type="number" step="any">
      <button onclick="calcularBalanco()">Calcular</button>
    </section>
    <section class="results">
      <div id="bal_resumo"></div>
      <h4>Tabela de fluxos</h4>
      <table id="bal_tabela" border="1"><tr><th>Fluxo</th><th>Valor</th></tr></table>
      <button onclick="mostrarJSON('bal_resultado')">Verificar dados técnicos</button>
      <pre id="bal_resultado" style="display:none"></pre>
    </section>`;
}
function calcularBalanco() {
  const q = parseFloat(document.getElementById('bal_q').value) || 0;
  const c = parseFloat(document.getElementById('bal_c').value) || 0;
  const carga_mg_h = q * 1000 * c;
  const carga_g_h = carga_mg_h / 1000;
  const resultado = { vazao_m3h: q, concentracao_mgL: c, carga_mg_h: carga_mg_h, carga_g_h: carga_g_h };
  document.getElementById('bal_resumo').innerHTML = `<p><b>Carga:</b> ${fmt(carga_mg_h,2)} mg/h (${fmt(carga_g_h,3)} g/h)</p>`;
  const tabela = document.getElementById('bal_tabela');
  tabela.innerHTML = '<tr><th>Fluxo</th><th>Valor</th></tr>' +
    `<tr><td>Vazão (m³/h)</td><td>${q}</td></tr>` +
    `<tr><td>Concentração (mg/L)</td><td>${c}</td></tr>` +
    `<tr><td>Carga (mg/h)</td><td>${fmt(carga_mg_h,2)}</td></tr>` +
    `<tr><td>Carga (g/h)</td><td>${fmt(carga_g_h,3)}</td></tr>`;
  document.getElementById('bal_resultado').innerText = JSON.stringify(resultado, null, 2);
}
