var express = require("express");
var app = express();
var bodyParser = require("body-parser");

require("./models/connect")();

var router = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// dependencias do front-end
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/font-awesome', express.static(__dirname + '/node_modules/font-awesome/css/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/autocomplete', express.static(__dirname + '/node_modules/devbridge-autocomplete/dist/'));

app.use('/', router);

app.get("/", function(req, res) {
  res.render('index');
});

app.listen(3000, function() {
  console.log("Server Running!");
});
