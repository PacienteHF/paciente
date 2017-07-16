var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  id: Number,
  nome: String,
  coordenadas: {
    lat: Number,
    lng: Number
  },
  endereco: {
    uf: String,
    municipio: String,
    bairro: String,
    numero: String,
    cep: String,
    logradouro: String
  },
  avaliacoes: {
    presencaEquipe: [{
      nota: Number,
      data: Date,
      turno: String,
      especialidade: String,
      respostaInstituicao: String,
      comentario: String
    }],
    tempoEspera: [{
      nota: Number,
      data: Date,
      turno: String,
      tempoEsperado: String,
      procedimentoMedico: String,
      especialidade: String,
      respostaInstituicao: String,
      comentario: String
    }],
    qualidadeAtendimento: [{
      nota: Number,
      data: Date,
      turno: String,
      comentario: String
    }],
    medicamentos: [{
      nota: Number,
      medicamento: String,
      respostaInstituicao: String,
      comentario: String
    }],
    equipamentos: [{
      nota: Number,
      equipamento: String,
      respostaInstituicao: String,
      comentario: String
    }],
    infraestrutura: [{
      nota: Number,
      comentario: String
    }]
  }
});

var Estabelecimento = mongoose.model("Estabelecimento", schema);

module.exports = Estabelecimento;
