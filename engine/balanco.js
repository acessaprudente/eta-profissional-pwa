//==============================================================
// ETA PROFESSIONAL PWA
// engine/balanco.js
// Balanço de Massa - Mistura de Turbidez
// Versão baseada 100% no algoritmo Python
//==============================================================

// Verifica se estamos em ambiente de produção no GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');

// Importação dinâmica para evitar problemas de caminho
let salvarParametros, carregarParametros;

// Carrega os módulos de forma segura
async function carregarModulos() {
  try {
    const storage = await import('../js/storage.js');
    salvarParametros = storage.salvarParametros;
    carregarParametros = storage.carregarParametros;
  } catch (error) {
    console.warn('Módulo storage não encontrado, usando fallback:', error);
    // Fallback para localStorage diretamente
    salvarParametros = (key, data) => {
      try {
        localStorage.setItem(`eta_${key}`, JSON.stringify(data));
      } catch (e) {
        console.error('Erro ao salvar:', e);
      }
    };
    carregarParametros = (key) => {
      try {
        const data = localStorage.getItem(`eta_${key}`);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        console.error('Erro ao carregar:', e);
        return null;
      }
    };
  }
}

// Chama a função para carregar módulos
carregarModulos();

let ultimoResultado = {};

//==============================================================
// VIEW
//==============================================================

export function balancoView() {
  // Verifica se os módulos já foram carregados
  if (!carregarParametros) {
    return `<div class="modulo"><h2>⚖️ Balanço de Massa - Mistura de Turbidez</h2><div class="card"><p>Carregando...</p></div></div>`;
  }

  const dados = carregarParametros('balanco') || {};

  return `

<div class="modulo">

<h2>⚖️ Balanço de Massa - Mistura de Turbidez</h2>

<div class="card">

<h3>Rio do Peixe</h3>

<label>Vazão (m³/h)</label>

<input
id="bal_q1"
type="number"
step="any"
value="${dados.Q1 ?? ''}">

<label>Turbidez (NTU)</label>

<input
id="bal_t1"
type="number"
step="any"
value="${dados.T1 ?? ''}">

</div>

<div class="card">

<h3>Santo Anastácio</h3>

<label>Vazão (m³/h)</label>

<input
id="bal_q2"
type="number"
step="any"
value="${dados.Q2 ?? ''}">

<label>Turbidez (NTU)</label>

<input
id="bal_t2"
type="number"
step="any"
value="${dados.T2 ?? ''}">

</div>

<div class="card">

<h3>Balneário</h3>

<label>Vazão (m³/h)</label>

<input
id="bal_q3"
type="number"
step="any"
value="${dados.Q3 ?? ''}">

<label>Turbidez (NTU)</label>

<input
id="bal_t3"
type="number"
step="any"
value="${dados.T3 ?? ''}">

</div>

<div class="card">

<h3>Mistura Final</h3>

<label>Turbidez Final (NTU)</label>

<input
id="bal_t4"
type="number"
step="any"
value="${dados.T4 ?? ''}">

<p>

Digite <b>0</b> no campo que deseja calcular.

</p>

</div>

<div class="card">

<button id="btnCalcularBalanco">

📊 Calcular

</button>

<button id="btnSalvarBalanco">

💾 Salvar

</button>

<button id="btnLimparBalanco">

🧹 Limpar

</button>

<button id="btnCopiarBalanco">

📋 Copiar Resultado

</button>

</div>

<div class="card">

<h3>Resultado</h3>

<div id="bal_resumo">

Aguardando cálculo...

</div>

</div>

<div class="card">

<h3>Dados Técnicos</h3>

<pre id="bal_json"></pre>

</div>

</div>

`;
}

//==============================================================
// INICIALIZAÇÃO
//==============================================================

export function inicializarBalanco() {
  // Aguarda o DOM estar completamente carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      configurarEventListeners();
    });
  } else {
    configurarEventListeners();
  }
}

function configurarEventListeners() {
  const btnCalc = document.getElementById('btnCalcularBalanco');
  const btnSalvar = document.getElementById('btnSalvarBalanco');
  const btnLimpar = document.getElementById('btnLimparBalanco');
  const btnCopiar = document.getElementById('btnCopiarBalanco');

  if (btnCalc) {
    btnCalc.addEventListener('click', calcularBalanco);
  }

  if (btnSalvar) {
    btnSalvar.addEventListener('click', salvarBalanco);
  }

  if (btnLimpar) {
    btnLimpar.addEventListener('click', limparBalanco);
  }

  if (btnCopiar) {
    btnCopiar.addEventListener('click', copiarResultado);
  }
}

//==============================================================
// LIMPAR
//==============================================================

function limparBalanco() {
  [
    'bal_q1',
    'bal_q2',
    'bal_q3',
    'bal_t1',
    'bal_t2',
    'bal_t3',
    'bal_t4',
  ].forEach((id) => {
    const campo = document.getElementById(id);
    if (campo) campo.value = '';
  });

  const resumo = document.getElementById('bal_resumo');
  if (resumo) resumo.innerHTML = 'Aguardando cálculo...';

  const json = document.getElementById('bal_json');
  if (json) json.textContent = '';

  ultimoResultado = {};
}

//==============================================================
// SALVAR
//==============================================================

function salvarBalanco() {
  if (!salvarParametros) {
    alert(
      'Módulo de salvamento não carregado. Usando localStorage diretamente.'
    );
    salvarParametros = (key, data) => {
      try {
        localStorage.setItem(`eta_${key}`, JSON.stringify(data));
      } catch (e) {
        console.error('Erro ao salvar:', e);
      }
    };
  }

  const dados = {
    Q1: Number(document.getElementById('bal_q1')?.value || 0),
    Q2: Number(document.getElementById('bal_q2')?.value || 0),
    Q3: Number(document.getElementById('bal_q3')?.value || 0),
    T1: Number(document.getElementById('bal_t1')?.value || 0),
    T2: Number(document.getElementById('bal_t2')?.value || 0),
    T3: Number(document.getElementById('bal_t3')?.value || 0),
    T4: Number(document.getElementById('bal_t4')?.value || 0),
  };

  salvarParametros('balanco', dados);
  alert('Parâmetros salvos.');
}

//==============================================================
// COPIAR RESULTADO
//==============================================================

async function copiarResultado() {
  if (!ultimoResultado.Qtotal) {
    alert('Nenhum cálculo realizado.');
    return;
  }

  const texto = JSON.stringify(ultimoResultado, null, 2);

  try {
    await navigator.clipboard.writeText(texto);
    alert('Resultado copiado.');
  } catch {
    // Fallback para navegadores mais antigos
    try {
      const textArea = document.createElement('textarea');
      textArea.value = texto;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Resultado copiado.');
    } catch (err) {
      alert('Não foi possível copiar.');
    }
  }
}

//==============================================================
// CÁLCULO
// 100% fiel ao algoritmo Python
//==============================================================

function calcularBalanco() {
  try {
    // Verifica se os elementos existem
    const getElementValue = (id) => {
      const element = document.getElementById(id);
      return element ? Number(element.value || 0) : 0;
    };

    const Q1 = getElementValue('bal_q1');
    const Q2 = getElementValue('bal_q2');
    const Q3 = getElementValue('bal_q3');

    let T1 = getElementValue('bal_t1');
    let T2 = getElementValue('bal_t2');
    let T3 = getElementValue('bal_t3');
    let T4 = getElementValue('bal_t4');

    const vazao_total = Q1 + Q2 + Q3;
    let mensagem = '';

    // Verifica se todos os campos são zero
    if (Q1 === 0 && Q2 === 0 && Q3 === 0) {
      mensagem = 'Por favor, insira pelo menos um valor de vazão.';
      ultimoResultado = { erro: mensagem };
      atualizarUI(mensagem);
      return;
    }

    //==================================================
    // ALGORITMO ORIGINAL PYTHON
    //==================================================

    if (T4 === 0 && vazao_total > 0) {
      T4 = (Q1 * T1 + Q2 * T2 + Q3 * T3) / vazao_total;
      mensagem =
        `Turbidez Final (T4) = ${T4.toFixed(2)} NTU<br>` +
        `Vazão Total = ${vazao_total.toFixed(2)} m³/h`;
    } else if (T1 === 0 && Q1 > 0) {
      T1 = (T4 * vazao_total - Q2 * T2 - Q3 * T3) / Q1;
      mensagem =
        `Turbidez Rio do Peixe (T1) = ${T1.toFixed(2)} NTU<br>` +
        `Vazão Total = ${vazao_total.toFixed(2)} m³/h`;
    } else if (T2 === 0 && Q2 > 0) {
      T2 = (T4 * vazao_total - Q1 * T1 - Q3 * T3) / Q2;
      mensagem =
        `Turbidez Santo Anastácio (T2) = ${T2.toFixed(2)} NTU<br>` +
        `Vazão Total = ${vazao_total.toFixed(2)} m³/h`;
    } else if (T3 === 0 && Q3 > 0) {
      T3 = (T4 * vazao_total - Q1 * T1 - Q2 * T2) / Q3;
      mensagem =
        `Turbidez Balneário (T3) = ${T3.toFixed(2)} NTU<br>` +
        `Vazão Total = ${vazao_total.toFixed(2)} m³/h`;
    } else {
      mensagem = 'Insira <b>0</b> no campo que deseja calcular.';
    }

    //==================================================
    // RESULTADO
    //==================================================

    ultimoResultado = {
      Q1,
      Q2,
      Q3,
      T1,
      T2,
      T3,
      T4,
      Qtotal: vazao_total,
      data: new Date().toLocaleString('pt-BR'),
    };

    atualizarUI(mensagem);

    // Salva automaticamente
    if (salvarParametros) {
      salvarParametros('balanco', ultimoResultado);
    } else {
      // Fallback para localStorage
      try {
        localStorage.setItem('eta_balanco', JSON.stringify(ultimoResultado));
      } catch (e) {
        console.error('Erro ao salvar automaticamente:', e);
      }
    }
  } catch (erro) {
    console.error('Erro no cálculo:', erro);
    const resumo = document.getElementById('bal_resumo');
    if (resumo) {
      resumo.innerHTML = `<span style="color:red">Erro no cálculo:<br>${erro.message}</span>`;
    }
  }
}

function atualizarUI(mensagem) {
  const resumo = document.getElementById('bal_resumo');
  if (resumo) {
    resumo.innerHTML = `<div class="resultado">${mensagem}</div>`;
  }

  const json = document.getElementById('bal_json');
  if (json) {
    json.textContent = JSON.stringify(ultimoResultado, null, 4);
  }
}

//==============================================================
// EXPORTAR PDF
//==============================================================

export function exportarPDFBalanco() {
  if (!ultimoResultado.Qtotal) {
    alert('Realize um cálculo primeiro.');
    return;
  }

  // Verifica se o jsPDF está disponível
  if (typeof window.jspdf === 'undefined') {
    alert(
      'Biblioteca jsPDF não carregada. Verifique a conexão com a internet.'
    );
    return;
  }

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('ETA Professional', 20, 20);
    doc.setFontSize(15);
    doc.text('Relatório de Balanço de Massa', 20, 35);
    doc.setFontSize(11);

    let y = 50;
    const dados = {
      'Q1 (Rio do Peixe)': ultimoResultado.Q1,
      'Q2 (Santo Anastácio)': ultimoResultado.Q2,
      'Q3 (Balneário)': ultimoResultado.Q3,
      'T1 (Rio do Peixe)': ultimoResultado.T1,
      'T2 (Santo Anastácio)': ultimoResultado.T2,
      'T3 (Balneário)': ultimoResultado.T3,
      'T4 (Mistura)': ultimoResultado.T4,
      'Vazão Total': ultimoResultado.Qtotal,
      Data: ultimoResultado.data,
    };

    Object.entries(dados).forEach(([k, v]) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(`${k}: ${v}`, 20, y);
      y += 8;
    });

    doc.save('balanco.pdf');
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    alert('Erro ao exportar PDF. Verifique o console para mais detalhes.');
  }
}

//==============================================================
// EXPORTAR EXCEL
//==============================================================

export function exportarExcelBalanco() {
  if (!ultimoResultado.Qtotal) {
    alert('Realize um cálculo primeiro.');
    return;
  }

  // Verifica se o XLSX está disponível
  if (typeof XLSX === 'undefined') {
    alert('Biblioteca XLSX não carregada. Verifique a conexão com a internet.');
    return;
  }

  try {
    const ws = XLSX.utils.json_to_sheet([ultimoResultado]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Balanço');
    XLSX.writeFile(wb, 'balanco.xlsx');
  } catch (error) {
    console.error('Erro ao exportar Excel:', error);
    alert('Erro ao exportar Excel. Verifique o console para mais detalhes.');
  }
}

//==============================================================
// ATALHOS GLOBAIS
//==============================================================

// Define as funções globalmente apenas se não existirem
if (typeof window.exportarPDFBalanco === 'undefined') {
  window.exportarPDFBalanco = exportarPDFBalanco;
}
if (typeof window.exportarExcelBalanco === 'undefined') {
  window.exportarExcelBalanco = exportarExcelBalanco;
}

// Inicializa automaticamente quando o script carrega
if (document.readyState === 'complete') {
  setTimeout(inicializarBalanco, 100);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(inicializarBalanco, 100);
  });
}

//==============================================================
// FIM
//==============================================================
