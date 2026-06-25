function calView() {
  return `
    <h2>🧂 Cal Hidratada</h2>
    <label>Concentração da Solução (g/L)</label>
    <input id="cal_conc" value="50">
    <label>Volume do Jarro (L)</label>
    <input id="cal_vol" value="2">
    <label>Dosagem Inicial (mg/L)</label>
    <input id="cal_ini" value="10">
    <label>Dosagem Final (mg/L)</label>
    <input id="cal_fim" value="100">
    <label>Incremento (mg/L)</label>
    <input id="cal_inc" value="10">
    <button onclick="calcularCal()">Calcular</button>
    <table id="cal_tabela" border="1">
      <tr><th>Dosagem (mg/L)</th><th>Volume (mL)</th></tr>
    </table>
  `;
}

function calcularCal() {
  let conc = parseFloat(document.getElementById("cal_conc").value);
  let vol = parseFloat(document.getElementById("cal_vol").value);
  let ini = parseFloat(document.getElementById("cal_ini").value);
  let fim = parseFloat(document.getElementById("cal_fim").value);
  let inc = parseFloat(document.getElementById("cal_inc").value);

  let tabela = document.getElementById("cal_tabela");
  tabela.innerHTML = "<tr><th>Dosagem (mg/L)</th><th>Volume (mL)</th></tr>";

  for (let dosagem = ini; dosagem <= fim; dosagem += inc) {
    let ml = (dosagem * vol) / conc;
    let row = `<tr><td>${dosagem.toFixed(2)}</td><td>${ml.toFixed(2)}</td></tr>`;
    tabela.innerHTML += row;
  }
}
