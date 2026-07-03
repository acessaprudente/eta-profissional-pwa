/*
==========================================================
ETA PROFESSIONAL PWA
Módulo: Exportação (PDF / Excel)
Versão: Alpha 0.1
==========================================================
*/


// =========================================
// EXPORTAR PDF
// =========================================

export function exportarPDF(titulo = "ETA Professional", conteudo = "") {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.text(titulo, 10, 10);

    doc.setFont("helvetica", "normal");
    doc.text(String(conteudo), 10, 20);

    doc.save("relatorio_eta.pdf");
}


// =========================================
// EXPORTAR EXCEL
// =========================================

export function exportarExcel(dados = [], nome = "eta_dados") {

    const wb = XLSX.utils.book_new();

    const ws = XLSX.utils.json_to_sheet(dados);

    XLSX.utils.book_append_sheet(wb, ws, "Dados");

    XLSX.writeFile(wb, nome + ".xlsx");
}


// =========================================
// EXPORTAR PAC
// =========================================

export function exportarPAC(resultado) {

    const dados = [

        {
            modulo: "PAC",
            tipo: "Tal Qual",
            volume_ml: resultado.talqual.volume_produto_ml,
            concentracao: resultado.talqual.concentracao_mgl
        },

        {
            modulo: "PAC",
            tipo: "Solução Sal",
            volume_ml: resultado.sal.volume_produto_ml,
            concentracao: resultado.sal.concentracao_mgl
        }

    ];

    exportarExcel(dados, "pac_resultado");
}


// =========================================
// EXPORTAR CAL
// =========================================

export function exportarCAL(resultado) {

    exportarExcel(resultado.tabela, "cal_resultado");
}


// =========================================
// EXPORTAR POLÍMERO
// =========================================

export function exportarPOLIMERO(resultado) {

    exportarExcel(resultado.tabela, "polimero_resultado");
}


// =========================================
// EXPORTAÇÃO GENÉRICA
// =========================================

export function exportarModulo(nome, resultado) {

    switch (nome) {

        case "pac":
            exportarPAC(resultado);
            break;

        case "cal":
            exportarCAL(resultado);
            break;

        case "polimero":
            exportarPOLIMERO(resultado);
            break;

        default:
            exportarExcel(resultado, nome);
    }
}
