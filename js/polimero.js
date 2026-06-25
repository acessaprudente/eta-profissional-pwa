function polimeroView() {
  let html = `
    <h2>🧬 Cálculo de Polímero</h2>
    <input id="pol_dose" placeholder="Dose Polímero (mg/L)">
    <input id="pol_vazao" placeholder="Vazão (m³/h)">
    <button onclick="calcularPolimero()">📊 Calcular</button>
    <p id="pol_resultado"></p>
  `;
  setTimeout(() => carregarDadosModulo("polimero", ["pol_dose","pol_vazao"]), 100);
  return html;
}

function calcularPolimero() {
  let dose = parseFloat(document.getElementById("pol_dose").value) || 0;
  let vazao = parseFloat(document.getElementById("pol_vazao").value) || 0;

  let massa = dose * vazao;
  document.getElementById("pol_resultado").innerText =
    `Consumo de Polímero = ${massa.toFixed(2)} g/h`;

  salvarDadosModulo("polimero", ["pol_dose","pol_vazao"]);
}
