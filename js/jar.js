function jarView() {
  return `
    <h2>🧫 Jar Test</h2>
    <nav>
      <button onclick="abrir('pac')">PAC</button>
      <button onclick="abrir('cal')">Cal</button>
      <button onclick="abrir('polimero')">Polímero</button>
      <button onclick="comparativo()">Comparativo</button>
    </nav>
    <div id="jar_conteudo"></div>
  `;
}

function comparativo() {
  // Recupera resultados dos módulos
  let pac = document.getElementById("pac_resultado")?.innerText;
  let cal = document.getElementById("cal_resultado")?.innerText;
  let pol = document.getElementById("pol_resultado")?.innerText;

  // Converte JSON escondido em objetos
  let pacObj = pac ? JSON.parse(pac) : {};
  let calObj = cal ? JSON.parse(cal) : {};
  let polObj = pol ? JSON.parse(pol) : {};

  // Monta comparativo amigável
  let html = `
    <h3>📊 Comparativo de Produtos</h3>
    <table border="1">
      <tr><th>Produto</th><th>Dosagem</th><th>Impacto no pH</th></tr>
      <tr><td>PAC</td><td>${pacObj?.talqual?.volume_produto_ml || "-"} mL</td><td>Leve redução</td></tr>
      <tr><td>Cal</td><td>${calObj?.dosagem_mgL || "-"} mg/L</td><td>Elevação de ${calObj?.delta_ph || "-"} unidades</td></tr>
      <tr><td>Polímero</td><td>${polObj?.volume || "-"} mL</td><td>Neutro (não altera pH)</td></tr>
    </table>
    <button onclick="mostrarJSON('comparativo_json')">Verificar dados técnicos</button>
    <pre id="comparativo_json" style="display:none">${comparativoView()}</pre>
  `;

  document.getElementById("jar_conteudo").innerHTML = html;
}
