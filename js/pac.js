function pacView() {
  return `
    <h2>🧪 PAC Férrico</h2>
    <label>Concentração (g/L)</label>
    <input id="pac_conc" value="344">
    <label>Densidade (g/mL)</label>
    <input id="pac_dens" value="1.22">
    <label>Diluição (%)</label>
    <input id="pac_dil" value="2">
    <label>Volume Solução (mL)</label>
    <input id="pac_vol" value="1000">
    <label>Volume Jarro (L)</label>
    <input id="pac_jarro" value="2">
    <button onclick="calcularPAC()">Calcular</button>
    <table id="pac_tabela" border="1">
      <tr><th>Dosagem (mg/L)</th><th>Tal-Qual (mL)</th><th>Concentração Sal (mL)</th></tr>
    </table>
    <pre id="pac_resultado"></pre>
  `;
}

function calcularPAC() {
  let conc = parseFloat(document.getElementById("pac_conc").value);
  let dens = parseFloat(document.getElementById("pac_dens").value);
  let dil = parseFloat(document.getElementById("pac_dil").value);
  let volSol = parseFloat(document.getElementById("pac_vol").value);
  let volJarro = parseFloat(document.getElementById("pac_jarro").value);

  // ================================
  // DILUIÇÃO TAL-QUAL
  // ================================
  let massa_produto = dil * 10;
  let volume_talqual_ml = massa_produto / dens;
  let conc_talqual_gl = (conc * volume_talqual_ml) / volSol;
  let conc_talqual_mgl = conc_talqual_gl * 1000;

  // ================================
  // CONCENTRAÇÃO DE SAL
  // ================================
  let conc_desejada_gl = dil * 10;
  let volume_sal_ml = (conc_desejada_gl * volSol) / conc;
  let conc_sal_mgl = conc_desejada_gl * 1000;

  // ================================
  // TABELAS
  // ================================
  let tabela = document.getElementById("pac_tabela");
  tabela.innerHTML = "<tr><th>Dosagem (mg/L)</th><th>Tal-Qual (mL)</th><th>Concentração Sal (mL)</th></tr>";

  let tabela_talqual = [];
  let tabela_sal = [];

  for (let dosagem = 20; dosagem <= 120; dosagem += 10) {
    let ml_talqual = (dosagem * volJarro * 1000) / conc_talqual_mgl;
    let ml_sal = (dosagem * volJarro * 1000) / conc_sal_mgl;

    tabela_talqual.push({ dosagem, ml: ml_talqual.toFixed(2) });
    tabela_sal.push({ dosagem, ml: ml_sal.toFixed(2) });

    tabela.innerHTML += `<tr>
      <td>${dosagem}</td>
      <td>${ml_talqual.toFixed(2)}</td>
      <td>${ml_sal.toFixed(2)}</td>
    </tr>`;
  }

  // Resultado final
  let resultado = {
    talqual: {
      volume_produto_ml: volume_talqual_ml.toFixed(2),
      concentracao_mgl: conc_talqual_mgl.toFixed(0)
    },
    sal: {
      volume_produto_ml: volume_sal_ml.toFixed(2),
      concentracao_mgl: conc_sal_mgl.toFixed(0)
    },
    tabela_talqual,
    tabela_sal
  };

  document.getElementById("pac_resultado").innerText = JSON.stringify(resultado, null, 2);
}
