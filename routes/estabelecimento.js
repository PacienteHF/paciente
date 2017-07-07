var express = require('express');
var router = express.Router();
var controller = require('../controllers/estabelecimento')

router.route('/estabelecimentos')
  .get(function(req, res) {
    controller.getAll(function(estabelecimentos) {
      res.json(estabelecimentos);
    })
  })

router.route('/estabelecimentos/:id')
  .get(function(req, res) {
    var id = req.params.id;
    controller.get(id, function(estabelecimento) {
      var data = { nome: estabelecimento.nome, endereco: estabelecimento.endereco.logradouro }
      res.render('estabelecimento', data);
    });
  })
  .put(function(req, res) {
    var id = req.params.id;
    var avaliacao = req.body;
    controller.avalia(id, avaliacao, function(err) {
      if(err) {
        res.send(err);
      }
      res.sendStatus(200);
    });
  })

module.exports = router;
