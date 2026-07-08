/*
=========================================================
 ETA PROFESSIONAL PWA
 Arquivo principal
=========================================================
*/

import { pacView, inicializarPAC } from '../engine/pac.js';
import { calView, inicializarCAL } from '../engine/cal.js';
import { polimeroView, inicializarPOLIMERO } from '../engine/polimero.js';
import { balancoView, inicializarBalanco } from '../engine/balanco.js'; // ← CORRIGIDO
import { jarView, inicializarJAR } from '../engine/jar.js';
import {
  sedimentacaoView,
  inicializarSEDIMENTACAO,
} from '../engine/sedimentacao.js';

import { exportarPDF, exportarExcel } from '../export/export.js';

import { quantidadeRegistros, ultimoRegistro } from './storage.js';

const conteudo = document.getElementById('conteudo');

const MODULOS = {
  dashboard: {
    view: dashboard,
  },

  pac: {
    view: pacView,
    init: inicializarPAC,
  },

  cal: {
    view: calView,
    init: inicializarCAL,
  },

  polimero: {
    view: polimeroView,
    init: inicializarPOLIMERO,
  },

  balanco: {
    view: balancoView,
    init: inicializarBalanco, // ← CORRIGIDO (sem maiúsculas extras)
  },

  jar: {
    view: jarView,
    init: inicializarJAR,
  },

  sedimentacao: {
    view: sedimentacaoView,
    init: inicializarSEDIMENTACAO,
  },
};

document.addEventListener('DOMContentLoaded', iniciarSistema);

function iniciarSistema() {
  configurarMenu();

  configurarExportacao();

  registrarServiceWorker();

  abrirModulo('dashboard');
}

function configurarMenu() {
  document

    .querySelectorAll('[data-modulo]')

    .forEach((botao) => {
      botao.addEventListener('click', () => {
        abrirModulo(botao.dataset.modulo);
      });
    });
}

function configurarExportacao() {
  const pdf = document.getElementById('btnPDF');

  if (pdf) {
    pdf.onclick = exportarPDF;
  }

  const excel = document.getElementById('btnExcel');

  if (excel) {
    excel.onclick = exportarExcel;
  }
}

function abrirModulo(nome) {
  const modulo = MODULOS[nome];

  if (!modulo) {
    conteudo.innerHTML = '<h2>Módulo não encontrado.</h2>';

    return;
  }

  conteudo.innerHTML = modulo.view();

  if (modulo.init) {
    modulo.init();
  }
}

function dashboard() {
  const total = quantidadeRegistros();

  const ultimo = ultimoRegistro();

  return `

<div class="dashboard">

<h2>Dashboard</h2>

<div class="card">

<h3>Total de registros</h3>

<p>${total}</p>

</div>

<div class="card">

<h3>Último registro</h3>

<p>

${ultimo ? ultimo.modulo : 'Nenhum'}

</p>

</div>

</div>

`;
}

function registrarServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('./service-worker.js');

      console.log('Service Worker registrado.');
    } catch (e) {
      console.error(e);
    }
  });
}
