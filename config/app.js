var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var router = require('../routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('./public'));

// dependencias do front-end
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist/'));
app.use('/font-awesome', express.static('./node_modules/font-awesome/css/'));
app.use('/jquery', express.static('./node_modules/jquery/dist/'));
app.use('/autocomplete', express.static('./node_modules/devbridge-autocomplete/dist/'));

app.use('/', router);

app.get("/", function(req, res) {
  res.render('index');
});

module.exports = app;
