var express = require('express');
var router = express.Router();
var estabelecimento = require('./estabelecimento');

router.use('/estabelecimentos', estabelecimento);

module.exports = router;
