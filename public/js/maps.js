// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;

function initMap() {
  var pyrmont = {lat: -7.2251168, lng: -35.8975412};

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 17
  });
  var service = new google.maps.places.PlacesService(map);

  var request = {
    location: pyrmont,
    radius: 1500,
    types: ['hospital']
  }

  service.nearbySearch(request, callback);
}

function callback(results, status, placeSearchPagination) {
  var ids = ['ChIJvbY00xkerAcRXPguitKadUk', 'ChIJWybZ1aMfrAcRjoN25Sp75z0',
              'ChIJ_YQCK8ofrAcRCWd-CyM27OQ', 'ChIJCxNKFAEerAcRe5H9K0P1o78',
              'ChIJY2G0eHenrgcR6xVgV4Ufwx0', 'ChIJ8d0iKregrgcRtFEz2GbKZnQ',
              'ChIJhUbwwIYdrAcR-tDjkRtskcg', 'ChIJK2R8VEcerAcRRlTWv0euM8U',
              'ChIJfX8veOegrgcRushXDaSlzTc', 'ChIJL-AIMWoerAcRUswKwa25R1g',
              'ChIJzeSIHpugrgcRQccWzzainlE', 'ChIJh89tgzUerAcR6ENQKIfnudo',
              'ChIJt3PxrZ2grgcRyJ4vwrvlHLo', 'ChIJY3va_jserAcRi4mf8r5oQNM',
              'ChIJww8J502nrgcR3imTBFDFFDg', 'ChIJK0matPcerAcRX4_HzVJ8A9Q',
              'ChIJNXJ72Q4erAcRu-ePI2kabfA', 'ChIJHQmH6NAfrAcR2laBoiUt6G0',
              'ChIJZQna_cwfrAcRIYUgAhaJLbU', 'ChIJv3psy0gerAcRRutpmHr_fqk',
              'ChIJRZygb-8drAcRopCGM3e_vp0', 'ChIJDzfx_zgerAcRs5tN1TtyQUk',
              'ChIJh97dVQAerAcRoHQ17Lmb4q8', 'ChIJv6Ccy0AerAcRaLb4x0OnFOE',
              'ChIJNSJaaLygrgcRsqg6q_9Q9M4', 'ChIJM7PTWaKgrgcRaSQ2W7_OAeU',
              'ChIJ1_WnqYigrgcRlLiLIWXREwA', 'ChIJye_la88frAcRHznQyHW5Tac',
              'ChIJVwY6__gerAcRm3ta683ZVY8', 'ChIJB7QbiaofrAcRgwv8OqGc2us',
              'ChIJQVv7URwfrAcRwwJW3WgmsZo', 'ChIJbTf1TaEfrAcRikpGsijXiOg',
              'ChIJ75Ch300erAcRGrIKcnjZJJg'];

  if (status === google.maps.places.PlacesServiceStatus.OK) {
    console.log(results.length);
    for (var i = 0; i < results.length; i++) {
      if (ids.indexOf(results[i].place_id) !== -1) {
        createMarker(results[i]);
      }
    }
  }

  if (placeSearchPagination && placeSearchPagination.hasNextPage) {
    placeSearchPagination.nextPage();
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    window.location.replace("http://localhost:3000/local/" + place.place_id);
    console.log(place);
  });
}
