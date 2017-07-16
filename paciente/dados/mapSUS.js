var Nightmare = require('nightmare');
var jsonfile = require('jsonfile');
var estabelecimentos = require('./dados-originais');

var totalProcessados = 0;
var totalEstab = 0;
var processados = [];
var rejeitados = [];

totalEstab = estabelecimentos.length;
// Pooling
consulta(estabelecimentos);
consulta(estabelecimentos);
consulta(estabelecimentos);
consulta(estabelecimentos);
consulta(estabelecimentos);

function consultaSUS(browser, estabelecimento, next) {
  browser
    .goto('http://cnes.datasus.gov.br/pages/estabelecimentos/consulta.jsp')
    .type('#pesquisaValue', estabelecimento['CNES'])
    .click('.btn-primary')
    .wait('td')
    .evaluate(function () {
      return document.querySelectorAll('td')[6].innerText;
    })
    .end()
    .then(function (result) {
      var porcentagem = Math.floor(totalProcessados / totalEstab * 100)
      console.log(porcentagem + '% - ' + estabelecimento['NOME FANTASIA'] + ' - ' + result);
      estabelecimento['ATENDE SUS'] = result;
      processados.push(estabelecimento);
      next();
    })
    .catch(function (error) {
      rejeitados.push(estabelecimento);
      next();
    });
}

function consulta(estabelecimentos) {
  totalProcessados++;
  if(estabelecimentos.length > 0) {
    var nightmare = Nightmare({ show: false }); // instancia um novo browser
    consultaSUS(nightmare, estabelecimentos.shift(), function() {
      consulta(estabelecimentos);
    });
  }
  else {
    var pathSUS = 'dados-completos.json';
    jsonfile.writeFile(pathSUS, processados, function (err) {
      console.error(err)
    });

    var pathRejeitados = 'rejeitados.json';
    jsonfile.writeFile(pathRejeitados, rejeitados, function (err) {
      console.error(err)
    });
  }
}
