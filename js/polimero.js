function polimeroView() {
  return `
    <h2>🧬 Polímero</h2>
    <label>Concentração da Solução (mg/L)</label>
    <input id="pol_conc" value="100">
    <label>Volume do Jarro (L)</label>
    <input id="pol_vol" value="2">
    <label>Dosagem Inicial (mg/L)</label>
    <input id="pol_ini" value="0.1">
    <label>Dosagem Final (mg/L)</label>
    <input id="pol_fim" value="1.0">
    <label>Incremento (mg/L)</label>
    <input id="pol_inc" value="0.1">
    <button onclick="calcularPolimero()">Calcular</button>
    <table id="pol_tabela" border="1">
      <tr><th>Dosagem (mg/L)</th><th>Volume (mL)</th></tr>
    </table>
    <pre id="pol_resultado"></pre>
  `;
}

function calcularPolimero() {
  let conc = parseFloat(document.getElementById("pol_conc").value);
  let vol = parseFloat(document.getElementById("pol_vol").value);
  let ini = parseFloat(document.getElementById("pol_ini").value);
  let fim = parseFloat(document.getElementById("pol_fim").value);
  let inc = parseFloat(document.getElementById("pol_inc").value);

  let tabela = document.getElementById("pol_tabela");
  tabela.innerHTML = "<tr><th>Dosagem (mg/L)</th><th>Volume (mL)</th></tr>";

  let resultados = [];
  for (let dosagem = ini; dosagem <= fim + 1e-9; dosagem += inc) {
    let ml_jarro = (dosagem * vol * 1000) / conc;
    resultados.push({ dosagem: dosagem.toFixed(3), ml: ml_jarro.toFixed(2) });
    tabela.innerHTML += `<tr><td>${dosagem.toFixed(3)}</td><td>${ml_jarro.toFixed(2)}</td></tr>`;
  }

  let resultado = {
    concentracao: conc,
    tabela: resultados
  };

  document.getElementById("pol_resultado").innerText = JSON.stringify(resultado, null, 2);
}
