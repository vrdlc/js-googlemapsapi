var mapFunctions = require("./../js/map.js");

$(document).ready(function() {
google.maps.event.addDomListener(window, 'load', mapFunctions.initMap);
  $("#submitLocation").click(function(event) {
    event.preventDefault();
    address = $("#inputLocation").val();
    mapFunctions.inputLocation(address);
  });
  $("#delLast").click(function(event) {
    event.preventDefault();
    mapFunctions.deleteLastMarker();
  });
  $("#delAll").click(function(event) {
    event.preventDefault();
    mapFunctions.deleteMarkers();
  });

});
