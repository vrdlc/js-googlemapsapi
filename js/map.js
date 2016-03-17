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
  var location = event.latLng;
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
        optimized:false,
        icon: "./../img/bomb.gif",
        title: "300 casualites"
      });
      marker.setMap(map);
      marker.setAnimation(google.maps.Animation.DROP);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 2100);

      map.addListener('click', function(event) {
        exports.addMarker(event.latLng);

    });


    var infoWindow = new google.maps.InfoWindow( {
      content: "<br /><input type = 'button' value = 'Delete' onclick = 'DeleteMarker(" + marker.id + ");' value = 'Delete' />"
    });

    google.maps.event.addListener(marker, "click", function(event) {

      infoWindow.open(map, marker);
    });



      // google.maps.event.addListener(marker,'click',function() { // MAYBE CAN'T HAVE TWO CLICK LISTENERS AT ONCE, BUT THIS LETS YOU ZOOM ON A MARKER
      //   map.setZoom(20);
      //   map.setCenter(marker.getPosition());
      // });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
};

exports.addMarker = function(location) {
  var marker = new google.maps.Marker({
    position: location,
    optimized:false,
    icon: "./../img/bomb.gif",
    map: map,
    title: "300 casualites"

  });

  markers.push(marker);
  marker.setAnimation(google.maps.Animation.DROP);
  marker.id = markers.length;



  var infoWindow = new google.maps.InfoWindow( {
    content: "<br />"+marker.id+"<input type = 'button' value = 'Delete' class='delLast' data-id='" + marker.id + "' value = 'Delete' />"
  });

  google.maps.event.addListener(marker, "click", function(event) {

    infoWindow.open(map, marker);
    $(".delLast").click(function() {
      exports.deleteLastMarker($(this).attr('data-id'));
    });
  });

};

exports.deleteMarkers = function() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
};
exports.deleteLastMarker = function(id) {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].id == id) {
      markers[i].setMap(null);
    }
  }
};
