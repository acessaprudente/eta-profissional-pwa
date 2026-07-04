/*
==========================================================
ETA PROFESSIONAL PWA
Arquivo: util.js
Funções Utilitárias
Versão Beta 1.0
==========================================================
*/

//==========================================================
// CONVERTE PARA NÚMERO
//==========================================================

export function numero(id) {
  const campo = document.getElementById(id);

  if (!campo) return 0;

  const valor = parseFloat(campo.value);

  return isNaN(valor) ? 0 : valor;
}

//==========================================================
// FORMATA NÚMERO
//==========================================================

export function formatar(valor, casas = 2) {
  return Number(valor).toLocaleString('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
}

//==========================================================
// VALIDA CAMPOS
//==========================================================

export function validar(ids) {
  for (const id of ids) {
    const campo = document.getElementById(id);

    if (!campo) {
      alert('Campo não encontrado: ' + id);

      return false;
    }

    if (campo.value === '') {
      campo.focus();

      alert('Preencha o campo.');

      return false;
    }

    if (isNaN(parseFloat(campo.value))) {
      campo.focus();

      alert('Valor inválido.');

      return false;
    }
  }

  return true;
}

//==========================================================
// LIMPA FORMULÁRIO
//==========================================================

export function limparFormulario(container) {
  document.querySelectorAll(`#${container} input`).forEach((campo) => {
    if (campo.type === 'number') {
      campo.value = '';
    }

    if (campo.type === 'text') {
      campo.value = '';
    }
  });
}

//==========================================================
// DATA/HORA
//==========================================================

export function agora() {
  return new Date().toLocaleString('pt-BR');
}

//==========================================================
// ARREDONDAMENTO
//==========================================================

export function arredondar(valor, casas = 2) {
  return Number(valor.toFixed(casas));
}

//==========================================================
// CONVERSÕES
//==========================================================

// m³/h → L/s

export function m3hParaLs(v) {
  return v / 3.6;
}

// L/s → m³/h

export function lsParaM3h(v) {
  return v * 3.6;
}

// m³/h → m³/dia

export function m3hParaDia(v) {
  return v * 24;
}

//==========================================================
// MG/L → g

export function mgParaGramas(mg) {
  return mg / 1000;
}

//==========================================================
// MG/L → kg

export function mgParaKg(mg) {
  return mg / 1000000;
}

//==========================================================
// MOSTRAR MENSAGEM
//==========================================================

export function mensagem(texto) {
  alert(texto);
}

//==========================================================
// CONFIRMAÇÃO
//==========================================================

export function confirmar(texto) {
  return confirm(texto);
}

//==========================================================
// DOWNLOAD DE ARQUIVO
//==========================================================

export function download(nome, conteudo, tipo) {
  const blob = new Blob(
    [conteudo],

    { type: tipo }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');

  a.href = url;

  a.download = nome;

  a.click();

  URL.revokeObjectURL(url);
}

//==========================================================
// COPIAR TEXTO
//==========================================================

export async function copiar(texto) {
  try {
    await navigator.clipboard.writeText(texto);

    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
}

//==========================================================
// CALCULAR mL A PIPETAR
//==========================================================

export function calcularVolumePipeta(
  dosagem,

  volumeJarro,

  concentracao
) {
  return (dosagem * volumeJarro * 1000) / concentracao;
}

//==========================================================
// CALCULAR EFICIÊNCIA
//==========================================================

export function eficiencia(
  entrada,

  saida
) {
  if (entrada <= 0) return 0;

  return ((entrada - saida) / entrada) * 100;
}
