var Estabelecimento = require('../models/estabelecimento');
var _ = require('lodash');

exports.getAll = function(callback) {
  Estabelecimento.find({}, function(err, estabelecimentos) {
    callback(estabelecimentos);
  });
}

exports.get = function(id, callback) {
  var query = Estabelecimento.findOne({ id: id });
  query.exec(function(err, estabelecimento) {
    callback(err, estabelecimento);
  });
}

exports.getNotas = function(estabelecimento, callback) {
  function average(array) {
    function plus(a, b) { return a + b; }
    if(array.length === 0) { return 0; }
    return Math.round(array.reduce(plus) / array.length);
  }
  var notas = {
    presencaEquipe: average(estabelecimento.avaliacoes.presencaEquipe.map(function(avaliacao) {
      return avaliacao.nota;
    })),
    tempoEspera: average(estabelecimento.avaliacoes.tempoEspera.map(function(avaliacao) {
      return avaliacao.nota;
    })),
    qualidadeAtendimento: average(estabelecimento.avaliacoes.qualidadeAtendimento.map(function(avaliacao) {
      return avaliacao.nota;
    })),
    equipamentos: average(estabelecimento.avaliacoes.equipamentos.map(function(avaliacao) {
      return avaliacao.nota;
    })),
    medicamentos: average(estabelecimento.avaliacoes.medicamentos.map(function(avaliacao) {
      return avaliacao.nota;
    })),
    infraestrutura: average(estabelecimento.avaliacoes.infraestrutura.map(function(avaliacao) {
      return avaliacao.nota;
    }))
  }
  callback(notas);
}

exports.avalia = function(id, avaliacao, callback) {
  this.get(id, function(err, estabelecimento) {
    var type = avaliacao.type;
    delete avaliacao.type;
    estabelecimento.avaliacoes[type].push(avaliacao);
    estabelecimento.save(function(err, estab) {
      var idAvaliacao = _.last(estab.avaliacoes[type])._id;
      callback(err, idAvaliacao);
    });
  });
}

// db.estabelecimentos.find({ "avaliacoes.medicamentos._id": ObjectId("596d3171876d34388a04b06a")}, {"avaliacoes.medicamentos.$": true}).pretty()
