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
    presencaMedicos: [{
      nota: Number,
      especialidade: String,
      turno: String,
      justificativa: String,
      comentario: String
    }],
    atendimentos: [{
      nota: Number,
      especialidade: String,
      turno: String,
      tempoEspera: String,
      justificativa: String,
      comentario: String
    }],
    equipamentos: [{
      nota: Number,
      dispositivo: String,
      exame: String,
      justificativa: String,
      comentario: String
    }],
    medicamentos: [{
      nota: Number,
      especialidade: String,
      medicamento: String,
      justificativa: String,
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
