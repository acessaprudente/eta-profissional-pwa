
// Exportar relatório em PDF usando jsPDF
function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Relatório ETA Profissional", 20, 20);

  // Captura os valores atuais dos campos do balanço
  let Q1 = document.getElementById("Q1")?.value || "";
  let Q2 = document.getElementById("Q2")?.value || "";
  let Q3 = document.getElementById("Q3")?.value || "";
  let T1 = document.getElementById("T1")?.value || "";
  let T2 = document.getElementById("T2")?.value || "";
  let T3 = document.getElementById("T3")?.value || "";
  let T4 = document.getElementById("T4")?.value || "";
  let resultado = document.getElementById("resultado")?.innerText || "";

  doc.setFontSize(12);
  doc.text(`Q1: ${Q1}`, 20, 40);
  doc.text(`Q2: ${Q2}`, 20, 50);
  doc.text(`Q3: ${Q3}`, 20, 60);
  doc.text(`T1: ${T1}`, 20, 70);
  doc.text(`T2: ${T2}`, 20, 80);
  doc.text(`T3: ${T3}`, 20, 90);
  doc.text(`T4: ${T4}`, 20, 100);

  doc.text("Resultado:", 20, 120);
  doc.text(resultado, 20, 130);

  doc.save("relatorio-eta.pdf");
}

// Exportar relatório em Excel usando SheetJS (XLSX)
function exportarExcel() {
  let dados = [
    ["Q1","Q2","Q3","T1","T2","T3","T4","Resultado"],
    [
      document.getElementById("Q1")?.value || "",
      document.getElementById("Q2")?.value || "",
      document.getElementById("Q3")?.value || "",
      document.getElementById("T1")?.value || "",
      document.getElementById("T2")?.value || "",
      document.getElementById("T3")?.value || "",
      document.getElementById("T4")?.value || "",
      document.getElementById("resultado")?.innerText || ""
    ]
  ];

  let ws = XLSX.utils.aoa_to_sheet(dados);
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Relatório ETA");
  XLSX.writeFile(wb, "relatorio-eta.xlsx");
}
