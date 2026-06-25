function pacView() {
  return `
    <h2>🧪 Cálculo de PAC</h2>

    <h3>Entradas</h3>
    <label>Concentração (mg/L)</label><input id="pac_conc" value="344">
    <label>Densidade (g/mL)</label><input id="pac_dens" value="1.22">
    <label>Diluição (%)</label><input id="pac_dilu" value="2">
    <label>Volume Solução (mL)</label><input id="pac_vol" value="1000">
    <label>Volume Jarro (L)</label><input id="pac_jarro" value="2">
    <button onclick="calcularPAC()">Calcular</button>

    <h3>Resultados</h3>
    <div id="pac_resumo"></div>
    <h4>Tabela de dosagens calculadas automaticamente</h4>
    <table id="pac_tabela" border="1"><tr><th>Dosagem (mg/L)</th><th>Volume (mL)</th></tr></table>

    <button onclick="mostrarJSON('pac_resultado')">Verificar dados técnicos</button>
    <pre id="pac_resultado" style="display:none"></pre>
  `;
}

function calcularPAC() {
  // ... cálculos fiéis ao Python ...

  let resultado = { talqual, sal, tabela_talqual };

  // Cards e tabela amigáveis
  document.getElementById("pac_resumo").innerHTML = `
    <p><b>Talqual:</b> ${talqual.volume_produto_ml} mL | ${talqual.concentracao_mgl} mg/L</p>
    <p><b>Sal:</b> ${sal.volume_produto_ml} mL | ${sal.concentracao_mgl} mg/L</p>
  `;
  let tabela = document.getElementById("pac_tabela");
  tabela.innerHTML = "<tr><th>Dosagem (mg/L)</th><th>Volume (mL)</th></tr>";
  tabela_talqual.forEach(item => {
    tabela.innerHTML += `<tr><td>${item.dosagem}</td><td>${item.ml}</td></tr>`;
  });

  // JSON escondido
  document.getElementById("pac_resultado").innerText = JSON.stringify(resultado, null, 2);
}

function mostrarJSON(id) {
  let el = document.getElementById(id);
  el.style.display = (el.style.display === "none") ? "block" : "none";
}
