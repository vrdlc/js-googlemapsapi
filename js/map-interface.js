var callMap = require("./../js/map.js").initMap;

$(document).ready(function() {
google.maps.event.addDomListener(window, 'load', callMap);
});
