function polimeroView() {
  return `
    <h2>🧬 Cálculo de Polímero</h2>
    <section class="inputs">
      <label>Concentração (%)</label><input id="pol_conc" value="0.1" type="number" step="any">
      <label>Volume jarro (L)</label><input id="pol_jarro" value="2" type="number" step="any">
      <label>Dosagens teste (mg/L, vírgula)</label><input id="pol_doses" value="1,2,3" type="text">
      <button onclick="calcularPolimero()">Calcular</button>
    </section>
    <section class="results">
      <div id="pol_resumo"></div>
      <h4>Tabela de dosagens</h4>
      <table id="pol_tabela" border="1"><tr><th>Dosagem mg/L</th><th>Volume mL</th></tr></table>
      <button onclick="mostrarJSON('pol_resultado')">Verificar dados técnicos</button>
      <pre id="pol_resultado" style="display:none"></pre>
    </section>`;
}
function calcularPolimero() {
  const conc = parseFloat(document.getElementById('pol_conc').value) || 0;
  const jarro = parseFloat(document.getElementById('pol_jarro').value) || 1;
  const doses = (document.getElementById('pol_doses').value || '1,2,3').split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
  const conc_mg_per_mL = conc * 10;
  const tabela = doses.map(d => ({ dosagem_mgL: d, volume_mL: ((d * jarro) / (conc_mg_per_mL || 1)).toFixed(2) }));
  const resultado = { conc_percent: conc, jarro_L: jarro, tabela };
  document.getElementById('pol_resumo').innerHTML = `<p><b>Concentração:</b> ${conc}% | <b>Jarro:</b> ${jarro} L</p>`;
  const tableEl = document.getElementById('pol_tabela');
  tableEl.innerHTML = '<tr><th>Dosagem mg/L</th><th>Volume mL</th></tr>' + tabela.map(r => `<tr><td>${r.dosagem_mgL}</td><td>${r.volume_mL}</td></tr>`).join('');
  document.getElementById('pol_resultado').innerText = JSON.stringify(resultado, null, 2);
}
