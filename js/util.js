// util.js - funções utilitárias
function mostrarJSON(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
}
function abrirView(html) {
  const container = document.getElementById('conteudo') || document.body;
  container.innerHTML = html;
}
function fmt(n, decimals = 2) { return (typeof n === 'number') ? n.toFixed(decimals) : n; }
