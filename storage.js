// Funções para salvar e carregar dados no localStorage

function salvarDadosModulo(modulo, campos) {
  let dados = {};
  campos.forEach(id => {
    dados[id] = document.getElementById(id).value;
  });
  localStorage.setItem(modulo, JSON.stringify(dados));
}

function carregarDadosModulo(modulo, campos) {
  let dados = JSON.parse(localStorage.getItem(modulo));
  if (dados) {
    campos.forEach(id => {
      if (dados[id] !== undefined) {
        document.getElementById(id).value = dados[id];
      }
    });
  }
}
