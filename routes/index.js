var express = require('express');
var router = express.Router();
var estabelecimento = require('./estabelecimento');
var ranking = require('./ranking');

router.use('/estabelecimentos', estabelecimento);
router.use('/ranking', ranking);

module.exports = router;
