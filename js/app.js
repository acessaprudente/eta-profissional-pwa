/*
==========================================================
ETA PROFESSIONAL PWA
Arquivo: js/app.js
Controlador Principal
Versão: Beta 1.0
==========================================================
*/

import {
  exportarPDF,
  exportarExcel,
  exportarJSON,
  limparHistorico,
} from '../export/export.js';

import { quantidadeRegistros, ultimoRegistro } from './storage.js';

const conteudo = document.getElementById('conteudo');

// =========================================
// RENDERIZA O CONTEÚDO
// =========================================
function render(html) {
  conteudo.innerHTML = html;
}

// =========================================
// CARREGAMENTO DOS MÓDULOS
// =========================================
async function abrirModulo(modulo) {
  try {
    switch (modulo) {
      case 'pac': {
        const m = await import('../engine/pac.js');
        render(m.pacView());
        if (m.inicializarPAC) m.inicializarPAC();
        break;
      }

      case 'cal': {
        const m = await import('../engine/cal.js');
        render(m.calView());
        if (m.inicializarCAL) m.inicializarCAL();
        break;
      }

      case 'polimero': {
        const m = await import('../engine/polimero.js');
        render(m.polimeroView());
        if (m.inicializarPOLIMERO) m.inicializarPOLIMERO();
        break;
      }

      case 'balanco': {
        const m = await import('../engine/balanco.js');
        render(m.balancoView());
        if (m.inicializarBALANCO) m.inicializarBALANCO();
        break;
      }

      case 'jar': {
        const m = await import('../engine/jar.js');
        render(m.jarView());
        if (m.inicializarJAR) m.inicializarJAR();
        break;
      }

      case 'sedimentacao': {
        const m = await import('../engine/sedimentacao.js');
        render(m.sedimentacaoView());
        if (m.inicializarSEDIMENTACAO) m.inicializarSEDIMENTACAO();
        break;
      }

      default:
        render(`
          <div class="modulo">
            <h2>Módulo não encontrado</h2>
          </div>
        `);
    }
  } catch (erro) {
    console.error(erro);
    render(`
      <div class="modulo">
        <h2>Erro</h2>
        <p>${erro.message}</p>
      </div>
    `);
  }
}

// =========================================
// DASHBOARD INICIAL
// =========================================
function dashboard() {
  render(`
    <div class="dashboard">
      <h2>ETA Professional</h2>
      <div class="cards">
        <div class="card" data-modulo="pac">🧪 PAC Férrico</div>
        <div class="card" data-modulo="cal">🧂 Cal Hidratada</div>
        <div class="card" data-modulo="polimero">🧬 Polímero</div>
        <div class="card" data-modulo="balanco">⚖ Balanço de Massa</div>
        <div class="card" data-modulo="jar">🧫 Jar Test</div>
        <div class="card" data-modulo="sedimentacao">💧 Sedimentação</div>
      </div>
    </div>
  `);

  //--------------------------------------------------
  // Atualiza informações do Dashboard
  //--------------------------------------------------
  function atualizarDashboard() {
    const total = quantidadeRegistros();
    const ultimo = ultimoRegistro();

    console.log('Registros:', total);

    if (ultimo) {
      console.log('Último módulo:', ultimo.modulo);
    }
  }

  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      abrirModulo(card.dataset.modulo);
    });
  });
}

// =========================================
// MENU SUPERIOR
// =========================================
function configurarMenu() {
  document.querySelectorAll('[data-modulo]').forEach((botao) => {
    botao.addEventListener('click', () => {
      abrirModulo(botao.dataset.modulo);
    });
  });
}

// =========================================
// SERVICE WORKER
// =========================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../service-worker.js').then(() => {
      console.log('Service Worker ativo');
    });
  });
}

// =========================================
// INICIALIZAÇÃO
// =========================================
window.addEventListener('DOMContentLoaded', () => {
  configurarMenu();
  dashboard();
});
