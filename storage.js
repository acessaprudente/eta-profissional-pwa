function salvarParametros(modulo, obj) { localStorage.setItem('eta_' + modulo, JSON.stringify(obj)); }
function carregarParametros(modulo) { const raw = localStorage.getItem('eta_' + modulo); return raw ? JSON.parse(raw) : null; }
