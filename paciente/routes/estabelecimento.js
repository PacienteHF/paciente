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
      var data = { id: estabelecimento.id,
                   nome: estabelecimento.nome,
                   endereco: estabelecimento.endereco.logradouro }
      res.render('estabelecimento', data);
    });
  })
  .post(function(req, res) {
    var id = req.params.id;
    var avaliacao = req.body;
    controller.avalia(id, avaliacao, function(err) {
      res.sendStatus(200);
    });
  })

module.exports = router;
