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
  el: '#p3rank',
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
    this.$http.get('/ranking').then(function(response) {
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
    if(window.document.getElementById("p3rank").name==="mais") {
      app.checkbox = true;
      // atualiza ranking
      Object.keys(app.ranking).forEach(function(key) {
        app.ranking[key] = view(rankingAtual[key], -1);
      })

      window.document.getElementById("p3rank").name="menos";
    }
    else {
      app.checkbox = false;
      // atualiza ranking
      Object.keys(app.ranking).forEach(function(key) {
        app.ranking[key] = view(rankingAtual[key], 1);
      })
      window.document.getElementById("p3rank").name="mais";
    }
  });

  var cidades = [{"value":"Cabedelo","data":"Cabedelo"},{"value":"Campina Grande","data":"Campina Grande"},{"value":"Joao Pessoa","data":"Joao Pessoa"},{"value":"Monteiro","data":"Monteiro"},{"value":"Sousa","data":"Sousa"},{"value":"Mari","data":"Mari"},{"value":"Paulista","data":"Paulista"},{"value":"Santa Rita","data":"Santa Rita"},{"value":"Patos","data":"Patos"},{"value":"Queimadas","data":"Queimadas"},{"value":"Bayeux","data":"Bayeux"},{"value":"Fagundes","data":"Fagundes"},{"value":"Igaracy","data":"Igaracy"},{"value":"Gado Bravo","data":"Gado Bravo"},{"value":"Montadas","data":"Montadas"},{"value":"Alhandra","data":"Alhandra"},{"value":"Tacima","data":"Tacima"},{"value":"Agua Branca","data":"Agua Branca"},{"value":"Desterro","data":"Desterro"},{"value":"Cajazeirinhas","data":"Cajazeirinhas"},{"value":"Barra De Santana","data":"Barra De Santana"},{"value":"Olivedos","data":"Olivedos"},{"value":"Sao Jose Do Sabugi","data":"Sao Jose Do Sabugi"},{"value":"Serido","data":"Serido"},{"value":"Sossego","data":"Sossego"},{"value":"Mogeiro","data":"Mogeiro"},{"value":"Cajazeiras","data":"Cajazeiras"},{"value":"Brejo Dos Santos","data":"Brejo Dos Santos"},{"value":"Cacimba De Dentro","data":"Cacimba De Dentro"},{"value":"Matureia","data":"Matureia"},{"value":"Pilar","data":"Pilar"},{"value":"Itaporanga","data":"Itaporanga"},{"value":"Juripiranga","data":"Juripiranga"},{"value":"Pombal","data":"Pombal"},{"value":"Lucena","data":"Lucena"},{"value":"Puxinana","data":"Puxinana"},{"value":"Santo Andre","data":"Santo Andre"},{"value":"Itatuba","data":"Itatuba"},{"value":"Juazeirinho","data":"Juazeirinho"},{"value":"Santana De Mangueira","data":"Santana De Mangueira"},{"value":"Teixeira","data":"Teixeira"},{"value":"Belem Do Brejo Do Cruz","data":"Belem Do Brejo Do Cruz"},{"value":"Barauna","data":"Barauna"},{"value":"Juru","data":"Juru"},{"value":"Cachoeira Dos Indios","data":"Cachoeira Dos Indios"},{"value":"Sao Sebastiao Do Umbuzeiro","data":"Sao Sebastiao Do Umbuzeiro"},{"value":"Caapora","data":"Caapora"},{"value":"Juarez Tavora","data":"Juarez Tavora"},{"value":"Gurinhem","data":"Gurinhem"},{"value":"Pianco","data":"Pianco"},{"value":"Mato Grosso","data":"Mato Grosso"},{"value":"Riachao","data":"Riachao"},{"value":"Santa Ines","data":"Santa Ines"},{"value":"Boa Ventura","data":"Boa Ventura"},{"value":"Cabaceiras","data":"Cabaceiras"},{"value":"Amparo","data":"Amparo"},{"value":"Rio Tinto","data":"Rio Tinto"},{"value":"Sao Sebastiao De Lagoa De Roca","data":"Sao Sebastiao De Lagoa De Roca"},{"value":"Imaculada","data":"Imaculada"},{"value":"Conceicao","data":"Conceicao"},{"value":"Umbuzeiro","data":"Umbuzeiro"},{"value":"Pitimbu","data":"Pitimbu"},{"value":"Alagoa Grande","data":"Alagoa Grande"},{"value":"Barra De Sao Miguel","data":"Barra De Sao Miguel"},{"value":"Lastro","data":"Lastro"},{"value":"Aroeiras","data":"Aroeiras"},{"value":"Alagoa Nova","data":"Alagoa Nova"},{"value":"Alcantil","data":"Alcantil"},{"value":"Algodao De Jandaira","data":"Algodao De Jandaira"},{"value":"Aparecida","data":"Aparecida"},{"value":"Aracagi","data":"Aracagi"},{"value":"Araruna","data":"Araruna"},{"value":"Areia De Baraunas","data":"Areia De Baraunas"},{"value":"Baia Da Traicao","data":"Baia Da Traicao"},{"value":"Assuncao","data":"Assuncao"},{"value":"Barra De Santa Rosa","data":"Barra De Santa Rosa"},{"value":"Belem","data":"Belem"},{"value":"Boa Vista","data":"Boa Vista"},{"value":"Bernardino Batista","data":"Bernardino Batista"},{"value":"Bom Jesus","data":"Bom Jesus"},{"value":"Bom Sucesso","data":"Bom Sucesso"},{"value":"Brejo Do Cruz","data":"Brejo Do Cruz"},{"value":"Borborema","data":"Borborema"},{"value":"Bonito De Santa Fe","data":"Bonito De Santa Fe"},{"value":"Cacimba De Areia","data":"Cacimba De Areia"},{"value":"Cacimbas","data":"Cacimbas"},{"value":"Caicara","data":"Caicara"},{"value":"Capim","data":"Capim"},{"value":"Caraubas","data":"Caraubas"},{"value":"Carrapateira","data":"Carrapateira"},{"value":"Casserengue","data":"Casserengue"},{"value":"Catingueira","data":"Catingueira"},{"value":"Catole Do Rocha","data":"Catole Do Rocha"},{"value":"Condado","data":"Condado"},{"value":"Conde","data":"Conde"},{"value":"Coxixola","data":"Coxixola"},{"value":"Cruz Do Espirito Santo","data":"Cruz Do Espirito Santo"},{"value":"Cuite De Mamanguape","data":"Cuite De Mamanguape"},{"value":"Damiao","data":"Damiao"},{"value":"Curral De Cima","data":"Curral De Cima"},{"value":"Diamante","data":"Diamante"},{"value":"Curral Velho","data":"Curral Velho"},{"value":"Dona Ines","data":"Dona Ines"},{"value":"Esperanca","data":"Esperanca"},{"value":"Frei Martinho","data":"Frei Martinho"},{"value":"Inga","data":"Inga"},{"value":"Itapororoca","data":"Itapororoca"},{"value":"Itabaiana","data":"Itabaiana"},{"value":"Jacarau","data":"Jacarau"},{"value":"Lagoa","data":"Lagoa"},{"value":"Lagoa De Dentro","data":"Lagoa De Dentro"},{"value":"Logradouro","data":"Logradouro"},{"value":"Malta","data":"Malta"},{"value":"Manaira","data":"Manaira"},{"value":"Massaranduba","data":"Massaranduba"},{"value":"Marcacao","data":"Marcacao"},{"value":"Mataraca","data":"Mataraca"},{"value":"Mulungu","data":"Mulungu"},{"value":"Nazarezinho","data":"Nazarezinho"},{"value":"Nova Floresta","data":"Nova Floresta"},{"value":"Nova Palmeira","data":"Nova Palmeira"},{"value":"Olho D'agua","data":"Olho D'agua"},{"value":"Parari","data":"Parari"},{"value":"Passagem","data":"Passagem"},{"value":"Pedra Branca","data":"Pedra Branca"},{"value":"Pedra Lavrada","data":"Pedra Lavrada"},{"value":"Pedras De Fogo","data":"Pedras De Fogo"},{"value":"Picui","data":"Picui"},{"value":"Pedro Regis","data":"Pedro Regis"},{"value":"Piloes","data":"Piloes"},{"value":"Piloezinhos","data":"Piloezinhos"},{"value":"Pocinhos","data":"Pocinhos"},{"value":"Poco Dantas","data":"Poco Dantas"},{"value":"Remigio","data":"Remigio"},{"value":"Riachao Do Bacamarte","data":"Riachao Do Bacamarte"},{"value":"Riachao Do Poco","data":"Riachao Do Poco"},{"value":"Riacho De Santo Antonio","data":"Riacho De Santo Antonio"},{"value":"Santa Cecilia","data":"Santa Cecilia"},{"value":"Riacho Dos Cavalos","data":"Riacho Dos Cavalos"},{"value":"Santa Cruz","data":"Santa Cruz"},{"value":"Santa Helena","data":"Santa Helena"},{"value":"Santa Luzia","data":"Santa Luzia"},{"value":"Santa Teresinha","data":"Santa Teresinha"},{"value":"Santana Dos Garrotes","data":"Santana Dos Garrotes"},{"value":"Santarem","data":"Santarem"},{"value":"Sao Bento","data":"Sao Bento"},{"value":"Sao Bentinho","data":"Sao Bentinho"},{"value":"Sao Domingos","data":"Sao Domingos"},{"value":"Sao Domingos Do Cariri","data":"Sao Domingos Do Cariri"},{"value":"Sao Francisco","data":"Sao Francisco"},{"value":"Sao Joao Do Rio Do Peixe","data":"Sao Joao Do Rio Do Peixe"},{"value":"Sao Jose Da Lagoa Tapada","data":"Sao Jose Da Lagoa Tapada"},{"value":"Sao Jose De Piranhas","data":"Sao Jose De Piranhas"},{"value":"Sao Jose De Princesa","data":"Sao Jose De Princesa"},{"value":"Sao Joao Do Tigre","data":"Sao Joao Do Tigre"},{"value":"Sao Jose De Caiana","data":"Sao Jose De Caiana"},{"value":"Sao Jose Do Bonfim","data":"Sao Jose Do Bonfim"},{"value":"Sao Jose Do Brejo Do Cruz","data":"Sao Jose Do Brejo Do Cruz"},{"value":"Sao Jose Dos Ramos","data":"Sao Jose Dos Ramos"},{"value":"Sao Mamede","data":"Sao Mamede"},{"value":"Sao Miguel De Taipu","data":"Sao Miguel De Taipu"},{"value":"Sape","data":"Sape"},{"value":"Serra Da Raiz","data":"Serra Da Raiz"},{"value":"Serra Grande","data":"Serra Grande"},{"value":"Serraria","data":"Serraria"},{"value":"Sertaozinho","data":"Sertaozinho"},{"value":"Sobrado","data":"Sobrado"},{"value":"Solanea","data":"Solanea"},{"value":"Soledade","data":"Soledade"},{"value":"Sume","data":"Sume"},{"value":"Tavares","data":"Tavares"},{"value":"Taperoa","data":"Taperoa"},{"value":"Tenorio","data":"Tenorio"},{"value":"Triunfo","data":"Triunfo"},{"value":"Uirauna","data":"Uirauna"},{"value":"Vista Serrana","data":"Vista Serrana"},{"value":"Vieiropolis","data":"Vieiropolis"},{"value":"Zabele","data":"Zabele"},{"value":"Princesa Isabel","data":"Princesa Isabel"},{"value":"Ibiara","data":"Ibiara"},{"value":"Areial","data":"Areial"},{"value":"Bananeiras","data":"Bananeiras"},{"value":"Natuba","data":"Natuba"},{"value":"Nova Olinda","data":"Nova Olinda"},{"value":"Boqueirao","data":"Boqueirao"},{"value":"Prata","data":"Prata"},{"value":"Caldas Brandao","data":"Caldas Brandao"},{"value":"Camalau","data":"Camalau"},{"value":"Pirpirituba","data":"Pirpirituba"},{"value":"Poco De Jose De Moura","data":"Poco De Jose De Moura"},{"value":"Salgado De Sao Felix","data":"Salgado De Sao Felix"},{"value":"Caturite","data":"Caturite"},{"value":"Coremas","data":"Coremas"},{"value":"Cubati","data":"Cubati"},{"value":"Guarabira","data":"Guarabira"},{"value":"Cuite","data":"Cuite"},{"value":"Cuitegi","data":"Cuitegi"},{"value":"Sao Joao Do Cariri","data":"Sao Joao Do Cariri"},{"value":"Sao Jose De Espinharas","data":"Sao Jose De Espinharas"},{"value":"Duas Estradas","data":"Duas Estradas"},{"value":"Sao Jose Dos Cordeiros","data":"Sao Jose Dos Cordeiros"},{"value":"Serra Branca","data":"Serra Branca"},{"value":"Serra Redonda","data":"Serra Redonda"},{"value":"Junco Do Serido","data":"Junco Do Serido"},{"value":"Lagoa Seca","data":"Lagoa Seca"},{"value":"Gurjao","data":"Gurjao"},{"value":"Jerico","data":"Jerico"},{"value":"Varzea","data":"Varzea"},{"value":"Aguiar","data":"Aguiar"},{"value":"Alagoinha","data":"Alagoinha"},{"value":"Livramento","data":"Livramento"},{"value":"Mae D'agua","data":"Mae D'agua"},{"value":"Mamanguape","data":"Mamanguape"},{"value":"Arara","data":"Arara"},{"value":"Areia","data":"Areia"},{"value":"Marizopolis","data":"Marizopolis"},{"value":"Matinhas","data":"Matinhas"},{"value":"Quixaba","data":"Quixaba"},{"value":"Congo","data":"Congo"},{"value":"Monte Horebe","data":"Monte Horebe"},{"value":"Ouro Velho","data":"Ouro Velho"}]

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
