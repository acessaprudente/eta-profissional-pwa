
function balancoView() {
  let html = `
    <h2>⚖ Balanço de Massa</h2>
    <input id="Q1" placeholder="Vazão Rio do Peixe (m³/h)">
    <input id="Q2" placeholder="Vazão Santo Anastácio (m³/h)">
    <input id="Q3" placeholder="Vazão Balneário (m³/h)">
    <input id="T1" placeholder="Turbidez Rio do Peixe (NTU)">
    <input id="T2" placeholder="Turbidez Santo Anastácio (NTU)">
    <input id="T3" placeholder="Turbidez Balneário (NTU)">
    <input id="T4" placeholder="Turbidez Mistura Final (NTU)">
    <button onclick="calcularBalanco()">📊 Calcular</button>
    <p id="resultado"></p>
  `;
  // Carregar dados salvos ao abrir o módulo
  setTimeout(() => carregarDadosModulo("balanco", ["Q1","Q2","Q3","T1","T2","T3","T4"]), 100);
  return html;
}

function calcularBalanco() {
  let Q1 = parseFloat(document.getElementById("Q1").value) || 0;
  let Q2 = parseFloat(document.getElementById("Q2").value) || 0;
  let Q3 = parseFloat(document.getElementById("Q3").value) || 0;
  let T1 = parseFloat(document.getElementById("T1").value) || 0;
  let T2 = parseFloat(document.getElementById("T2").value) || 0;
  let T3 = parseFloat(document.getElementById("T3").value) || 0;
  let T4 = parseFloat(document.getElementById("T4").value) || 0;

  let Qtotal = Q1 + Q2 + Q3;
  let msg = "";

  if (T4 === 0 && Qtotal > 0) {
    T4 = (Q1*T1 + Q2*T2 + Q3*T3) / Qtotal;
    msg = `T4 = ${T4.toFixed(2)} NTU\nVazão Total = ${Qtotal.toFixed(2)} m³/h`;
  } else if (T1 === 0 && Q1 > 0) {
    T1 = (T4*Qtotal - Q2*T2 - Q3*T3) / Q1;
    msg = `T1 = ${T1.toFixed(2)} NTU\nVazão Total = ${Qtotal.toFixed(2)} m³/h`;
  } else if (T2 === 0 && Q2 > 0) {
    T2 = (T4*Qtotal - Q1*T1 - Q3*T3) / Q2;
    msg = `T2 = ${T2.toFixed(2)} NTU\nVazão Total = ${Qtotal.toFixed(2)} m³/h`;
  } else if (T3 === 0 && Q3 > 0) {
    T3 = (T4*Qtotal - Q1*T1 - Q2*T2) / Q3;
    msg = `T3 = ${T3.toFixed(2)} NTU\nVazão Total = ${Qtotal.toFixed(2)} m³/h`;
  } else {
    msg = "Insira 0 no campo que deseja calcular.";
  }

  document.getElementById("resultado").innerText = msg;

  // Salvar os valores digitados
  salvarDadosModulo("balanco", ["Q1","Q2","Q3","T1","T2","T3","T4"]);
}
