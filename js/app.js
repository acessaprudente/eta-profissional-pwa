const conteudo = document.getElementById("conteudo");

function render(html) {
    conteudo.innerHTML = html;
}

function abrirModulo(nome) {

    switch (nome) {

        case "pac":
            import("./engine/pac.js").then(m => {
                render(m.pacView());
                m.inicializarPAC();
            });
            break;

        case "cal":
            import("./engine/cal.js").then(m => {
                render(m.calView());
                m.inicializarCAL();
            });
            break;

        case "polimero":
            import("./engine/polimero.js").then(m => {
                render(m.polimeroView());
                m.inicializarPOLIMERO();
            });
            break;

        case "balanco":
            import("./engine/balanco.js").then(m => {
                render(m.balancoView());
            });
            break;

        case "jar":
            import("./engine/jar.js").then(m => {
                render(m.jarView());
                m.inicializarJAR();
            });
            break;

        case "sedimentacao":
            import("./engine/sedimentacao.js").then(m => {
                render(m.sedimentacaoView());
                m.inicializarSEDIMENTACAO();
            });
            break;

        default:
            render("<h2>Módulo não encontrado</h2>");
    }
}
