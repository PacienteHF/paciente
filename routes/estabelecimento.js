var express = require('express');
var router = express.Router();
var Estabelecimento = require('../models/estabelecimento');

router.route('/estabelecimentos')
  .get(function(req, res) {
    Estabelecimento.find({}, function(err, estabelecimentos) {
      res.json(estabelecimentos);
    });
  })

router.route('/estabelecimentos/:id')
  .get(function(req, res) {
    var id = req.params.id;
    var query = Estabelecimento.findOne({ id: id });
    query.exec(function(err, estabelecimento) {
      res.json(estabelecimento);
    });
  })
  .put(function(req, res) {
    var avaliacao = req.body;
    var id = req.params.id;
    var query = Estabelecimento.findOne({ id: id });
    query.exec(function(err, estabelecimento) {
      estabelecimento.avaliacoes.infraestrutura.push(avaliacao);
      estabelecimento.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.sendStatus(200);
      });
    });
  })

module.exports = router;
