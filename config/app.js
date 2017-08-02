var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    router = require('../routes/index'),
    Estabelecimento = require('../controllers/estabelecimento'),
    controller = require('../controllers/estabelecimento'),
    compression = require("compression"),
    helmet = require("helmet"),
    path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('./public'));
app.use(compression());
app.use(helmet());
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
app.use('/chardin.js', express.static('./node_modules/chardin.js/'));
app.use('/moment', express.static('./node_modules/moment/min/'));
app.use('/moment-timezone', express.static('./node_modules/moment-timezone/'));

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

app.get("/manual", function(req, res) {
  res.sendFile(path.resolve('public/manual.pdf'));
});

app.use(function(req, res, next) {
  res.render('404');
});

module.exports = app;
