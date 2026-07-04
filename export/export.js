/*
==========================================================
ETA PROFESSIONAL PWA
Módulo Exportação
Versão Beta 1.0
==========================================================
*/

import { obterHistorico } from '../js/storage.js';

//======================================================
// EXPORTAR PDF
//======================================================

export function exportarPDF() {
  if (typeof window.jspdf === 'undefined') {
    alert('Biblioteca jsPDF não encontrada.');

    return;
  }

  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF();

  const historico = obterHistorico();

  pdf.setFontSize(18);

  pdf.text('ETA Professional', 20, 20);

  pdf.setFontSize(11);

  pdf.text('Relatório de Operação', 20, 30);

  let linha = 45;

  if (historico.length === 0) {
    pdf.text('Nenhum registro encontrado.', 20, linha);
  } else {
    historico.forEach((item, index) => {
      pdf.setFont(undefined, 'bold');

      pdf.text(`${index + 1}. ${item.modulo}`, 20, linha);

      linha += 8;

      pdf.setFont(undefined, 'normal');

      pdf.text(JSON.stringify(item.dados), 25, linha);

      linha += 15;

      if (linha > 270) {
        pdf.addPage();

        linha = 20;
      }
    });
  }

  pdf.save('ETA_Professional.pdf');
}

//======================================================
// EXPORTAR EXCEL
//======================================================

export function exportarExcel() {
  if (typeof XLSX === 'undefined') {
    alert('Biblioteca XLSX não encontrada.');

    return;
  }

  const historico = obterHistorico();

  if (historico.length === 0) {
    alert('Não existem dados para exportar.');

    return;
  }

  const dados = [];

  historico.forEach((item) => {
    dados.push({
      Modulo: item.modulo,

      Data: item.data,

      Resultado: JSON.stringify(item.dados),
    });
  });

  const planilha = XLSX.utils.json_to_sheet(dados);

  const livro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    livro,

    planilha,

    'Histórico'
  );

  XLSX.writeFile(
    livro,

    'ETA_Professional.xlsx'
  );
}

//======================================================
// LIMPAR HISTÓRICO
//======================================================

export function limparHistorico() {
  if (confirm('Deseja apagar todo o histórico?')) {
    localStorage.removeItem('ETA_HISTORICO');

    alert('Histórico apagado.');
  }
}

//======================================================
// EXPORTAÇÃO JSON
//======================================================

export function exportarJSON() {
  const historico = obterHistorico();

  const blob = new Blob(
    [
      JSON.stringify(
        historico,

        null,

        4
      ),
    ],

    {
      type: 'application/json',
    }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');

  a.href = url;

  a.download = 'ETA_Professional.json';

  a.click();

  URL.revokeObjectURL(url);
}
