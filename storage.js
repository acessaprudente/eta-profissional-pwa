/*
==========================================================
ETA PROFESSIONAL PWA
Módulo: Storage (Histórico Local)
Versão: Alpha 0.1
==========================================================
*/


// =========================================
// SALVAR RESULTADO
// =========================================

export function salvarHistorico(modulo, dados) {

    const historico =
        JSON.parse(localStorage.getItem("eta_historico")) || [];

    historico.push({
        modulo: modulo,
        data: new Date().toISOString(),
        dados: dados
    });

    localStorage.setItem(
        "eta_historico",
        JSON.stringify(historico)
    );
}


// =========================================
// LISTAR HISTÓRICO
// =========================================

export function listarHistorico() {

    return JSON.parse(
        localStorage.getItem("eta_historico")
    ) || [];
}


// =========================================
// LIMPAR HISTÓRICO
// =========================================

export function limparHistorico() {

    localStorage.removeItem("eta_historico");
}


// =========================================
// BUSCAR POR MÓDULO
// =========================================

export function filtrarHistorico(modulo) {

    const historico = listarHistorico();

    return historico.filter(item =>
        item.modulo === modulo
    );
}
