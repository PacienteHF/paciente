var jsonfile = require('jsonfile');
var dadosValidos = require('./dados-validos');
var path = 'dados-completos.json';

/*
jsonfile.readFile(path, function(err, estabelecimentos) {
  // Filtra os estabelecimentos que atendem SUS e possuem dados lat/long completos
  var validos = estabelecimentos.filter(function(estabelecimento) {
    return !(estabelecimento['LATITUDE'] === null ||
           estabelecimento['LONGITUDE'] === null) &&
           estabelecimento['ATENDE SUS'] === "SIM";
  });

  var pathFiltrados = 'dados-validos.json';
  jsonfile.writeFile(pathFiltrados, validos, function (err) {
    console.error(err);
  });
});
*/

// Filtra dos estabelecimentos válidos os estabelecimentos que não são centrais de atendimento
var listaInvalidos = ["SAMU", "SECRETARIA", "ACADEMIA", "VIGILANCIA", "FARMACIA",
                      "LABORATORIO", "SINDICATO", "PENITENCIARIA", "PRESIDIO", "REGULACAO"];

function geraRegExp(list) {
  var strRegExp = '';
  var last = list.pop();
  list.forEach(function(item) {
    strRegExp += ('\\b' + item + '\\b' + '\|');
  });
  strRegExp += '\\b' + last + '\\b';
  return new RegExp(strRegExp);
}

var regExp = geraRegExp(listaInvalidos);
var validos = dadosValidos.filter(function(estabelecimento) {
  return !regExp.test(estabelecimento['NOME FANTASIA']);
});

var pathFiltrados = 'dados-validos.json';
jsonfile.writeFile(pathFiltrados, validos, function (err) {
  console.error(err);
});
