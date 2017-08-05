var Estabelecimento = require('../models/estabelecimento');
var _ = require('lodash');

exports.getAll = function(callback) {
  Estabelecimento.find({},
    {
      id: 1,
      nome: 1,
      coordenadas: 1,
      'endereco.logradouro': 1,
      _id: 0
    }, function(err, estabelecimentos) {
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

exports.getAvaliacoes = function(type, callback) {
  Estabelecimento.aggregate(
    [
      { "$project": {
        "_id": "$id",
        "nome": '$nome',
        "cidade": "$endereco.municipio",
        "avgNota": { $avg: "$avaliacoes." + type + ".nota" },
      }},
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

exports.getLista = function(type, order, cidade, callback) {
  if(cidade === 'null') {
    Estabelecimento.aggregate(
      [
        { "$project": {
          "_id": "$id",
          "nome": '$nome',
          "cidade": "$endereco.municipio",
          "bairro": "$endereco.bairro",
          "rua" : "$endereco.logradouro",
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
  } else {
    Estabelecimento.aggregate(
      [
        {"$match" : { "endereco.municipio" : cidade }},
        { "$project": {
          "_id": "$id",
          "nome": '$nome',
          "cidade": "$endereco.municipio",
          "bairro": "$endereco.bairro",
          "rua" : "$endereco.logradouro",
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
      callback(err);
    });
  });
}

// db.estabelecimentos.find({ "avaliacoes.medicamentos._id": ObjectId("596d3171876d34388a04b06a")}, {"avaliacoes.medicamentos.$": true}).pretty()
