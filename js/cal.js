function calView() {
  let html = `
    <h2>🧂 Cálculo de Cal</h2>
    <input id="cal_conc" placeholder="Concentração solução (g/L)">
    <input id="cal_voljarro" placeholder="Volume jarro (L)">
    <input id="cal_ini" placeholder="Dosagem inicial (mg/L)">
    <input id="cal_fim" placeholder="Dosagem final (mg/L)">
    <input id="cal_inc" placeholder="Incremento (mg/L)">
    <button onclick="calcularCal()">📊 Calcular</button>
    <pre id="cal_resultado"></pre>
  `;
  return html;
}

function calcularCal() {
  let conc = parseFloat(document.getElementById("cal_conc").value) || 0;
  let vol = parseFloat(document.getElementById("cal_voljarro").value) || 0;
  let ini = parseFloat(document.getElementById("cal_ini").value) || 0;
  let fim = parseFloat(document.getElementById("cal_fim").value) || 0;
  let inc = parseFloat(document.getElementById("cal_inc").value) || 0;

  let tabela = [];
  for (let dosagem = ini; dosagem <= fim; dosagem += inc) {
    let ml = (dosagem * vol) / conc;
    tabela.push({ dosagem: dosagem.toFixed(2), ml: ml.toFixed(2) });
  }

  let conc_mgl = conc * 1000;
  let resultado = { concentracao: conc_mgl, tabela };

  document.getElementById("cal_resultado").innerText = JSON.stringify(resultado, null, 2);
}
