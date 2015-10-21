$(document).ready(function(){
handler = Gmaps.build('Google');
handler.buildMap({ provider: {}, internal: {id: 'map'}}, function(){
  markers = handler.addMarkers([
    {
      "lat": 40.0,
      "lng": -75.0,
      "picture": {
        "url": "https://addons.cdn.mozilla.net/img/uploads/addon_icons/13/13028-64.png",
        "width":  36,
        "height": 36
      },
      "infowindow": "hello!"
    }
  ]);
  handler.bounds.extendWith(markers);
  handler.fitMapToBounds();
  console.log("Working");
});

var map;
var markermap;

function initialize() {
  map = new google.maps.Map(document.getElementById('map'),{
  zoom: 9,
  center: {lat: 40.2627, lng: -74.7983},
  mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  markermap = new google.maps.Marker({
    position: {lat: 40.2627, lng: -74.7983},
    map: map,
    title: 'teacher name'
  });
}
console.log("Work 2");
google.maps.event.addDomListener(window, 'load', initialize);

});
