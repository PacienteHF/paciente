var checkbox = true;
var rankingMelhores = {};
var rankingPiores = {};

var app = new Vue({
  el: '#fundoP3',
  data: {
    checkbox: checkbox,
    ranking: {
      presencaEquipe: [
        { nome: '', avgNota: 0 },
        { nome: '', avgNota: 0 },
        { nome: '', avgNota: 0 }
      ],
      tempoEspera: [
        { nome: '', avgNota: 0 },
        { nome: '', avgNota: 0 },
        { nome: '', avgNota: 0 }
      ],
      qualidadeAtendimento: [
        { nome: '', avgNota: 0 },
        { nome: '', avgNota: 0 },
        { nome: '', avgNota: 0 }
      ],
      medicamentos: [
        { nome: '', avgNota: 0 },
        { nome: '', avgNota: 0 },
        { nome: '', avgNota: 0 }
      ],
      equipamentos: [
        { nome: '', avgNota: 0 },
        { nome: '', avgNota: 0 },
        { nome: '', avgNota: 0 }
      ],
      infraestrutura: [
        { nome: '', avgNota: 0 },
        { nome: '', avgNota: 0 },
        { nome: '', avgNota: 0 }
      ]
    }
  },
  methods: {

  },
  mounted: function () {
    this.$http.get('/ranking', { params: { order: -1 } }).then(function(response) {
      console.log(response.body);
      rankingMelhores = response.body;
      if(checkbox) {
        this.ranking = rankingMelhores;
      }
    }, function(response) {
      console.log(response);
    });
    this.$http.get('/ranking', { params: { order: 1 } }).then(function(response) {
      console.log(response.body);
      rankingPiores = response.body;
      if(!checkbox) {
        this.ranking = rankingPiores;
      }
    }, function(response) {
      console.log(response);
    });
  }
})

$(document).ready(function(){
  $('#mudaropcao').change(function() {
    if(window.document.getElementById("fundoP3").name==="mais"){
      app.checkbox = true;
      app.ranking = rankingMelhores;

      $('#fundoP3').css("background-color", "#602341");
      $('.ranking01').css("background-color", "#602341");
      $('.ranking02').css("background-color", "#9f346c");

      window.document.getElementById("fundoP3").name="menos";
    }
    else {
      app.checkbox = false;
      app.ranking = rankingPiores;
        $('#fundoP3').css("background-color",  "#450726");
        $('.ranking01').css("background-color", "#9f346c");
        $('.ranking02').css("background-color", "#450726");

        window.document.getElementById("fundoP3").name="mais";
    }
  });
});
