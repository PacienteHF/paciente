var map;

function initMap() {
  $.getJSON('/dados', function(locations) {

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -7.2251168, lng: -35.8975412},
      zoom: 7
    });

    var style =
    [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]

    var styledMapType = new google.maps.StyledMapType(style, {name: 'Styled Map'});

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    var markers = locations.map(function(location) {
      return new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        label: location.nome
      });
    });

    // markers.forEach(function(marker) {
    //   google.maps.event.addListener(marker, 'click', function() {
    //     window.location.replace("http://localhost:3000/local/" + marker.id);
    //     console.log(place);
    //   });
    // });

    var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m'});
  });
}
