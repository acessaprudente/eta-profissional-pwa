function jarView() {
  let html = `
    <h2>🧫 Jar Test</h2>
    <div class="tabs">
      <button onclick="abrirAba('pac')">PAC Férrico</button>
      <button onclick="abrirAba('cal')">Cal Hidratada</button>
      <button onclick="abrirAba('polimero')">Polímero</button>
      <button onclick="abrirAba('comparativo')">Comparativo</button>
    </div>
    <div id="aba_conteudo"></div>
  `;
  return html;
}

function abrirAba(aba) {
  if (aba === "pac") {
    document.getElementById("aba_conteudo").innerHTML = pacView();
  } else if (aba === "cal") {
    document.getElementById("aba_conteudo").innerHTML = calView();
  } else if (aba === "polimero") {
    document.getElementById("aba_conteudo").innerHTML = polimeroView();
  } else if (aba === "comparativo") {
    document.getElementById("aba_conteudo").innerHTML = comparativoView();
  }
}

function comparativoView() {
  // Recupera resultados já calculados (se existirem)
  let pac = document.getElementById("pac_resultado")?.innerText || "";
  let cal = document.getElementById("cal_resultado")?.innerText || "";
  let pol = document.getElementById("pol_resultado")?.innerText || "";

  let html = `
    <h3>📊 Comparativo de Dosagens</h3>
    <p>Resultados atuais dos módulos:</p>
    <table border="1" style="border-collapse:collapse; width:100%">
      <tr>
        <th>Produto</th>
        <th>Resultado</th>
      </tr>
      <tr>
        <td>PAC Férrico</td>
        <td><pre>${pac}</pre></td>
      </tr>
      <tr>
        <td>Cal Hidratada</td>
        <td><pre>${cal}</pre></td>
      </tr>
      <tr>
        <td>Polímero</td>
        <td><pre>${pol}</pre></td>
      </tr>
    </table>
    <p>⚠️ Dica: calcule cada módulo antes de abrir o comparativo para ver os valores preenchidos.</p>
  `;
  return html;
}
