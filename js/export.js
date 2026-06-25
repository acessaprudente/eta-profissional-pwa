function exportarPDF() {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const content = document.getElementById('conteudo').innerText || 'Relatório ETA';
    doc.setFontSize(12);
    doc.text(content.substring(0, 2000), 10, 10);
    doc.save('eta_relatorio.pdf');
  } catch (e) { alert('Erro ao gerar PDF: ' + e.message); }
}
function exportarExcel() {
  try {
    const wb = XLSX.utils.book_new();
    const table = document.querySelector('#conteudo table');
    if (!table) { alert('Nenhuma tabela visível para exportar'); return; }
    const ws = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(wb, ws, 'Relatorio');
    XLSX.writeFile(wb, 'eta_relatorio.xlsx');
  } catch (e) { alert('Erro ao gerar Excel: ' + e.message); }
}
