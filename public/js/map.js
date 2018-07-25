// api key AIzaSyBLTHUijvmcGAzLH08FHYysIKWmLMgviNk

function initMap() {
  var myLatLng = { lat: 30.267153, lng: -97.743061 };

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: myLatLng
  });

  map.addListener("click", function(e) {
    placeMarkerAndPanTo(e.latLng, map);
  });
}

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  map.panTo(latLng);
  console.log(marker);
}
