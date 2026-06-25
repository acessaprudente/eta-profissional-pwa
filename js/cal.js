function calView() {
  return `
    <h2>🧂 Cálculo de Cal Hidratada</h2>
    <h3>Entradas</h3>
    <label>pH inicial</label><input id="cal_ph_inicial" value="6.5">
    <label>pH desejado</label><input id="cal_ph_final" value="7.5">
    <label>Alcalinidade P (mg/L CaCO₃)</label><input id="cal_alc" value="20">
    <label>Volume Jarro (L)</label><input id="cal_jarro" value="2">
    <button onclick="calcularCal()">Calcular</button>

    <h3>Resultados</h3>
    <div id="cal_resumo"></div>
    <h4>Dosagem calculada automaticamente</h4>
    <table id="cal_tabela" border="1"><tr><th>Parâmetro</th><th>Valor</th></tr></table>

    <button onclick="mostrarJSON('cal_resultado')">Verificar dados técnicos</button>
    <pre id="cal_resultado" style="display:none"></pre>
  `;
}

function calcularCal() {
  let ph_inicial = parseFloat(document.getElementById("cal_ph_inicial").value);
  let ph_final   = parseFloat(document.getElementById("cal_ph_final").value);
  let alc        = parseFloat(document.getElementById("cal_alc").value);
  let jarro      = parseFloat(document.getElementById("cal_jarro").value);

  let delta_ph = ph_final - ph_inicial;
  let dosagem_mgL = (delta_ph * alc * 1.5).toFixed(2); // fator ajustável
  let volume_ml = (dosagem_mgL * jarro / 1000).toFixed(2);

  let resultado = { ph_inicial, ph_final, alc, delta_ph, dosagem_mgL, volume_ml };

  document.getElementById("cal_resumo").innerHTML = `
    <p><b>Dosagem aplicada:</b> ${dosagem_mgL} mg/L</p>
    <p><b>Volume de solução:</b> ${volume_ml} mL</p>
  `;
  let tabela = document.getElementById("cal_tabela");
  tabela.innerHTML = "<tr><th>Parâmetro</th><th>Valor</th></tr>";
  tabela.innerHTML += `<tr><td>ΔpH</td><td>${delta_ph}</td></tr>`;
  tabela.innerHTML += `<tr><td>Dosagem (mg/L)</td><td>${dosagem_mgL}</td></tr>`;
  tabela.innerHTML += `<tr><td>Volume aplicado (mL)</td><td>${volume_ml}</td></tr>`;
  document.getElementById("cal_resultado").innerText = JSON.stringify(resultado, null, 2);
}
