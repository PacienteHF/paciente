var express = require('express');
var router = express.Router();
var controller = require('../controllers/estabelecimento');

router.route('/')
  .get(function(req, res) {
    var ranking = {};
    controller.getAvaliacoes("presencaEquipe", function(rankingPresenca) {
      ranking.presencaEquipe = rankingPresenca;
      controller.getAvaliacoes("tempoEspera", function(rankingEspera) {
        ranking.tempoEspera = rankingEspera;
        controller.getAvaliacoes("qualidadeAtendimento", function(rankingAtendimento) {
          ranking.qualidadeAtendimento = rankingAtendimento;
          controller.getAvaliacoes("medicamentos", function(rankingMedicamentos) {
            ranking.medicamentos = rankingMedicamentos;
            controller.getAvaliacoes("equipamentos", function(rankingEquipamentos) {
              ranking.equipamentos = rankingEquipamentos;
              controller.getAvaliacoes("infraestrutura", function(rankingInfraestrutura) {
                ranking.infraestrutura = rankingInfraestrutura;
                res.json(ranking);
              });
            });
          });
        });
      });
    });
  })

router.route("/:id")
  .get(function(req, res) {
    var nome;
    if (req.params.id === "presencaEquipe") {
      nome = "Presença de Profissionais de Saúde";
    } else if (req.params.id === "tempoEspera") {
      nome = "Tempo de Espera";
    } else if (req.params.id === "qualidadeAtendimento") {
      nome = "Qualidade do Atendimento";
    } else if (req.params.id === "medicamentos") {
      nome = "Disponibilidade de Medicamentos";
    } else if (req.params.id === "equipamentos") {
      nome = "Disponibilidade de Equipamentos";
    } else {
      nome = "Infraestrutura";
    }
    var order;
    if (req.query.order === 'true') {
      order = -1;
    } else {
      order = 1;
    }
    controller.getLista(req.params.id, order, req.query.cidade, function(ranking) {
      res.render('listaCompleta', {
        data: {
          ranking: ranking,
          nome: nome
        }
      });
    });
  })

module.exports = router;
