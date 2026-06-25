function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Relatório ETA Profissional", 20, 20);

  // Captura os resultados de cada módulo
  let balanco = document.getElementById("resultado")?.innerText || "";
  let pac = document.getElementById("pac_resultado")?.innerText || "";
  let cal = document.getElementById("cal_resultado")?.innerText || "";
  let pol = document.getElementById("pol_resultado")?.innerText || "";
  let sed = document.getElementById("sed_resultado")?.innerText || "";
  let comp = comparativoView(); // gera HTML do comparativo

  doc.setFontSize(12);
  doc.text("⚖ Balanço de Massa:", 20, 40);
  doc.text(balanco, 20, 50);

  doc.text("🧪 PAC Férrico:", 20, 70);
  doc.text(pac, 20, 80);

  doc.text("🧂 Cal Hidratada:", 20, 100);
  doc.text(cal, 20, 110);

  doc.text("🧬 Polímero:", 20, 130);
  doc.text(pol, 20, 140);

  doc.text("💧 Sedimentação:", 20, 160);
  doc.text(sed, 20, 170);

  doc.text("📊 Comparativo:", 20, 190);
  doc.text(comp.replace(/<[^>]+>/g, ""), 20, 200); // remove tags HTML

  doc.save("relatorio-eta.pdf");
}

function exportarExcel() {
  let dados = [
    ["Módulo", "Resultado"],
    ["Balanço de Massa", document.getElementById("resultado")?.innerText || ""],
    ["PAC Férrico", document.getElementById("pac_resultado")?.innerText || ""],
    ["Cal Hidratada", document.getElementById("cal_resultado")?.innerText || ""],
    ["Polímero", document.getElementById("pol_resultado")?.innerText || ""],
    ["Sedimentação", document.getElementById("sed_resultado")?.innerText || ""],
    ["Comparativo", comparativoView().replace(/<[^>]+>/g, "")]
  ];

  let ws = XLSX.utils.aoa_to_sheet(dados);
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Relatório ETA");
  XLSX.writeFile(wb, "relatorio-eta.xlsx");
}
