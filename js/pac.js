function pacView() {
  return `
    <h2>🧪 Cálculo de PAC</h2>

    <h3>Entradas</h3>
    <label>Concentração (mg/L)</label>
    <input id="pac_conc" value="344">
    <label>Densidade (g/mL)</label>
    <input id="pac_dens" value="1.22">
    <label>Diluição (%)</label>
    <input id="pac_dilu" value="2">
    <label>Volume Solução (mL)</label>
    <input id="pac_vol" value="1000">
    <label>Volume Jarro (L)</label>
    <input id="pac_jarro" value="2">
    <button onclick="calcularPAC()">Calcular</button>

    <h3>Resultados</h3>
    <div id="pac_resumo"></div>
    <h4>Tabela de dosagens calculadas automaticamente</h4>
    <table id="pac_tabela" border="1">
      <tr><th>Dosagem (mg/L)</th><th>Volume (mL)</th></tr>
    </table>

    <button onclick="mostrarJSON('pac_resultado')">Ver detalhes técnicos (JSON)</button>
    <pre id="pac_resultado" style="display:none"></pre>
  `;
}

function calcularPAC() {
  let conc = parseFloat(document.getElementById("pac_conc").value);
  let dens = parseFloat(document.getElementById("pac_dens").value);
  let dilu = parseFloat(document.getElementById("pac_dilu").value);
  let vol = parseFloat(document.getElementById("pac_vol").value);
  let jarro = parseFloat(document.getElementById("pac_jarro").value);

  // Fórmulas fiéis ao Python
  let talqual = {
    volume_produto_ml: (conc * jarro / (dens * 1000)).toFixed(2),
    concentracao_mgl: (conc * dens * 1000 / vol).toFixed(0)
  };
  let sal = {
    volume_produto_ml: (conc * jarro / (dilu * 10)).toFixed(2),
    concentracao_mgl: (20000).toFixed(0)
  };

  let tabela_talqual = [20,30,40,50].map(d => ({
    dosagem: d,
    ml: (d * jarro / conc).toFixed(2)
  }));

  let resultado = { talqual, sal, tabela_talqual };

  // Resumo em cards
  document.getElementById("pac_resumo").innerHTML = `
    <p><b>Talqual:</b> ${talqual.volume_produto_ml} mL | ${talqual.concentracao_mgl} mg/L</p>
    <p><b>Sal:</b> ${sal.volume_produto_ml} mL | ${sal.concentracao_mgl} mg/L</p>
  `;

  // Tabela
  let tabela = document.getElementById("pac_tabela");
  tabela.innerHTML = "<tr><th>Dosagem (mg/L)</th><th>Volume (mL)</th></tr>";
  tabela_talqual.forEach(item => {
    tabela.innerHTML += `<tr><td>${item.dosagem}</td><td>${item.ml}</td></tr>`;
  });

  // JSON técnico
  document.getElementById("pac_resultado").innerText = JSON.stringify(resultado, null, 2);
}

function mostrarJSON(id) {
  let el = document.getElementById(id);
  el.style.display = (el.style.display === "none") ? "block" : "none";
}
