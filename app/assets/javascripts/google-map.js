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
});



var info = $('#map-info').data('lon');
alert('you have lat: ' + info);

alert($('#map-info').data("lat"));


});



// function initialize() {
// // create an object (mapprop) to define map properties 
//   var mapProp = {
//     center:new google.maps.LatLng(40.2627, -74.7983),
//     zoom:9,
//     mapTypeId:google.maps.MapTypeId.ROADMAP
//   };
//  // create a map object to put inside div 
//   var map=new google.maps.Map(document.getElementById("map"),mapProp);

// var marker = new google.maps.Marker({
//   position: {lat: 40.58938, lng: -74.950828},
//   map: map
//   });

// var marker = new google.maps.Marker({
//   position: {lat: 40.509865, lng: -74.85489},
//   map: map
//   });

// var marker = new google.maps.Marker({
//   position: {lat: 40.290482, lng: -74.748971},
//   map: map
//   });

// // add event listener to load the map (initialize) when page is loaded
// google.maps.event.addDomListener(window, 'load', initialize);

// }
// });