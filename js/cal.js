function calView() {
  let html = `
    <h2>🧂 Cálculo de Cal</h2>
    <input id="cal_dose" placeholder="Dose Cal (mg/L)">
    <input id="cal_vazao" placeholder="Vazão (m³/h)">
    <button onclick="calcularCal()">📊 Calcular</button>
    <p id="cal_resultado"></p>
  `;
  setTimeout(() => carregarDadosModulo("cal", ["cal_dose","cal_vazao"]), 100);
  return html;
}

function calcularCal() {
  let dose = parseFloat(document.getElementById("cal_dose").value) || 0;
  let vazao = parseFloat(document.getElementById("cal_vazao").value) || 0;

  let massa = dose * vazao;
  document.getElementById("cal_resultado").innerText =
    `Consumo de Cal = ${massa.toFixed(2)} g/h`;

  salvarDadosModulo("cal", ["cal_dose","cal_vazao"]);
}
