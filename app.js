var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    path = require("path")
    mongoose = require("mongoose")

var local = require("./models/local");
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
    res.sendFile(root + '/views/index.html');
});

app.post("/submitForm", function(req, res) {
  console.log(req.body);
});

router.route('/:id').get(function(req, res) {
  var id = req.path.substring(1); // remove / do path
  var query = local.findOne({ id: id });
  query.select('nome endereco');
  query.exec(function(err, local) {
    res.render(root + '/views/local', { nome: local.nome, endereco: local.endereco });
  });
});

app.use('/local', router);

app.listen(3000, function() {
    console.log("Server Running!");
});
