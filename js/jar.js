function jarView() {
  return `
    <h2>🧫 Jar Test</h2>
    <nav class="jar-nav">
      <button onclick="abrir('pac')">PAC</button>
      <button onclick="abrir('cal')">Cal</button>
      <button onclick="abrir('polimero')">Polímero</button>
      <button onclick="comparativo()">Comparativo</button>
    </nav>
    <div id="jar_conteudo"></div>`;
}
function comparativo() {
  const pacText = document.getElementById('pac_resultado')?.innerText || null;
  const calText = document.getElementById('cal_resultado')?.innerText || null;
  const polText = document.getElementById('pol_resultado')?.innerText || null;
  const pacObj = pacText ? JSON.parse(pacText) : null;
  const calObj = calText ? JSON.parse(calText) : null;
  const polObj = polText ? JSON.parse(polText) : null;
  const html = `
    <h3>📊 Comparativo de Produtos</h3>
    <table border="1">
      <tr><th>Produto</th><th>Dosagem</th><th>Impacto no pH</th></tr>
      <tr><td>PAC</td><td>${pacObj?.talqual?.volume_produto_ml || '-'} </td><td>${pacObj ? 'Leve redução' : '-'}</td></tr>
      <tr><td>Cal (Ca(OH)₂)</td><td>${calObj?.dosagem_mgL || '-'} </td><td>${calObj?.delta_ph ? 'Elevação de ' + calObj.delta_ph + ' pH' : '-'}</td></tr>
      <tr><td>Polímero</td><td>${polObj?.volume || '-'} </td><td>${polObj ? 'Neutro' : '-'}</td></tr>
    </table>
    <button onclick="mostrarJSON('comparativo_json')">Verificar dados técnicos</button>
    <pre id="comparativo_json" style="display:none">${JSON.stringify({ pac: pacObj, cal: calObj, pol: polObj }, null, 2)}</pre>`;
  document.getElementById('jar_conteudo').innerHTML = html;
}
