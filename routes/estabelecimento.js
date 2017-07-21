var express = require('express');
var router = express.Router();
var controller = require('../controllers/estabelecimento')

router.route('/')
  .get(function(req, res) {
    controller.getAll(function(estabelecimentos) {
      res.json(estabelecimentos);
    })
  })

router.route('/:id')
  .get(function(req, res) {
    var id = req.params.id;
    controller.get(id, function(err, estabelecimento) {
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
      console.log(notas);
      var data = { id: estabelecimento.id,
                    nome: estabelecimento.nome,
                    endereco: estabelecimento.endereco.logradouro,
                    notas: notas }
      res.render('estabelecimento', data);
    });
  })
  .post(function(req, res) {
    var id = req.params.id;
    var avaliacao = req.body;
    var type = avaliacao.type;
    var cookies = req.cookies;
    if (type in cookies) {
      res.sendStatus(403);
    } else {
      controller.avalia(id, avaliacao, function(err, avaliacaoId) {
        if(err) {
          res.sendStatus(403);
        }
        res.cookie(type, avaliacaoId, { maxAge: 24 * 60 * 60 * 1000, path: '/estabelecimentos/' + id });
        res.sendStatus(200);
      });
    }
  })

module.exports = router;
