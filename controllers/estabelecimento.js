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
