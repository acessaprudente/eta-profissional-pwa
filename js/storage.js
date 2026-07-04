/*
==========================================================
ETA PROFESSIONAL PWA
Arquivo: storage.js
Gerenciador de Banco Local
Versão Beta 1.0
==========================================================
*/

const CHAVE = 'ETA_HISTORICO';

//==========================================================
// LER HISTÓRICO
//==========================================================

export function obterHistorico() {
  try {
    const dados = localStorage.getItem(CHAVE);

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  } catch (erro) {
    console.error('Erro ao ler histórico:', erro);

    return [];
  }
}

//==========================================================
// SALVAR HISTÓRICO
//==========================================================

export function salvarHistorico(modulo, dados) {
  try {
    const historico = obterHistorico();

    historico.push({
      id: Date.now(),

      modulo: modulo,

      data: new Date().toLocaleString('pt-BR'),

      dados: dados,
    });

    localStorage.setItem(
      CHAVE,

      JSON.stringify(historico)
    );
  } catch (erro) {
    console.error(erro);
  }
}

//==========================================================
// APAGAR HISTÓRICO
//==========================================================

export function limparHistorico() {
  localStorage.removeItem(CHAVE);
}

//==========================================================
// REMOVER UM REGISTRO
//==========================================================

export function removerRegistro(id) {
  const historico = obterHistorico();

  const novo = historico.filter((item) => item.id !== id);

  localStorage.setItem(
    CHAVE,

    JSON.stringify(novo)
  );
}

//==========================================================
// ÚLTIMO REGISTRO
//==========================================================

export function ultimoRegistro() {
  const historico = obterHistorico();

  if (historico.length === 0) {
    return null;
  }

  return historico[historico.length - 1];
}

//==========================================================
// CONTAGEM
//==========================================================

export function quantidadeRegistros() {
  return obterHistorico().length;
}

//==========================================================
// BUSCAR POR MÓDULO
//==========================================================

export function buscarModulo(nomeModulo) {
  return obterHistorico().filter((item) => item.modulo === nomeModulo);
}

//==========================================================
// EXPORTAR JSON
//==========================================================

export function exportarHistoricoJSON() {
  return JSON.stringify(
    obterHistorico(),

    null,

    4
  );
}

//==========================================================
// IMPORTAR JSON
//==========================================================

export function importarHistoricoJSON(json) {
  try {
    const dados = JSON.parse(json);

    if (!Array.isArray(dados)) {
      throw new Error('Formato inválido.');
    }

    localStorage.setItem(
      CHAVE,

      JSON.stringify(dados)
    );

    return true;
  } catch (erro) {
    console.error(erro);

    return false;
  }
}

//==========================================================
// ESTATÍSTICAS
//==========================================================

export function estatisticasHistorico() {
  const historico = obterHistorico();

  const estatisticas = {
    total: historico.length,

    PAC: 0,

    CAL: 0,

    Polímero: 0,

    'Jar Test': 0,

    'Balanço de Massa': 0,

    Sedimentação: 0,
  };

  historico.forEach((item) => {
    if (estatisticas[item.modulo] !== undefined) {
      estatisticas[item.modulo]++;
    }
  });

  return estatisticas;
}

//==========================================================
// VERIFICAR EXISTÊNCIA
//==========================================================

export function existeHistorico() {
  return obterHistorico().length > 0;
}

//==========================================================
// BACKUP
//==========================================================

export function criarBackup() {
  return {
    sistema: 'ETA Professional',

    versao: 'Beta 1.0',

    criadoEm: new Date().toISOString(),

    historico: obterHistorico(),
  };
}

//==========================================================
// RESTAURAR BACKUP
//==========================================================

export function restaurarBackup(backup) {
  if (!backup || !Array.isArray(backup.historico)) {
    return false;
  }

  localStorage.setItem(
    CHAVE,

    JSON.stringify(backup.historico)
  );

  return true;
}
export function salvarParametros(chave, dados) {
  localStorage.setItem('eta_' + chave, JSON.stringify(dados));
}

export function carregarParametros(chave) {
  const dados = localStorage.getItem('eta_' + chave);
  return dados ? JSON.parse(dados) : null;
}
