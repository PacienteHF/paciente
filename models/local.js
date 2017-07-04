var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/saude");
var schema = new mongoose.Schema({
    id: String,
    nome: String,
    endereco: String,
    faltaMedicos: [{
        nota: Number,
        especialidade: String,
        turno: String,
        porque: String,
        comentarios: String
    }],
    demoraAtendimento: [{
        nota: Number,
        especialidade: String,
        turno: String,
        tempoEspera: String,
        porque: String,
        comentarios: String
    }],
    faltaEquipamento: [{
        nota: Number,
        especialidade: String,
        exame: String,
        porque: String,
        comentarios: String
    }],
    faltaMedicamento: [{
        nota: Number,
        especialidade: String,
        medicamento: String,
        porque: String,
        comentarios: String
    }],
    infraestrutura: [{
        nota: Number,
        comentarios: String
    }]
})

var Data = mongoose.model("Data", schema);
/*
Data.create({
    id: "ChIJv3psy0gerAcRRutpmHr_fqk",
    nome: "Clipsi Hospital Geral",
    endereco: "R. Treze de Maio, 366 - Centro"
 }, function(err, data) {
     if (err) {
         console.log(err);
     } else {
         console.log("Data added!")
     }
 });

 Data.create({
     id: "ChIJY3va_jserAcRi4mf8r5oQNM",
     nome: "Hospital Antônio Targino",
     endereco: "R. Delmiro Gouvêia, 442 - Centenário"
 }, function(err, data) {
     if (err) {
         console.log(err);
     } else {
         console.log("Data added!")
     }
 });

 Data.create({
     id: "ChIJv6Ccy0AerAcRaLb4x0OnFOE",
     nome: "Hospital Universitário Alcides Carneiro",
     endereco: "R. Carlos Chagas, S/n - São José"
 }, function(err, data) {
     if (err) {
         console.log(err);
     } else {
         console.log("Data added!")
     }
 });

 Data.create({
    id: "ChIJK2R8VEcerAcRRlTWv0euM8U",
     nome: "Hospital Pedro I",
     endereco: "R. Dom Pedro I, 605 - São José"
 }, function(err, data) {
     if (err) {
         console.log(err);
     } else {
         console.log("Data added!")
     }
 });

 Data.create({
     id: "ChIJDzfx_zgerAcRs5tN1TtyQUk",
     nome: "Hospital da Criança e do Adolescente",
     endereco: "Av. Mal. Floriano Peixoto, 992 - Centenário"
 }, function(err, data) {
     if (err) {
        console.log(err);
     } else {
         console.log("Data added!")
     }
 });

 Data.create({
     id: "ChIJh89tgzUerAcR6ENQKIfnudo",
    nome: "Centro Hospitalar João XXIII",
     endereco: "R. Nilo Peçanha, 83 - Prata"
 }, function(err, data) {
     if (err) {
         console.log(err);
     } else {
         console.log("Data added!")
     }
 });

 Data.create({
     id: "",
     nome: "",
    endereco: ""
}, function(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("Data added!")
    }
 });*/

module.exports = Data;
