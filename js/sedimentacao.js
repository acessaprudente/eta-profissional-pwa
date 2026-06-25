function sedimentacaoView() {
  return `
    <h2>💧 Sedimentação e TDH</h2>
    <label>Largura (m)</label>
    <input id="sed_largura" value="5">
    <label>Comprimento (m)</label>
    <input id="sed_comprimento" value="20">
    <label>Profundidade (m)</label>
    <input id="sed_profundidade" value="3">
    <label>Nº Decantadores</label>
    <input id="sed_n" value="2">
    <label>Q ETA (m³/h)</label>
    <input id="sed_qeta" value="500">
    <button onclick="calcularSedimentacao()">Calcular</button>
    <table id="sed_tabela" border="1">
      <tr><th>Parâmetro</th><th>Valor</th></tr>
    </table>
    <pre id="sed_resultado"></pre>
  `;
}

function calcularSedimentacao() {
  let largura = parseFloat(document.getElementById("sed_largura").value);
  let comprimento = parseFloat(document.getElementById("sed_comprimento").value);
  let profundidade = parseFloat(document.getElementById("sed_profundidade").value);
  let n = parseInt(document.getElementById("sed_n").value);
  let qeta = parseFloat(document.getElementById("sed_qeta").value);

  // ================================
  // Funções fiéis ao Python
  // ================================
  function calcular_taxa_sed(largura_m, comprimento_m, n_dec, qeta_m3_h) {
    let area = largura_m * comprimento_m * n_dec;
    let qdia = qeta_m3_h * 24;
    let taxa = qdia / area;
    return { area_m2: area.toFixed(2), taxa_m3_m2_dia: taxa.toFixed(2) };
  }

  function calcular_tdh(largura_m, comprimento_m, profundidade_m, n_dec, qeta_m3_h) {
    let volume = largura_m * comprimento_m * profundidade_m * n_dec;
    let tdh = volume / qeta_m3_h;
    return { volume_m3: volume.toFixed(2), tdh_h: tdh.toFixed(2) };
  }

  function calcular_vel_tempo_dec(profundidade_m, tdh_h) {
    let altura_cm = profundidade_m * 100;
    let tempo_min = tdh_h * 60;
    let vel = altura_cm / tempo_min;
    return { vel_cm_min: vel.toFixed(3), tempo_min: tempo_min.toFixed(2) };
  }

  // ================================
  // Cálculos
  // ================================
  let taxa = calcular_taxa_sed(largura, comprimento, n, qeta);
  let tdh = calcular_tdh(largura, comprimento, profundidade, n, qeta);
  let vel_tempo = calcular_vel_tempo_dec(profundidade, parseFloat(tdh.tdh_h));

  let resultados = [
    ["Área (m²)", taxa.area_m2],
    ["Taxa Sed (m³/m².dia)", taxa.taxa_m3_m2_dia],
    ["Volume útil (m³)", tdh.volume_m3],
    ["Tempo Detenção Hidráulica (h)", tdh.tdh_h],
    ["Velocidade Sed (cm/min)", vel_tempo.vel_cm_min],
    ["Tempo Decantação (min)", vel_tempo.tempo_min]
  ];

  // Exibir tabela
  let tabela = document.getElementById("sed_tabela");
  tabela.innerHTML = "<tr><th>Parâmetro</th><th>Valor</th></tr>";
  resultados.forEach(([param, valor]) => {
    tabela.innerHTML += `<tr><td>${param}</td><td>${valor}</td></tr>`;
  });

  // Resultado JSON
  let resultado = { taxa, tdh, vel_tempo };
  document.getElementById("sed_resultado").innerText = JSON.stringify(resultado, null, 2);
}
