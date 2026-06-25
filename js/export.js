function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Cabeçalho
  doc.setFontSize(18);
  doc.text("ETA Profissional - Relatório Técnico", 20, 20);
  doc.setFontSize(12);
  doc.text(`Data: ${new Date().toLocaleDateString("pt-BR")}`, 20, 30);
  doc.text("Responsável Técnico: ___________________________", 20, 40);

  // Linha separadora
  doc.line(20, 45, 190, 45);

  // Conteúdo dos módulos
  let balanco = document.getElementById("resultado")?.innerText || "";
  let pac = document.getElementById("pac_resultado")?.innerText || "";
  let cal = document.getElementById("cal_resultado")?.innerText || "";
  let pol = document.getElementById("pol_resultado")?.innerText || "";
  let sed = document.getElementById("sed_resultado")?.innerText || "";
  let comp = comparativoView().replace(/<[^>]+>/g, "");

  doc.setFontSize(14);
  doc.text("⚖ Balanço de Massa", 20, 60);
  doc.setFontSize(10);
  doc.text(balanco, 20, 70);

  doc.setFontSize(14);
  doc.text("🧪 PAC Férrico", 20, 90);
  doc.setFontSize(10);
  doc.text(pac, 20, 100);

  doc.setFontSize(14);
  doc.text("🧂 Cal Hidratada", 20, 120);
  doc.setFontSize(10);
  doc.text(cal, 20, 130);

  doc.setFontSize(14);
  doc.text("🧬 Polímero", 20, 150);
  doc.setFontSize(10);
  doc.text(pol, 20, 160);

  doc.setFontSize(14);
  doc.text("💧 Sedimentação", 20, 180);
  doc.setFontSize(10);
  doc.text(sed, 20, 190);

  doc.setFontSize(14);
  doc.text("📊 Comparativo", 20, 210);
  doc.setFontSize(10);
  doc.text(comp, 20, 220);

  // Rodapé
  doc.line(20, 270, 190, 270);
  doc.setFontSize(10);
  doc.text("ETA Profissional - Sistema de Apoio Operacional", 20, 280);

  doc.save("relatorio-eta.pdf");
}
function exportarExcel() {
  let dados = [
    ["ETA Profissional - Relatório Técnico"],
    [`Data: ${new Date().toLocaleDateString("pt-BR")}`],
    ["Responsável Técnico:", "___________________________"],
    [],
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
function gerarCapaPDF(doc) {
  // Fundo claro
  doc.setFillColor(240, 240, 240);
  doc.rect(0, 0, 210, 297, "F");

  // Logotipo
  doc.setFontSize(22);
  doc.text("ETA Profissional", 105, 60, { align: "center" });

  // Subtítulo
  doc.setFontSize(16);
  doc.text("Relatório Técnico", 105, 80, { align: "center" });

  // Linha separadora
  doc.setDrawColor(100, 100, 100);
  doc.line(40, 90, 170, 90);

  // Data e responsável
  doc.setFontSize(12);
  doc.text(`Data: ${new Date().toLocaleDateString("pt-BR")}`, 40, 110);
  doc.text("ETA: ___________________________", 40, 125);
  doc.text("Responsável Técnico: ___________________________", 40, 140);

  // Rodapé
  doc.setFontSize(10);
  doc.text("Sistema ETA Profissional - Apoio Operacional", 105, 280, { align: "center" });
}

function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Gera capa
function gerarCapaPDF(doc) {
  // Fundo branco
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 297, "F");

  // Título
  doc.setFontSize(22);
  doc.text("ETA Profissional", 105, 60, { align: "center" });

  // Subtítulo
  doc.setFontSize(16);
  doc.text("Relatório Técnico", 105, 80, { align: "center" });

  // Linha separadora
  doc.setDrawColor(0, 0, 0);
  doc.line(40, 90, 170, 90);

  // Data e campos
  doc.setFontSize(12);
  doc.text(`Data: ${new Date().toLocaleDateString("pt-BR")}`, 40, 110);
  doc.text("ETA: ___________________________", 40, 125);
  doc.text("Responsável Técnico: ___________________________", 40, 140);

  // Rodapé
  doc.setFontSize(10);
  doc.text("Sistema ETA Profissional - Apoio Operacional", 105, 280, { align: "center" });
}

function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Capa
  gerarCapaPDF(doc);

  // Nova página para conteúdo
  doc.addPage();

  // Conteúdo dos módulos
  let balanco = document.getElementById("resultado")?.innerText || "";
  let pac = document.getElementById("pac_resultado")?.innerText || "";
  let cal = document.getElementById("cal_resultado")?.innerText || "";
  let pol = document.getElementById("pol_resultado")?.innerText || "";
  let sed = document.getElementById("sed_resultado")?.innerText || "";
  let comp = comparativoView().replace(/<[^>]+>/g, "");

  doc.setFontSize(14);
  doc.text("⚖ Balanço de Massa", 20, 30);
  doc.setFontSize(10);
  doc.text(balanco, 20, 40);

  doc.setFontSize(14);
  doc.text("🧪 PAC Férrico", 20, 60);
  doc.setFontSize(10);
  doc.text(pac, 20, 70);

  doc.setFontSize(14);
  doc.text("🧂 Cal Hidratada", 20, 90);
  doc.setFontSize(10);
  doc.text(cal, 20, 100);

  doc.setFontSize(14);
  doc.text("🧬 Polímero", 20, 120);
  doc.setFontSize(10);
  doc.text(pol, 20, 130);

  doc.setFontSize(14);
  doc.text("💧 Sedimentação", 20, 150);
  doc.setFontSize(10);
  doc.text(sed, 20, 160);

  doc.setFontSize(14);
  doc.text("📊 Comparativo", 20, 180);
  doc.setFontSize(10);
  doc.text(comp, 20, 190);

  doc.save("relatorio-eta.pdf");
}
function gerarCapaPDF(doc) {
  // Fundo branco
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 297, "F");

  // Título
  doc.setFontSize(22);
  doc.text("ETA Profissional", 105, 60, { align: "center" });

  // Subtítulo
  doc.setFontSize(16);
  doc.text("Relatório Técnico", 105, 80, { align: "center" });

  // Linha separadora
  doc.setDrawColor(0, 0, 0);
  doc.line(40, 90, 170, 90);

  // Data e campos
  doc.setFontSize(12);
  doc.text(`Data: ${new Date().toLocaleDateString("pt-BR")}`, 40, 110);
  doc.text("ETA: ___________________________", 40, 125);
  doc.text("Responsável Técnico: ___________________________", 40, 140);

  // Rodapé
  doc.setFontSize(10);
  doc.text("Sistema ETA Profissional - Apoio Operacional", 105, 280, { align: "center" });
}

function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Capa
  gerarCapaPDF(doc);

  // Nova página para conteúdo
  doc.addPage();

  // Conteúdo dos módulos
  let balanco = document.getElementById("resultado")?.innerText || "";
  let pac = document.getElementById("pac_resultado")?.innerText || "";
  let cal = document.getElementById("cal_resultado")?.innerText || "";
  let pol = document.getElementById("pol_resultado")?.innerText || "";
  let sed = document.getElementById("sed_resultado")?.innerText || "";
  let comp = comparativoView().replace(/<[^>]+>/g, "");

  doc.setFontSize(14);
  doc.text("⚖ Balanço de Massa", 20, 30);
  doc.setFontSize(10);
  doc.text(balanco, 20, 40);

  doc.setFontSize(14);
  doc.text("🧪 PAC Férrico", 20, 60);
  doc.setFontSize(10);
  doc.text(pac, 20, 70);

  doc.setFontSize(14);
  doc.text("🧂 Cal Hidratada", 20, 90);
  doc.setFontSize(10);
  doc.text(cal, 20, 100);

  doc.setFontSize(14);
  doc.text("🧬 Polímero", 20, 120);
  doc.setFontSize(10);
  doc.text(pol, 20, 130);

  doc.setFontSize(14);
  doc.text("💧 Sedimentação", 20, 150);
  doc.setFontSize(10);
  doc.text(sed, 20, 160);

  doc.setFontSize(14);
  doc.text("📊 Comparativo", 20, 180);
  doc.setFontSize(10);
  doc.text(comp, 20, 190);

  doc.save("relatorio-eta.pdf");
}

}
