require('../config/db')();
var dados = require('./dados-validos-sem-conflito')
var Estabelecimento = require('../models/estabelecimento');

dados.forEach(function(estabelecimento) {
  var data = {
    id: Number(estabelecimento['CNES']),
    nome: estabelecimento['NOME FANTASIA'],
    coordenadas: {
      lat: Number(estabelecimento['LATITUDE']),
      lng: Number(estabelecimento['LONGITUDE'])
    },
    endereco: {
      uf: estabelecimento['UF'],
      municipio: estabelecimento['MUNICIPIO'],
      bairro: estabelecimento['BAIRRO'],
      numero: estabelecimento['NUMERO'],
      cep: estabelecimento['CEP'],
      logradouro: estabelecimento['LOGRADOURO']
    }
  }
  Estabelecimento.create(data, function(err) {
    if(err) {
      console.log('error');
    }
  });
});
