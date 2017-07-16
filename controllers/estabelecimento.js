var Estabelecimento = require('../models/estabelecimento');

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
    estabelecimento.save(function(err) {
      callback(err);
    });
  });
}
