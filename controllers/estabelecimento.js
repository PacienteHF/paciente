var Estabelecimento = require('../models/estabelecimento');
var _ = require('lodash');

exports.getAll = function(callback) {
  Estabelecimento.find({}, function(err, estabelecimentos) {
    callback(estabelecimentos);
  });
}

exports.get = function(id, callback) {
  var query = Estabelecimento.findOne({ id: id });
  query.exec(function (err, estabelecimento) {
    if (estabelecimento === null) {
      err = { error :'estabelecimento não encontrado' };
    }
    callback(err, estabelecimento);
  });
}

exports.getRanking = function(type, order, callback) {
  Estabelecimento.aggregate(
    [
      { "$project": {
        "_id": "$id",
        "nome": '$nome',
        "avgNota": { $avg: "$avaliacoes." + type + ".nota" },
      }},
      { "$sort": { "avgNota": order } },
      { "$match": {
        "avgNota": { "$exists": true, "$ne": null }
      }},
      { "$limit": 3 }
    ],
    function(err, ranking) {
      callback(ranking);
    }
  );
}

exports.getRankingCidade = function(type, order, cidade, callback) {
  Estabelecimento.aggregate(
    [
      { "$match" : { "endereco.municipio" : cidade }},
      { "$project": {
        "_id": "$id",
        "nome": '$nome',
        "avgNota": { $avg: "$avaliacoes." + type + ".nota" },
      }},
      { "$sort": { "avgNota": order } },
      { "$match": {
        "avgNota": { "$exists": true, "$ne": null }
      }},
      { "$limit": 3 }
    ],
    function(err, ranking) {
      callback(ranking);
    }
  );
}

exports.getRankingCidadeTotal = function(type, order, cidade, callback) {
  Estabelecimento.aggregate(
    [
      { "$match" : { "endereco.municipio" : cidade }},
      { "$project": {
        "_id": "$id",
        "nome": '$nome',
        "avgNota": { $avg: "$avaliacoes." + type + ".nota" },
      }},
      { "$sort": { "avgNota": order } },
      { "$match": {
        "avgNota": { "$exists": true, "$ne": null }
      }}
    ],
    function(err, ranking) {
      callback(ranking);
    }
  );
}

exports.getRankingTotal = function(type, order, callback) {
  Estabelecimento.aggregate(
    [
      { "$project": {
        "_id": "$id",
        "nome": '$nome',
        "cidade": "$endereco.municipio",
        "avgNota": { $avg: "$avaliacoes." + type + ".nota" },
      }},
      { "$sort": { "avgNota": order } },
      { "$match": {
        "avgNota": { "$exists": true, "$ne": null }
      }}
    ],
    function(err, ranking) {
      ranking.forEach(function(estabelecimento) {
        estabelecimento.avgNota = estabelecimento.avgNota.toFixed(1);
      });
      callback(ranking);
    }
  );
}

exports.getNota = function(estabelecimento, type) {
  function average(array) {
    function plus(a, b) { return a + b; }
    if(array.length === 0) { return 0; }
    return Math.round(array.reduce(plus) / array.length);
  }
  return average(estabelecimento.avaliacoes[type].map(function(avaliacao) {
    return avaliacao.nota;
  }));
}

exports.getNotas = function(estabelecimento, callback) {
  var notas = {
    presencaEquipe: this.getNota(estabelecimento, "presencaEquipe"),
    tempoEspera: this.getNota(estabelecimento, "tempoEspera"),
    qualidadeAtendimento: this.getNota(estabelecimento, "qualidadeAtendimento"),
    equipamentos: this.getNota(estabelecimento, "equipamentos"),
    medicamentos: this.getNota(estabelecimento, "medicamentos"),
    infraestrutura: this.getNota(estabelecimento, "infraestrutura")
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
