require('../config/db')();
var dados = require('./dados-conflitos-null')
var Estabelecimento = require('../models/estabelecimento');

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

dados.forEach(function(estabelecimento) {
  var data = {
    id: Number(estabelecimento['CNES']),
    nome: estabelecimento['NOME FANTASIA'].toLowerCase().capitalize(),
    coordenadas: {
      lat: Number(estabelecimento['LATITUDE']),
      lng: Number(estabelecimento['LONGITUDE'])
    },
    endereco: {
      uf: estabelecimento['UF'],
      municipio: estabelecimento['MUNICIPIO'].toLowerCase().capitalize(),
      bairro: estabelecimento['BAIRRO'].toLowerCase().capitalize(),
      numero: estabelecimento['NUMERO'],
      cep: estabelecimento['CEP'],
      logradouro: estabelecimento['LOGRADOURO'].toLowerCase().capitalize()
    }
  }
  Estabelecimento.create(data, function(err) {
    if(err) {
      console.log('error');
    }
  });
});
