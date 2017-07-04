var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    path = require("path")
    mongoose = require("mongoose")

var Estabelecimento = require("./models/estabelecimento");
require("./models/connect")();
var root = path.resolve(".");
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// dependencias do front-end
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/font-awesome', express.static(__dirname + '/node_modules/font-awesome/css/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.get("/", function(req, res) {
  res.render('index');
});

app.get("/dados", function(req, res) {
  Estabelecimento.find({}, function(err, estabelecimentos) {
    res.json(estabelecimentos);
  })
});

app.post("/avaliarEstrutura", function(req, res) {
  var data = req.body;
  var id = { id: Number(data.id) };
  var avaliacao = { nota : Number(data.nota), comentario: data.problemaEstrutura };
  var update = { $push: { "avaliacoes.infraestrutura" : avaliacao } };
  var query = Estabelecimento.findOneAndUpdate(id, update, function(err) {
    console.log(err);
  });
  res.redirect('/');
});

router.route('/:id').get(function(req, res) {
  var id = req.path.substring(1); // remove / do path
  var query = Estabelecimento.findOne({ id: id });
  query.select('nome endereco id');
  query.exec(function(err, local) {
    res.render(root + '/views/local', { nome: local.nome,
                                        endereco: local.endereco.logradouro,
                                        id: local.id } );
  });
});

app.use('/local', router);

app.listen(3000, function() {
  console.log("Server Running!");
});
