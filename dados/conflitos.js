var dados = require('./dados-validos');
var jsonfile = require('jsonfile');
var _ = require('lodash');

function sameLocalization(estabelecimento, ponto) {
  return (estabelecimento['LATITUDE'] === ponto.lat) &&
         (estabelecimento['LONGITUDE'] === ponto.lng)
}

var pontos = [];

dados.forEach(function(estabelecimento) {
  var found = false;
  for (var i = 0; i < pontos.length; i++) {
    if (sameLocalization(estabelecimento, pontos[i])) {
      pontos[i].estabelecimentos.push(estabelecimento['NOME FANTASIA']);
      found = true;
      break;
    }
  }
  if (!found) {
    pontos.push({ lat: estabelecimento['LATITUDE'],
                  lng: estabelecimento['LONGITUDE'],
                  estabelecimentos: [ estabelecimento['NOME FANTASIA'] ] });
  }
});

pontos = _.sortBy(pontos, [function(p) { return p.estabelecimentos.length; }])

jsonfile.writeFile('conflitos.json', pontos, function (err) {
  console.error(err);
});
