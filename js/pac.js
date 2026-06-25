function pacView() {
  let html = `
    <h2>🧪 Cálculo de PAC</h2>
    <input id="pac_dose" placeholder="Dose PAC (mg/L)">
    <input id="pac_vazao" placeholder="Vazão (m³/h)">
    <button onclick="calcularPAC()">📊 Calcular</button>
    <p id="pac_resultado"></p>
  `;
  setTimeout(() => carregarDadosModulo("pac", ["pac_dose","pac_vazao"]), 100);
  return html;
}

function calcularPAC() {
  let dose = parseFloat(document.getElementById("pac_dose").value) || 0;
  let vazao = parseFloat(document.getElementById("pac_vazao").value) || 0;

  let massa = dose * vazao;
  document.getElementById("pac_resultado").innerText =
    `Consumo de PAC = ${massa.toFixed(2)} g/h`;

  salvarDadosModulo("pac", ["pac_dose","pac_vazao"]);
}
