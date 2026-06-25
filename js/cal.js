// Hidróxido de cálcio Ca(OH)2
function calView() {
  return `
    <h2>🧂 Cálculo de Cal Hidratada Ca(OH)₂</h2>
    <section class="inputs">
      <label>pH inicial</label><input id="cal_ph_inicial" value="6.5" type="number" step="any">
      <label>pH desejado</label><input id="cal_ph_final" value="7.5" type="number" step="any">
      <label>Alcalinidade P (mg/L como CaCO3)</label><input id="cal_alc" value="20" type="number" step="any">
      <label>Volume jarro (L)</label><input id="cal_jarro" value="2" type="number" step="any">
      <label>Pureza do produto (%)</label><input id="cal_pureza" value="90" type="number" step="any">
      <button onclick="calcularCal()">Calcular</button>
    </section>
    <section class="results">
      <div id="cal_resumo"></div>
      <h4>Dosagem calculada</h4>
      <table id="cal_tabela" border="1"><tr><th>Parâmetro</th><th>Valor</th></tr></table>
      <button onclick="mostrarJSON('cal_resultado')">Verificar dados técnicos</button>
      <pre id="cal_resultado" style="display:none"></pre>
    </section>`;
}
function calcularCal() {
  const ph_inicial = parseFloat(document.getElementById('cal_ph_inicial').value) || 0;
  const ph_final = parseFloat(document.getElementById('cal_ph_final').value) || 0;
  const alcalinidade = parseFloat(document.getElementById('cal_alc').value) || 0;
  const jarro = parseFloat(document.getElementById('cal_jarro').value) || 1;
  const pureza = parseFloat(document.getElementById('cal_pureza').value) || 100;
  const delta_ph = ph_final - ph_inicial;
  const fator = 1.0;
  const dosagem_raw = delta_ph * alcalinidade * fator;
  const dosagem_mgL = dosagem_raw / (pureza / 100 || 1);
  const massa_total_mg = dosagem_mgL * jarro;
  const volume_ml_equiv = massa_total_mg / 1000;
  const resultado = { ph_inicial, ph_final, delta_ph, alcalinidade_mgL_as_CaCO3: alcalinidade, pureza_percent: pureza, dosagem_mgL: Number(dosagem_mgL.toFixed(2)), massa_total_mg: Number(massa_total_mg.toFixed(2)), volume_ml_equiv: Number(volume_ml_equiv.toFixed(2)) };
  document.getElementById('cal_resumo').innerHTML = `<p><b>Dosagem:</b> ${resultado.dosagem_mgL} mg/L Ca(OH)₂</p><p><b>Massa total:</b> ${resultado.massa_total_mg} mg</p>`;
  const tabela = document.getElementById('cal_tabela');
  tabela.innerHTML = '<tr><th>Parâmetro</th><th>Valor</th></tr>' +
    `<tr><td>ΔpH</td><td>${resultado.delta_ph}</td></tr>` +
    `<tr><td>Alcalinidade (mg/L como CaCO3)</td><td>${resultado.alcalinidade_mgL_as_CaCO3}</td></tr>` +
    `<tr><td>Dosagem (mg/L Ca(OH)₂)</td><td>${resultado.dosagem_mgL}</td></tr>` +
    `<tr><td>Massa total (mg)</td><td>${resultado.massa_total_mg}</td></tr>`;
  document.getElementById('cal_resultado').innerText = JSON.stringify(resultado, null, 2);
}
