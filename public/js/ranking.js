var checkbox = true;
var rankingOriginal = {};
var rankingAtual = {};

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

function view(ranking, order) {
  return _.sortBy(ranking, function(i) { return i.avgNota * order; }).slice(0, 5);
}

function filtra(ranking, cidade) {
 return _.filter(ranking, function(o) { return o.cidade === cidade });
}

var app = new Vue({
  el: '#fundoP3',
  data: {
    filtro: null,
    checkbox: checkbox,
    ranking: {
      presencaEquipe: [],
      tempoEspera: [],
      qualidadeAtendimento: [],
      medicamentos: [],
      equipamentos: [],
      infraestrutura: []
    }
  },
  methods: {
    removeFiltro: function(e) {
      app.filtro = null;
      rankingAtual = clone(rankingOriginal);
      if(app.checkbox) {
        Object.keys(app.ranking).forEach(function(key) {
          app.ranking[key] = view(rankingAtual[key], -1);
        })
      } else {
        Object.keys(app.ranking).forEach(function(key) {
          app.ranking[key] = view(rankingAtual[key], 1);
        })
      }
      $('#cidades').val('');
    }
  },
  mounted: function () {
    // Inicia o ranking
    this.$http.get('/ranking', { params: { order: -1 } }).then(function(response) {
      rankingOriginal = clone(response.body);
      rankingAtual = clone(rankingOriginal);
      Object.keys(app.ranking).forEach(function(key) {
        app.ranking[key] = view(rankingAtual[key], -1);
      })
    }, function(response) {
      console.log(response);
    });
  }
})

$(document).ready(function(){
  $('#mudaropcao').change(function() {
    if(window.document.getElementById("fundoP3").name==="mais") {
      app.checkbox = true;
      // atualiza ranking
      Object.keys(app.ranking).forEach(function(key) {
        app.ranking[key] = view(rankingAtual[key], -1);
      })
      $('#fundoP3').css("background-color", "#602341");
      $('.ranking01').css("background-color", "#602341");
      $('.ranking02').css("background-color", "#9f346c");

      window.document.getElementById("fundoP3").name="menos";
    }
    else {
      app.checkbox = false;
      // atualiza ranking
      Object.keys(app.ranking).forEach(function(key) {
        app.ranking[key] = view(rankingAtual[key], 1);
      })
      $('#fundoP3').css("background-color",  "#450726");
      $('.ranking01').css("background-color", "#9f346c");
      $('.ranking02').css("background-color", "#450726");

      window.document.getElementById("fundoP3").name="mais";
    }
  });

  var cidades = [ {value: 'Campina Grande', data:'Campina Grande'},
                  {value: 'João Pessoa', data:'Joao Pessoa'},
                  {value: 'Malta', data:'Malta'} ]
  $('#cidades').autocomplete({
    lookup: cidades,
    noCache: true,
    onSelect: function (suggestion) {
      app.filtro = suggestion.data;
      rankingAtual = clone(rankingOriginal);
      //aplica filtro
      Object.keys(rankingAtual).forEach(function(key) {
        rankingAtual[key] = filtra(rankingAtual[key], suggestion.data);
      });
      //atualiza ranking
      if(app.checkbox) {
        Object.keys(app.ranking).forEach(function(key) {
          app.ranking[key] = view(rankingAtual[key], -1);
        })
      } else {
        Object.keys(app.ranking).forEach(function(key) {
          app.ranking[key] = view(rankingAtual[key], 1);
        })
      }
    }
  });
});
