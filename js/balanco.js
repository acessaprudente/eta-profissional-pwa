// js/balanco.js
// Implementação fiel ao Python (mistura 3 pontos - turbidez)
// Expondo funções globalmente para compatibilidade com GitHub Pages

(function () {
  // view principal (exposta globalmente)
  window.balancoView = function balancoView() {
    // tenta carregar parâmetros salvos
    let saved = null;
    try {
      saved = (typeof carregarParametros === 'function') ? carregarParametros('balanco') : JSON.parse(localStorage.getItem('eta_balanco'));
    } catch (e) { saved = null; }

    const Q1 = saved?.Q1 ?? '';
    const Q2 = saved?.Q2 ?? '';
    const Q3 = saved?.Q3 ?? '';
    const T1 = saved?.T1 ?? '';
    const T2 = saved?.T2 ?? '';
    const T3 = saved?.T3 ?? '';
    const T4 = saved?.T4 ?? '';

    return `
      <h2>⚖️ Balanço de Massa — Mistura 3 Pontos (Turbidez)</h2>

      <section class="inputs">
        <label>Vazão Q1 (m³/h)</label><input id="bal_q1" value="${Q1}" type="number" step="any" min="0">
        <label>Vazão Q2 (m³/h)</label><input id="bal_q2" value="${Q2}" type="number" step="any" min="0">
        <label>Vazão Q3 (m³/h)</label><input id="bal_q3" value="${Q3}" type="number" step="any" min="0">

        <label>Turbidez T1 (NTU)</label><input id="bal_t1" value="${T1}" type="number" step="any" min="0">
        <label>Turbidez T2 (NTU)</label><input id="bal_t2" value="${T2}" type="number" step="any" min="0">
        <label>Turbidez T3 (NTU)</label><input id="bal_t3" value="${T3}" type="number" step="any" min="0">
        <label>Turbidez T4 (NTU) — deixe 0 para calcular</label><input id="bal_t4" value="${T4}" type="number" step="any" min="0">

        <div style="margin-top:8px">
          <button onclick="calcularBalanco()">📊 Calcular</button>
          <button onclick="salvarBalanco()">💾 Salvar parâmetros</button>
        </div>
      </section>

      <section class="results">
        <div id="bal_resumo"></div>
        <h4>Resultados</h4>
        <table id="bal_tabela" border="1"><tr><th>Parâmetro</th><th>Valor</th></tr></table>

        <button onclick="mostrarJSON('bal_resultado')">Verificar dados técnicos</button>
        <pre id="bal_resultado" style="display:none"></pre>
      </section>
    `;
  };

  // função de cálculo (exposta globalmente)
  window.calcularBalanco = function calcularBalanco() {
    const q1 = parseFloat(document.getElementById('bal_q1').value || 0);
    const q2 = parseFloat(document.getElementById('bal_q2').value || 0);
    const q3 = parseFloat(document.getElementById('bal_q3').value || 0);
    let t1 = parseFloat(document.getElementById('bal_t1').value || 0);
    let t2 = parseFloat(document.getElementById('bal_t2').value || 0);
    let t3 = parseFloat(document.getElementById('bal_t3').value || 0);
    let t4 = parseFloat(document.getElementById('bal_t4').value || 0);

    const vazao_total = q1 + q2 + q3;

    let msg = '';
    try {
      // Lógica fiel ao Python (ordem de verificação igual ao seu código)
      if (t4 === 0 && vazao_total > 0) {
        // Se T4 == 0 e vazao_total > 0: T4 = (Q1*T1 + Q2*T2 + Q3*T3) / vazao_total
        t4 = (q1 * t1 + q2 * t2 + q3 * t3) / vazao_total;
        msg = `Turbidez Final (T4) = ${t4.toFixed(2)} NTU\nVazão Total = ${vazao_total.toFixed(2)} m³/h`;
      } else if (t1 === 0 && q1 > 0) {
        // Se T1 == 0 e Q1 > 0: T1 = (T4*vazao_total - Q2*T2 - Q3*T3) / Q1
        t1 = (t4 * vazao_total - q2 * t2 - q3 * t3) / q1;
        msg = `Turbidez Rio do Peixe (T1) = ${t1.toFixed(2)} NTU\nVazão Total = ${vazao_total.toFixed(2)} m³/h`;
      } else if (t2 === 0 && q2 > 0) {
        t2 = (t4 * vazao_total - q1 * t1 - q3 * t3) / q2;
        msg = `Turbidez Santo Anastácio (T2) = ${t2.toFixed(2)} NTU\nVazão Total = ${vazao_total.toFixed(2)} m³/h`;
      } else if (t3 === 0 && q3 > 0) {
        t3 = (t4 * vazao_total - q1 * t1 - q2 * t2) / q3;
        msg = `Turbidez Balneário (T3) = ${t3.toFixed(2)} NTU\nVazão Total = ${vazao_total.toFixed(2)} m³/h`;
      } else {
        msg = 'Insira 0 no campo que deseja calcular.';
      }

      // guarda resultados para exportação/JSON
      const resultados = {
        Q1: q1, Q2: q2, Q3: q3,
        T1: Number(t1.toFixed(6)), T2: Number(t2.toFixed(6)), T3: Number(t3.toFixed(6)), T4: Number(t4.toFixed(6)),
        Qtotal: Number(vazao_total.toFixed(6)),
        timestamp: new Date().toISOString()
      };

      // exibição amigável
      document.getElementById('bal_resumo').innerHTML = `<pre style="white-space:pre-wrap">${msg}</pre>`;

      const tabela = document.getElementById('bal_tabela');
      tabela.innerHTML = `
        <tr><th>Parâmetro</th><th>Valor</th></tr>
        <tr><td>Q1 (m³/h)</td><td>${resultados.Q1}</td></tr>
        <tr><td>Q2 (m³/h)</td><td>${resultados.Q2}</td></tr>
        <tr><td>Q3 (m³/h)</td><td>${resultados.Q3}</td></tr>
        <tr><td>T1 (NTU)</td><td>${resultados.T1}</td></tr>
        <tr><td>T2 (NTU)</td><td>${resultados.T2}</td></tr>
        <tr><td>T3 (NTU)</td><td>${resultados.T3}</td></tr>
        <tr><td>T4 (NTU)</td><td>${resultados.T4}</td></tr>
        <tr><td>Vazão Total (m³/h)</td><td>${resultados.Qtotal}</td></tr>
      `;

      // JSON técnico escondido
      const pre = document.getElementById('bal_resultado');
      if (pre) pre.innerText = JSON.stringify(resultados, null, 2);

      // salva temporariamente no localStorage (compatível com storage.js)
      try {
        if (typeof salvarParametros === 'function') {
          salvarParametros('balanco', resultados);
        } else {
          localStorage.setItem('eta_balanco', JSON.stringify(resultados));
        }
      } catch (e) { /* não crítico */ }

      // opcional: retorna objeto para testes automatizados
      return resultados;

    } catch (erro) {
      document.getElementById('bal_resumo').innerHTML = `<p style="color:red"><b>Erro no cálculo:</b> ${erro}</p>`;
      console.error('Erro calcularBalanco:', erro);
    }
  };

  // função para salvar parâmetros (exposta globalmente)
  window.salvarBalanco = function salvarBalanco() {
    try {
      const q1 = parseFloat(document.getElementById('bal_q1').value || 0);
      const q2 = parseFloat(document.getElementById('bal_q2').value || 0);
      const q3 = parseFloat(document.getElementById('bal_q3').value || 0);
      const t1 = parseFloat(document.getElementById('bal_t1').value || 0);
      const t2 = parseFloat(document.getElementById('bal_t2').value || 0);
      const t3 = parseFloat(document.getElementById('bal_t3').value || 0);
      const t4 = parseFloat(document.getElementById('bal_t4').value || 0);
      const obj = { Q1: q1, Q2: q2, Q3: q3, T1: t1, T2: t2, T3: t3, T4: t4, saved_at: new Date().toISOString() };
      if (typeof salvarParametros === 'function') {
        salvarParametros('balanco', obj);
      } else {
        localStorage.setItem('eta_balanco', JSON.stringify(obj));
      }
      alert('Parâmetros salvos localmente.');
    } catch (e) {
      alert('Falha ao salvar parâmetros: ' + e.message);
    }
  };
})();
