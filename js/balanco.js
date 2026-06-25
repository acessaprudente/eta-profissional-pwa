// js/balanco.js
// Balanço de Massa - implementação fiel ao cálculo Python (vazão m³/h * concentração mg/L -> carga mg/h)
// Expondo explicitamente a função como global para evitar problemas de escopo em GitHub Pages.

(function () {
  // Função principal exposta globalmente
  window.balancoView = function balancoView() {
    // tenta carregar parâmetros salvos (se storage.js existir)
    let saved = null;
    try { saved = (typeof carregarParametros === 'function') ? carregarParametros('balanco') : JSON.parse(localStorage.getItem('eta_balanco')); } catch (e) { saved = null; }

    const qVal = saved?.vazao_m3h ?? 100;
    const cVal = saved?.concentracao_mgL ?? 50;

    return `
      <h2>⚖️ Balanço de Massa</h2>

      <section class="inputs">
        <label><b>Vazão (m³/h)</b></label>
        <input id="bal_q" value="${qVal}" type="number" step="any" min="0">
        <label><b>Concentração (mg/L)</b></label>
        <input id="bal_c" value="${cVal}" type="number" step="any" min="0">
        <div style="margin-top:8px">
          <button onclick="calcularBalanco()">Calcular</button>
          <button onclick="salvarBalanco()">Salvar parâmetros</button>
        </div>
      </section>

      <section class="results">
        <div id="bal_resumo"></div>
        <h4>Tabela de fluxos</h4>
        <table id="bal_tabela" border="1"><tr><th>Parâmetro</th><th>Valor</th></tr></table>

        <button onclick="mostrarJSON('bal_resultado')">Verificar dados técnicos</button>
        <pre id="bal_resultado" style="display:none"></pre>
      </section>
    `;
  };

  // Função de cálculo exposta globalmente
  window.calcularBalanco = function calcularBalanco() {
    const qEl = document.getElementById('bal_q');
    const cEl = document.getElementById('bal_c');
    if (!qEl || !cEl) {
      console.error('Elementos de entrada do balanço não encontrados.');
      return;
    }

    const q = parseFloat(qEl.value);
    const c = parseFloat(cEl.value);

    if (isNaN(q) || isNaN(c) || q < 0 || c < 0) {
      document.getElementById('bal_resumo').innerHTML = '<p style="color:red"><b>Erro:</b> insira valores válidos (>= 0).</p>';
      return;
    }

    // Cálculo fiel ao Python:
    // vazão (m³/h) -> L/h = q * 1000
    // carga (mg/h) = L/h * mg/L = q * 1000 * c
    const vazao_L_h = q * 1000;
    const carga_mg_h = vazao_L_h * c;
    const carga_g_h = carga_mg_h / 1000;
    const carga_kg_h = carga_g_h / 1000;

    const resultado = {
      vazao_m3h: q,
      vazao_L_h: Number(vazao_L_h.toFixed(3)),
      concentracao_mgL: c,
      carga_mg_h: Number(carga_mg_h.toFixed(3)),
      carga_g_h: Number(carga_g_h.toFixed(6)),
      carga_kg_h: Number(carga_kg_h.toFixed(9)),
      timestamp: new Date().toISOString()
    };

    // Exibição amigável
    document.getElementById('bal_resumo').innerHTML = `
      <p><b>Vazão:</b> ${resultado.vazao_m3h} m³/h (${resultado.vazao_L_h} L/h)</p>
      <p><b>Concentração:</b> ${resultado.concentracao_mgL} mg/L</p>
      <p><b>Carga:</b> ${resultado.carga_mg_h} mg/h (${resultado.carga_g_h} g/h)</p>
    `;

    const tabela = document.getElementById('bal_tabela');
    tabela.innerHTML = `
      <tr><th>Parâmetro</th><th>Valor</th></tr>
      <tr><td>Vazão (m³/h)</td><td>${resultado.vazao_m3h}</td></tr>
      <tr><td>Vazão (L/h)</td><td>${resultado.vazao_L_h}</td></tr>
      <tr><td>Concentração (mg/L)</td><td>${resultado.concentracao_mgL}</td></tr>
      <tr><td>Carga (mg/h)</td><td>${resultado.carga_mg_h}</td></tr>
      <tr><td>Carga (g/h)</td><td>${resultado.carga_g_h}</td></tr>
      <tr><td>Carga (kg/h)</td><td>${resultado.carga_kg_h}</td></tr>
    `;

    const pre = document.getElementById('bal_resultado');
    if (pre) pre.innerText = JSON.stringify(resultado, null, 2);

    return resultado;
  };

  // Função para salvar parâmetros (usa storage.js se disponível)
  window.salvarBalanco = function salvarBalanco() {
    const q = parseFloat(document.getElementById('bal_q').value) || 0;
    const c = parseFloat(document.getElementById('bal_c').value) || 0;
    const obj = { vazao_m3h: q, concentracao_mgL: c, saved_at: new Date().toISOString() };
    try {
      if (typeof salvarParametros === 'function') {
        salvarParametros('balanco', obj);
      } else {
        localStorage.setItem('eta_balanco', JSON.stringify(obj));
      }
      alert('Parâmetros salvos localmente.');
    } catch (e) {
      alert('Não foi possível salvar: ' + e.message);
    }
  };
})();
