// engine/balanco.js

import { salvarParametros, carregarParametros } from '../js/storage.js';

export function balancoView() {
  const saved = carregarParametros('balanco') || {};

  return `
        <h2>⚖️ Balanço de Massa — Mistura 3 Pontos</h2>

        <section class="inputs">

            <label>Vazão Q1 (m³/h)</label>
            <input id="bal_q1" value="${saved.Q1 ?? ''}" type="number">

            ...

            <button id="btnCalcularBalanco">
                📊 Calcular
            </button>

            <button id="btnSalvarBalanco">
                💾 Salvar
            </button>

        </section>

        <section class="results">

            <div id="bal_resumo"></div>

            <table id="bal_tabela"></table>

            <pre id="bal_resultado"
                 style="display:none"></pre>

        </section>
    `;
}

export function inicializarBALANCO() {
  document
    .getElementById('btnCalcularBalanco')
    .addEventListener('click', calcularBalanco);

  document
    .getElementById('btnSalvarBalanco')
    .addEventListener('click', salvarBalanco);
}
