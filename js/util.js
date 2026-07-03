/*
==========================================================
ETA PROFESSIONAL PWA
Módulo: Utilitários Globais
Versão: Alpha 0.1
==========================================================
*/


// =========================================
// FORMATAR NÚMEROS
// =========================================

export function formatarNumero(valor, casas = 2) {

    if (isNaN(valor)) return 0;

    return Number(valor).toFixed(casas);
}


// =========================================
// VALIDAR INPUT NUMÉRICO
// =========================================

export function validarNumero(valor, padrao = 0) {

    const num = Number(valor);

    return isNaN(num) ? padrao : num;
}


// =========================================
// CRIAR ELEMENTO HTML
// =========================================

export function criarElemento(tag, classe = "", html = "") {

    const el = document.createElement(tag);

    if (classe) el.className = classe;

    if (html) el.innerHTML = html;

    return el;
}


// =========================================
// LIMPAR CONTEÚDO DA TELA
// =========================================

export function limparConteudo(id) {

    const el = document.getElementById(id);

    if (el) el.innerHTML = "";
}


// =========================================
// ALERTA PADRÃO DO SISTEMA
// =========================================

export function alerta(msg) {

    alert("ETA Professional: " + msg);
}


// =========================================
// GERAR ID SIMPLES
// =========================================

export function gerarId() {

    return Date.now().toString(36) +
           Math.random().toString(36).substr(2);
}


// =========================================
// CLAMP (LIMITAR VALORES)
// =========================================

export function clamp(valor, min, max) {

    return Math.min(Math.max(valor, min), max);
}


// =========================================
// SOMAR ARRAY
// =========================================

export function somarArray(arr) {

    return arr.reduce((acc, val) => acc + val, 0);
}
