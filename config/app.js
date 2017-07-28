var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');

var router = require('../routes/index');
var Estabelecimento = require('../controllers/estabelecimento');

var controller = require('../controllers/estabelecimento');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('./public'));

// dependencias do front-end
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist/'));
app.use('/bootstrap-switch', express.static('./node_modules/bootstrap-switch/dist/'));
app.use('/font-awesome', express.static('./node_modules/font-awesome/css/'));
app.use('/jquery', express.static('./node_modules/jquery/dist/'));
app.use('/ajax', express.static('./node_modules/jquery-form/dist/'));
app.use('/autocomplete', express.static('./node_modules/devbridge-autocomplete/dist/'));
app.use('/vue', express.static('./node_modules/vue/dist/'));
app.use('/vue-resource', express.static('./node_modules/vue-resource/dist/'));
app.use('/animate-css', express.static('./node_modules/animate.css/'));
app.use('/noty', express.static('./node_modules/noty/lib/'));

app.use('/', router);

app.get("/", function(req, res) {
  res.render('index');
});

app.get("/sobre", function(req, res) {
  res.render('sobre');
});

app.get("/ajuda", function(req, res) {
  res.render('ajuda');
});

app.get("/privacidade", function(req, res) {
  res.render('privacidade');
});

app.get("/ranking", function(req, res) {
  var order = Number(req.query.order);
  var ranking = {};
  controller.getRankingTotal("presencaEquipe", order, function(rankingPresenca) {
    ranking.presencaEquipe = rankingPresenca;
    controller.getRankingTotal("tempoEspera", order, function(rankingEspera) {
      ranking.tempoEspera = rankingEspera;
      controller.getRankingTotal("qualidadeAtendimento", order, function(rankingAtendimento) {
        ranking.qualidadeAtendimento = rankingAtendimento;
        controller.getRankingTotal("medicamentos", order, function(rankingMedicamentos) {
          ranking.medicamentos = rankingMedicamentos;
          controller.getRankingTotal("equipamentos", order, function(rankingEquipamentos) {
            ranking.equipamentos = rankingEquipamentos;
            controller.getRankingTotal("infraestrutura", order, function(rankingInfraestrutura) {
              ranking.infraestrutura = rankingInfraestrutura;
              res.json(ranking);
            });
          });
        });
      });
    });
  });
});

app.get("/rankingTotal", function(req, res) {
  var order = Number(req.query.order);
  var type = req.query.type;
  controller.getRankingTotal(type, order, function(rankingTotal) {
    res.json(rankingTotal);
  });
});

app.get("/rankingCidade", function(req, res) {
  var order = Number(req.query.order);
  var type = req.query.type;
  var cidade = req.query.cidade;
  controller.getRankingCidade(type, order, cidade, function(ranking) {
    res.json(ranking);
  });
});

app.get("/rankingCidadeTotal", function(req, res) {
  var order = Number(req.query.order);
  var type = req.query.type;
  var cidade = req.query.cidade;
  controller.getRankingCidade(type, order, cidade, function(ranking) {
    res.json(ranking);
  });
});

module.exports = app;
