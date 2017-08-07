var map;

function initMap() {
  $.getJSON('/estabelecimentos', function(locations) {
    var estabelecimentoSugestoes = locations.map(function(estabelecimento) {
      return { value: estabelecimento.nome,
               data: { id: estabelecimento.id, type: "nome", coordenadas: estabelecimento.coordenadas }
             }
    });

    var validos = locations.filter(function(location) {
      return location.coordenadas.lat !== 0;
    });

    var ruaSugestoes = validos.map(function(estabelecimento) {
      return { value: estabelecimento.endereco.logradouro,
               data: { id: estabelecimento.id, type: "rua", coordenadas: estabelecimento.coordenadas }
             }
    });

    var sugestoes = [].concat(estabelecimentoSugestoes).concat(ruaSugestoes);

    $('#pac-input').autocomplete({
      lookup: sugestoes,
      noCache: true,
      onSelect: function (suggestion) {
        if(suggestion.data.type === "rua") {
          map.setZoom(18);
          map.setCenter(suggestion.data.coordenadas);
        } else {
          window.location.href = "/estabelecimentos/" + suggestion.data.id;
        }
      }
    });

    var zoomvar=8;
    if($(window).width()<700){
      zoomvar=6;
    }

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -7.2251168, lng: -36.4175412},
      zoom: zoomvar,
      scrollwheel: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true
    });

    var input = document.getElementById('pac-input');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var style =
    [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]

    var styledMapType = new google.maps.StyledMapType(style, {name: 'Styled Map'});

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    var validos = locations.filter(function(location) {
      return location.coordenadas.lat !== 0;
    })

    var markers = validos.map(function(location) {
      var marker = new google.maps.Marker({
        position: { lat: location.coordenadas.lat, lng: location.coordenadas.lng },
        label: location.nome
      });

      google.maps.event.addListener(marker, 'click', function() {
        window.location.href = "/estabelecimentos/" + location.id;
      });

      return marker;
    });

    var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: '/img/m'});
  });
}
