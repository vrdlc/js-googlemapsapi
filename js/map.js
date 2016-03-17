var map;
var markers = [];

exports.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
  map.addListener('click', function(event) {
    exports.addMarker(event.latLng);
    console.log(map);
  });

};

exports.inputLocation = function(address) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latlng = results[0].geometry.location;
      var mapOptions = {
        zoom: 13,
        center: latlng
      };
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var marker = new google.maps.Marker( {
        position: latlng,
        icon: "./../img/face.png"
      });
      marker.setMap(map);
      marker.setAnimation(google.maps.Animation.DROP);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 2100);
      map.addListener('click', function(event) {
        exports.addMarker(event.latLng);
  });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
};

exports.addMarker = function(location) {
  var marker = new google.maps.Marker({
    position: location,
    icon: "./../img/face.png",
    map: map

  });
  markers.push(marker);
  marker.setAnimation(google.maps.Animation.DROP);
};

 exports.deleteMarkers = function() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

 exports.deleteLastMarker = function() {
  markers.pop();
  exports.initMap();
}
