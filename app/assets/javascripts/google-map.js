$(document).ready(function(){ //1
  handler = Gmaps.build('Google');
  handler.buildMap ({ //4
      provider: {}, internal: {id: 'map'}
  }, //4
 
  function(){//2
    markers = handler.addMarkers([ //5
    { //3
      "lat": 0,
      "lng": 0,
      "picture": {
        "url": "https://addons.cdn.mozilla.net/img/uploads/addon_icons/13/13028-64.png",
        "width":  36,
        "height": 36
      }, //3
      "infowindow": "hello!"
    } //2
  ]); //5
  

  handler.bounds.extendWith(markers);
  handler.fitMapToBounds();
  console.log("Working");

  var map;
  var markermap;

  function initialize() { //6
  map = new google.maps.Map(document.getElementById('map'),{ //8.5
    zoom: 9,
    center: {lat: 40.2627, lng: -74.7983},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }); //8.5
  
 markermap = new google.maps.Marker({ //7
   position: [{lat: 40.58938, lng:-74.950828}, {lat: 40.509865, lng:-74.85489}, {lat: 40.290482, lng:-74.89971}, {lat: 40.36372, lng: -74.93388}]
//    map: 'map',
 }); //7

//var num = gon.num;
  console.log("XXXXXXXX " + gon.num);
  for (var i=0; i< gon.num; i++){
    console.log(gon.coordinates[i].lat, gon.coordinates[i].lng)
  }
}; //6

// function getPoints(){ //9
//   var pointsArr = [];
//   var coords;
//   for (var i = 0; i < gon.num; i++)
//     { //11
//       coords = new.google.maps.LatLng(gon.coordinates[i].lat, gon.coordinates[i].lng);  
//       // var marker = new.google.maps.Marker({ //10
//       pointsArr.push(point),
//       marker.setMap(map);
//     console.log(gon.coordinates[i].lat, gon.coordinates[i].lng)
//     }); //10
//     return pointsArr
//   } //11
 console.log("Work 2");
 google.maps.event.addDomListener(window, 'load', initialize);

// }; //9
}); //1
}); //1
