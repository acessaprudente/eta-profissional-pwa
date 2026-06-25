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
  document.getElementById("jar_conteudo").innerHTML = `
    <h3>📊 Comparativo</h3>
    <p>Resultados consolidados dos módulos PAC, Cal e Polímero.</p>
    <pre>${comparativoView()}</pre>
  `;
}
