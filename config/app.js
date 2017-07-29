var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    router = require('../routes/index'),
    Estabelecimento = require('../controllers/estabelecimento'),
    controller = require('../controllers/estabelecimento'),
    compression = require("compression")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('./public'));
app.use(compression());
app.set('view engine', 'ejs');

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
app.use('/hover', express.static('./node_modules/hover.css/css/'));


app.use('/', router);

app.get("/", function(req, res) {
  res.render('index');
});

app.get("/sobre", function(req, res) {
  res.render('sobre');
});

app.get("/listaCompleta", function(req, res) {
  res.render('listaCompleta');
});

app.get("/ajuda", function(req, res) {
  res.render('ajuda');
});

app.get("/privacidade", function(req, res) {
  res.render('privacidade');
});

app.get("/404", function(req, res) {
  res.render('404');
});

app.get("/ranking", function(req, res) {
  var ranking = {};
  controller.getRanking("presencaEquipe", 1, function(rankingPresenca) {
    ranking.presencaEquipe = rankingPresenca;
    controller.getRanking("tempoEspera", 1, function(rankingEspera) {
      ranking.tempoEspera = rankingEspera;
      controller.getRanking("qualidadeAtendimento", 1, function(rankingAtendimento) {
        ranking.qualidadeAtendimento = rankingAtendimento;
        controller.getRanking("medicamentos", 1, function(rankingMedicamentos) {
          ranking.medicamentos = rankingMedicamentos;
          controller.getRanking("equipamentos", 1, function(rankingEquipamentos) {
            ranking.equipamentos = rankingEquipamentos;
            controller.getRanking("infraestrutura", 1, function(rankingInfraestrutura) {
              ranking.infraestrutura = rankingInfraestrutura;
              res.json(ranking);
            });
          });
        });
      });
    });
  });
});

app.get("/ranking/:id", function(req,res) {
  var nome;
  if (req.params.id==="presencaEquipe") {
    nome = "Presença de Profissionais de Saúde";
  } else if (req.params.id==="tempoEspera") {
    nome = "Tempo Espera";
  } else if (req.params.id==="qualidadeAtendimento") {
    nome = "Qualidade de Atendimento";
  } else if (req.params.id==="medicamentos") {
    nome = "Disponibilidade de Medicamentos";
  } else if (req.params.id==="equipamentos") {
    nome = "Disponibilidade de Equipamentos";
  } else {
    nome = "infraestrutura";
  }

  var order;
  if(req.query.order === 'true') {
    order = -1;
  } else {
    order = 1;
  }
  controller.getRanking(req.params.id, order, function(ranking) {
    res.render('listaCompleta', { data :  { ranking: ranking, nome: nome }});
  });
});

module.exports = app;
