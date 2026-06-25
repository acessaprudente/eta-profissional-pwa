function pacView() {
  let html = `
    <h2>🧪 Cálculo de PAC</h2>
    <input id="pac_conc" placeholder="Concentração (g/L)">
    <input id="pac_dens" placeholder="Densidade (g/mL)">
    <input id="pac_dil" placeholder="Diluição (%)" value="2">
    <input id="pac_vol" placeholder="Volume solução (mL)" value="1000">
    <input id="pac_jarro" placeholder="Volume jarro (L)" value="2">
    <button onclick="calcularPAC()">📊 Calcular</button>
    <pre id="pac_resultado"></pre>
  `;
  return html;
}

function calcularPAC() {
  let conc = parseFloat(document.getElementById("pac_conc").value) || 0;
  let dens = parseFloat(document.getElementById("pac_dens").value) || 0;
  let dil = parseFloat(document.getElementById("pac_dil").value) || 2;
  let volSol = parseFloat(document.getElementById("pac_vol").value) || 1000;
  let volJarro = parseFloat(document.getElementById("pac_jarro").value) || 2;

  let massa = dil * 10;
  let volTalqual = massa / dens;
  let concTalqualGL = (conc * volTalqual) / volSol;
  let concTalqualMGL = concTalqualGL * 1000;

  let concDesejadaGL = dil * 10;
  let volSal = (concDesejadaGL * volSol) / conc;
  let concSalMGL = concDesejadaGL * 1000;

  let tabelaTalqual = [];
  let tabelaSal = [];
  for (let dosagem = 20; dosagem <= 120; dosagem += 10) {
    let mlTalqual = (dosagem * volJarro * 1000) / concTalqualMGL;
    let mlSal = (dosagem * volJarro * 1000) / concSalMGL;
    tabelaTalqual.push({ dosagem, ml: mlTalqual.toFixed(2) });
    tabelaSal.push({ dosagem, ml: mlSal.toFixed(2) });
  }

  let resultado = {
    talqual: { volume_produto_ml: volTalqual.toFixed(2), concentracao_mgl: concTalqualMGL.toFixed(0) },
    sal: { volume_produto_ml: volSal.toFixed(2), concentracao_mgl: concSalMGL.toFixed(0) },
    tabela_talqual: tabelaTalqual,
    tabela_sal: tabelaSal
  };

  document.getElementById("pac_resultado").innerText = JSON.stringify(resultado, null, 2);
}
