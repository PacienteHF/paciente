var map;

function initMap() {
  $.getJSON('/dados', function(locations) {

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -7.2251168, lng: -35.8975412},
      zoom: 10
    });

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
