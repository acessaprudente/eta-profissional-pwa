function pacView() {
  return `
    <h2>🧪 Cálculo de PAC</h2>
    <section class="inputs">
      <label>Concentração produto (mg/L)</label><input id="pac_conc" value="344" type="number" step="any">
      <label>Densidade (g/mL)</label><input id="pac_dens" value="1.22" type="number" step="any">
      <label>Concentração comercial (%)</label><input id="pac_dilu" value="2" type="number" step="any">
      <label>Volume solução (mL)</label><input id="pac_vol" value="1000" type="number" step="any">
      <label>Volume jarro (L)</label><input id="pac_jarro" value="2" type="number" step="any">
      <button onclick="calcularPAC()">Calcular</button>
    </section>
    <section class="results">
      <div id="pac_resumo"></div>
      <h4>Tabela de dosagens</h4>
      <table id="pac_tabela" border="1"><tr><th>Dosagem mg/L</th><th>Volume mL</th></tr></table>
      <button onclick="mostrarJSON('pac_resultado')">Verificar dados técnicos</button>
      <pre id="pac_resultado" style="display:none"></pre>
    </section>`;
}
function calcularPAC() {
  const conc = parseFloat(document.getElementById('pac_conc').value) || 0;
  const dens = parseFloat(document.getElementById('pac_dens').value) || 1;
  const dilu = parseFloat(document.getElementById('pac_dilu').value) || 1;
  const jarro = parseFloat(document.getElementById('pac_jarro').value) || 1;
  const talqual_volume_ml = ((conc * jarro) / (conc || 1)).toFixed(2);
  const talqual_conc_mgL = Math.round(conc * dens * 1000);
  const doses = [20,30,40,50].map(d => ({ dosagem: d, ml: ((d * jarro) / (conc || 1)).toFixed(2) }));
  const resultado = { talqual: { volume_produto_ml: talqual_volume_ml, concentracao_mgl: talqual_conc_mgL }, sal: { volume_produto_ml: ((conc * jarro) / (dilu || 1)).toFixed(2), concentracao_mgl: 20000 }, tabela_talqual: doses };
  document.getElementById('pac_resumo').innerHTML = `<p><b>Talqual:</b> ${resultado.talqual.volume_produto_ml} mL | ${resultado.talqual.concentracao_mgl} mg/L</p><p><b>Sal:</b> ${resultado.sal.volume_produto_ml} mL | ${resultado.sal.concentracao_mgl} mg/L</p>`;
  const tabela = document.getElementById('pac_tabela');
  tabela.innerHTML = '<tr><th>Dosagem mg/L</th><th>Volume mL</th></tr>' + resultado.tabela_talqual.map(i => `<tr><td>${i.dosagem}</td><td>${i.ml}</td></tr>`).join('');
  document.getElementById('pac_resultado').innerText = JSON.stringify(resultado, null, 2);
}
