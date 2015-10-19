
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery

//= require bootstrap-sprockets

//= require jquery.turbolinks

//= require jquery_ujs
//= require underscore
//= require turbolinks
//= require_tree .

// create a function to initialize the map
function initialize() {
// create an object (mapprop) to define map properties 
  var mapProp = {
    center:new google.maps.LatLng(40.2627, -74.7983),
    zoom:9,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
 // create a map object to put inside div 
  var map=new google.maps.Map(document.getElementById("map"),mapProp);

var marker = new google.maps.Marker({
  position: {lat: 40.58938, lng: -74.950828},
  map: map
  });

var marker = new google.maps.Marker({
  position: {lat: 40.509865, lng: -74.85489},
  map: map
  });

var marker = new google.maps.Marker({
  position: {lat: 40.290482, lng: -74.748971},
  map: map
  });

// add event listener to load the map (initialize) when page is loaded
google.maps.event.addDomListener(window, 'load', initialize);

}
});
