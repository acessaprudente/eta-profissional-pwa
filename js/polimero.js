function polimeroView() {
  let html = `
    <h2>🧬 Cálculo de Polímero</h2>
    <input id="pol_conc" placeholder="Concentração solução (mg/L)">
    <input id="pol_voljarro" placeholder="Volume jarro (L)">
    <input id="pol_ini" placeholder="Dosagem inicial (mg/L)">
    <input id="pol_fim" placeholder="Dosagem final (mg/L)">
    <input id="pol_inc" placeholder="Incremento (mg/L)">
    <button onclick="calcularPolimero()">📊 Calcular</button>
    <pre id="pol_resultado"></pre>
  `;
  return html;
}

function calcularPolimero() {
  let conc = parseFloat(document.getElementById("pol_conc").value) || 0;
  let vol = parseFloat(document.getElementById("pol_voljarro").value) || 0;
  let ini = parseFloat(document.getElementById("pol_ini").value) || 0;
  let fim = parseFloat(document.getElementById("pol_fim").value) || 0;
  let inc = parseFloat(document.getElementById("pol_inc").value) || 0;

  let tabela = [];
  for (let dosagem = ini; dosagem <= fim; dosagem += inc) {
    let ml = (dosagem * vol * 1000) / conc;
    tabela.push({ dosagem: dosagem.toFixed(3), ml: ml.toFixed(2) });
  }

  let resultado = { concentracao: conc, tabela };
  document.getElementById("pol_resultado").innerText = JSON.stringify(resultado, null, 2);
}
