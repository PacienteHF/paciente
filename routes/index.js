var express = require('express');
var router = express.Router();
var estabelecimento = require('./estabelecimento');

router.use(estabelecimento);

module.exports = router;
