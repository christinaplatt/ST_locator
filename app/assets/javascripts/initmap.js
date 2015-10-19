/*! Google Maps jQuery plugin - v1.0.6 - 2013-06-23
* http://jeromesmadja.github.io/initmapjs/
* 2013 Jerome Smadja; Licensed MIT */
;( function( $ )
{
    'use strict';

    var gmap = google.maps;

    function Map()
    {
        var self = this,
            map;

        /**
         * Keep track of the markers on the map
         *
         * @type {array}
         */
        self.marker_collection = [];

        /**
         * Merge user options into the default options
         * Display the map
         *
         * @param  {object} user_options
         *
         * @return {object} instance of itself
         */
        self.init = function( user_options )
        {
            var current_element = this[0],
                default_options = {
                    options: {
                        center: new LatLng( 0 , 0 ).get(),
                        zoom : 2,
                        mapTypeId: new MapTypeId().get( 'hybrid' )
                    }
                };

            // Map Controls ( need to be set before the init function)
            if ( user_options !== undefined && user_options.controls )
            {
               $.extend( default_options.options ,  new Controls( user_options.controls ) );
            }

            // Merge default settings into user options
            var settings = $.extend( true , default_options , user_options );

            // Initialise the map with default options
            map = self.initMap( current_element ,  default_options.options );

             // Geolocation
            if ( settings.geolocation ) { 
                self.marker_collection.geolocation_marker = { deferred: $.Deferred() };
                new Geolocation( map,  settings.geolocation , self.marker_collection.geolocation_marker , settings.center ).init();
            }

            // Set center
            if ( settings.center ) { Helpers.center( map , settings.center ); }

            // Set map type
            if ( settings.type ) { map.setMapTypeId( new MapTypeId().get( settings.type ) ); }

            // Markers
            if ( settings.markers ) {  self.markers.add( settings.markers ); }

            return self;
        };

        /**
         * Initialise the  map
         *
         * @param  {object} current HtmlElement where the map will be inserted
         * @param  {object} options
         *
         * @return {object} Google Maps object
         */
        self.initMap = function( current_element , options )
        {
            return new gmap.Map( current_element, options );
        };

        /**
         * Get the current map
         *
         * @return {object} Google Maps object
         */
        self.getMap = function()
        {
            return map;
        };

        /**
         * Markers API
         * - get: get a specific marker on the map
         * - add: add markers to the map
         * - remove: remove a specific marker from the map
         * - all: get all the markers on the map
         * 
         * @type {object}
         */
        self.markers = 
        {    
            /**
             * Get a marker based on its unique key, and pass it to the callback handler
             *
             * @param  {string}   marker_id  Unique key that identifies the marker
             * @param  {function} callback   Handler that passes the marker retrieved as first parameter
             *
             * @return {void}
             */
            get: function ( marker_id , callback ) 
            {
                if ( self.markers.exists( marker_id ) ) 
                {
                    self.marker_collection[ marker_id ].deferred.done(function () {
                        callback.call( this , self.marker_collection[ marker_id ].marker );
                    });
                }
            },

            /**
             * Remove a marker from the map
             *
             * @param  {string} marker_id  The unique key of the marker to be removed
             *
             * @return {void}
             */
            remove: function ( marker_id ) 
            {
                if ( self.markers.exists( marker_id ) )
                {
                    self.marker_collection[ marker_id ].deferred.done( function () 
                    {
                         var marker = self.marker_collection[ marker_id ].marker;
                         marker.setMap(null); 
                         delete self.marker_collection[ marker_id ];
                     });
                }
            },

            /**
             * Get all the markers on the map
             *
             * @param  {function} callback  Handler function with the marker array as the only parameter 
             *
             * @return {void}
             */
            all: function ( callback ) 
            {
                var keys = Helpers.getKeys( self.marker_collection ),
                    markers = {}, 
                    marker_deferred = [];

                // Loop through the keys of the marker collection 
                // to get the deferred object for each marker
                $.map( keys, function ( marker_id ) 
                {
                    marker_deferred.push( self.marker_collection[ marker_id ].deferred );
                });

                // Once all the markers have been placed,
                // and oop through the collection to return each marker.
                // We don't return the deferred objects,
                // so the array is only containing google maps markers objecy
                $.when.apply( self, marker_deferred ).done(function () 
                {
                    $.map( keys, function ( id ) 
                    {
                        // Check that the marker still exists, 
                        // it might have been deleted by the user
                        if ( self.marker_collection[ id ] !== undefined )
                        {
                            markers[ id ] = self.marker_collection[ id ].marker;
                        }
                    });
                    callback.call( self, markers );
                });
            },

            /**
             * Add markers to the map
             *
             * @param  {objectt} markers  An object containing the markers that need to be paced on the map
             *
             * @return {void}
             */
            add: function ( markers ) 
            {
                $.map( markers, function ( marker , marker_id ) 
                {
                    self.marker_collection[ marker_id ] = { deferred: $.Deferred() };
                    var deferred = new Marker( map , marker_id , marker, new InfoWindow( map , new Event() ), new Animation() ).place( self.marker_collection[ marker_id ].deferred );
                    deferred.done(function ( current_marker) {
                        self.marker_collection[ marker_id ] = {
                            deferred: deferred,
                            marker: current_marker
                        };
                    });
                });
            },

            /**
             * Checks if a marker exists on the map
             *
             * @param  {string} marker_id
             *
             * @return {bool} False if it doesn't exist or true if it does
             */
            exists: function ( marker_id ) 
            {
                if ( self.marker_collection[ marker_id ] === undefined )
                {
                    return $.error('Marker id "' + marker_id + '" does not exist');
                }
                return true;
            }
        };
    }

    /**
     * Initialize the plugin
     *
     * The plugin returns an instance of Map()
     * so we can access its methods instead of returning the jQuery object
     *
     * @return {object}
     */
    $.fn.initMap = function()
    {
        if ( !this.length ) { $.error('There is no element "' + this.selector +'"'); }

        // Define the user options
        var user_options = arguments,
            maps = [];
        // Loop through the selected element(s)
        this.each( function()
        {
            maps.push( new Map().init.apply( $(this), user_options ) );
        });

        // If only 1 element in the array return the element itself, so we don't have to carry [0]
        if ( maps.length === 1 )
        {
            maps[0].length = 1;
            maps = maps[0];
        }
        return maps;
    };

    /**
     * Wrapper of google.maps.Geocoder
     * https://developers.google.com/maps/documentation/javascript/reference#Geocoder
     *
     * Geocoder constructor
     *
     * @param  {string} position
     */
    function Geocoder( position )
    {
        this.gGeocoder = gmap.Geocoder;
        this.position = position;
    }
    /**
     * Sends a request to google servers to get the geolocation from an address
     *
     * @return {object} Promise
     *
     */
    Geocoder.prototype.getGeocode = function()
    {
        var deferred = $.Deferred();
        new this.gGeocoder().geocode( { 'address': this.position } , function( results , status )
        {
            if ( status === 'OK' ) { deferred.resolve( results ); }
            else { deferred.reject( status ); }
        });
        return deferred.promise();
    };

    /**
     * Marker module
     * Wrapper of google.maps.Marker
     * https://developers.google.com/maps/documentation/javascript/reference#Marker
     *
     * @param {string}      id          Marker id so we can retrieve it
     * @param {object}      marker      Marker options
     * @param {function}    InfoWindow  Infowindow Module
     * @param {function}    Animation   Animation Module
     *
     */
    function Marker( map, id , marker , InfoWindow ,  Animation )
    {
       

        // Marker Options
        this.id = id;

        if ( typeof marker !== 'undefined' )
        {
            this.map            = map;
            this.options        = marker.options !== undefined ? marker.options : {};
            this.position       = marker.position;
            this.title          = marker.title;
            this.info_window    = marker.info_window;
            this.animation      = marker.animation;
        }
        // google maps markers
        this.GMarker = gmap.Marker;

        // Infowindow property
        this.Infowindow = InfoWindow;

        // Animation property
        this.Animation = Animation;

        // Animation
        if ( this.animation !== undefined ) 
        { 
            this.options.animation = this.animate(); 
        }
    }

    /**
     * Animation option
     *
     * @param  {string} animation_type The animation type 'bounce' or 'drop'
     *
     * @return {mixed}  Constant from Google Maps for BOUNCE and DROP animation,
     *                  or false if an incorrect string has been passed
     */
    Marker.prototype =
    {
         animate: function () {
            return this.Animation.start( this.animation );
        },

        /**
         * Info Window option
         *
         * @param  {object} info_window_options Options such as 'content', 'disableAutoPan', ...
         * @param  {object} marker              Google Maps Marker object, use to attach the info window to the marker
         *
         * @return {void}
         */
        infowindow: function ( info_window_options, marker ) 
        {
            var current_infowindow = this.Infowindow.add( info_window_options ),
                open_event = "click";

            if ( typeof info_window_options.showOn === 'string' )
            {
                open_event = info_window_options.showOn;
            }
            this.Infowindow.attachMarker( marker , open_event , current_infowindow );

            if ( typeof info_window_options.hideOn === 'string' )
            {
                if ( info_window_options.hideOn === "click" ) { $.error('"click" event can not be used for closing infowindow'); }
                this.Infowindow.close( marker , info_window_options.hideOn, current_infowindow );
            } 

        },

        /**
         * Check if the marker position is a string or an object, and place it accordingly on the map
         * - If marker.position is a string then we use Google Geocoder to retrieve the geolocation
         * - If marker.position is an object then we use latitude and longitude that have been passed
         *
         * @param  {object} deferred jQuery Deferred object
         *
         * @return {void}
         */
        place : function( deferred )
        {
            if ( typeof this.position === 'object' )
            {
                var coordinates = new LatLng( this.position[0] , this.position[1] ).get();
                var marker = new this.GMarker( $.extend( this.options , { map : this.map , position : coordinates }) );
                deferred.resolve( marker );
                this.setOptions( marker );
            }

            if ( typeof this.position === 'string' )
            {
                var self = this;
                new Geocoder( self.position ).getGeocode().done( function( results )
                {
                    var coordinates = results[0].geometry.location;
                    var marker = new self.GMarker( $.extend( self.options , { map : self.map , position : coordinates }) );
                    deferred.resolve( marker );
                    self.setOptions( marker );
                })
                .fail( function( status )
                {
                    deferred.reject( status );
                });
            }
            return deferred;
        },

        /**
         * Create the marker on the map
         *
         * @param  {object} coordinates Google Maps LatLng object
         *
         * @return {object} Returns Google Maps Marker object
         */
        createMarker: function ( coordinates ) {
            var current_marker = new this.GMarker( $.extend( this.options, { map: this.map, position: coordinates }));
            this.setOptions( current_marker );
            return current_marker;
        },

        /**
         * Set the marker options, such as infowindow, animation, and probably other things in the future
         *
         * @param {marker} marker Google Maps Marker object
         *
         * @return {void} 
         */
        setOptions : function( marker )
        {
            if ( this.info_window !== undefined )
            {
                this.infowindow( this.info_window, marker );
            }
        }
    };

    /**
     * InfoWindow module
     * Wrapper of google.maps.InfoWindow
     * https://developers.google.com/maps/documentation/javascript/reference#InfoWindow
     *
     * @param {object} map      current gmap
     * @param {object} gEvent [description]
     */
    function InfoWindow( map,  gEvent )
    {
        this.GInfoWindow = gmap.InfoWindow;
        this.gEvent = gEvent;
        this.map = map;
    }

    InfoWindow.prototype =
    {
        add : function( info_window_options )
        {
            if ( info_window_options === undefined ) { return; }

            var info = new this.GInfoWindow( info_window_options );
            // closeclick event
            if ( typeof info_window_options.closeclick === 'function' ) { this.attachEvent( info , 'closeclick' , info_window_options ); }
            // content_changed event
            if ( typeof info_window_options.content_changed === 'function' ) { this.attachEvent( info , 'content_changed' , info_window_options ); }
            // domready event
            if ( typeof info_window_options.domready === 'function' ) { this.attachEvent( info , 'domready' , info_window_options ); }
            // position_changed event
            if ( typeof info_window_options.position_changed === 'function' ) { this.attachEvent( info , 'position_changed' , info_window_options ); }
            // zindex_changed event
            if ( typeof info_window_options.zindex_changed === 'function' ) { this.attachEvent( info , 'zindex_changed' , info_window_options ); }

            return info;
        },
        /**
         * Attach event listener to the infowindow
         * and call the callback function when event is fired
         *
         * @param  {object} elem                Google Maps Infowindow object
         * @param  {string} event               Event name
         * @param  {object} info_window_options Infowindow options
         *
         * @return {object} Returns Google Maps Infowindow object
         */
        attachEvent : function( elem , event , info_window_options )
        {
            var map = this.map;
            this.gEvent.addListener( elem , event , function()
            {
                info_window_options[ event ].call( elem , map );
            });
            return elem;
        },

        /**
         * Attach the infowindow to a marker,
         * open/close are based on showOn, hideOn attributes
         *
         * @param  {object} elem       Marker to attach the infowindow to
         * @param  {string} event      Event name
         * @param  {object} infowindow Google Maps Infowindow object
         *
         * @return {object} Returns Google Maps Infowindow object
         */
        attachMarker : function( elem , event , infowindow )
        {
            var map = this.map;
            this.gEvent.addListener( elem , event , function()
            {
                infowindow.open( map , elem );
            });
            return elem;
        },

        /**
         * Close infowindow
         *
         * @param  {object} elem       Google Maps Infowindow object
         * @param  {string} event      Event name
         * @param  {object} infowindow Google Maps Infowindow object
         *
         * @return {void}
         */
        close : function( elem , event , infowindow  )
        {
            this.gEvent.addListener( elem , event , function() {
                infowindow.close();
            });
        }
    };

    /**
     * Animation module
     *
     * Wrapper of google.maps.Animation
     * https://developers.google.com/maps/documentation/javascript/reference#Animation
     */
    function Animation()
    {
        this.GAnimation = gmap.Animation;
    }

    Animation.prototype =
    {
        start : function( animation )
        {
            if ( animation === 'bounce')  { return this.GAnimation.BOUNCE; }
            if ( animation === 'drop')    { return this.GAnimation.DROP; }
            return false;
        },
        stop : function( marker )
        {
            marker.setAnimation( null );
        }
    };

    /**
     * google.maps.LatLng class
     * https://developers.google.com/maps/documentation/javascript/reference#LatLng
     */
    function LatLng( lat , lng , nowrap )
    {
        this.GLatLng = gmap.LatLng;
        this.lat = lat;
        this.lng = lng;
        this.nowrap = nowrap;
    }
    LatLng.prototype.get = function()
    {
        return new this.GLatLng( this.lat , this.lng , this.nowrap );
    };

    /**
     * Event wrapper
     * Probably will be adding more stuff to it in the future,
     * for now just return the google maps event object
     *
     */
    function Event()
    {
        return gmap.event;
    }

    /**
     * Map Type Module
     * Wrapper of google.maps.MapTypeId
     * https://developers.google.com/maps/documentation/javascript/reference#MapTypeId
     */
    function MapTypeId()
    {
        this.map_type_id = gmap.MapTypeId;
    }
    MapTypeId.prototype.get = function ( type ) {
        if ( type === 'hybrid')     {   return this.map_type_id.HYBRID; }
        if ( type === 'satellite')  {   return this.map_type_id.SATELLITE; }
        if ( type === 'roadmap')    {   return this.map_type_id.ROADMAP; }
        return this.map_type_id.TERRAIN;
    };

    /**
     * Helper function to set all the controls based on user settings
     *
     * @param {object} settings Control settings
     *
     * @return {object} user_options
     */
    var Controls = function( settings )
    {
        var user_options = {};

        /**
         * Set Map Type
         */
        if ( settings.map_type )
        {
            if ( typeof settings.map_type === 'boolean' )
            {
                user_options.mapTypeControl = settings.map_type;
            }
            if ( typeof settings.map_type === 'object' )
            {
                user_options.mapTypeControlOptions = new MapTypeControlOptions( settings.map_type , new MapTypeId() , new ControlPosition() , new MapTypeControlStyle() );
            }
        }

        /**
         * Set overview constrol
         */
        if ( settings.overview !== undefined )
        {
            if ( typeof settings.overview === 'boolean' )
            {
                user_options.overviewMapControl = settings.overview;
            }
            if ( typeof settings.overview === 'object' )
            {
                user_options.overviewMapControl = true;
                user_options.overviewMapControlOptions = { opened : settings.overview.opened };
            }
        }

        /**
         * Set pan control
         */
        if ( settings.pan !== undefined )
        {
            if ( typeof settings.pan === 'boolean' )
            {
                user_options.panControl = settings.pan;
            }
            if ( typeof settings.pan === 'object' )
            {
                user_options.panControlOptions =   new ControlPosition().get( settings.pan.position );
            }
        }

        /**
         * Set rotate constrol
         */
        if ( settings.rotate !== undefined )
        {
            if ( typeof settings.rotate === 'boolean' )
            {
                user_options.rotateControl = settings.rotate;
            }
            if ( typeof settings.rotate === 'object' )
            {
                user_options.rotateControlOptions =  new ControlPosition().get( settings.rotate.position );
            }
        }

        /**
         * Set scale control
         */
        if ( settings.scale !== undefined )
        {
            if ( typeof settings.scale === 'boolean' )
            {
                user_options.scaleControl = settings.scale;
            }
            if ( typeof settings.scale === 'object' )
            {
                user_options.scaleControlOptions =  new ControlPosition().get( settings.scale.position );
            }
        }

        /**
         * Set street view control
         */
        if ( settings.street_view !== undefined )
        {
            if ( typeof settings.street_view === 'boolean' )
            {
                user_options.streetViewControl = settings.street_view;
            }
            if ( typeof settings.street_view === 'object' )
            {
                user_options.streetViewControlOptions =  new ControlPosition().get( settings.street_view.position );
            }
        }

        /**
         * Set zoom control
         */
        if ( settings.zoom !== undefined )
        {
            if ( typeof settings.zoom === 'boolean' )
            {
                user_options.zoomControl = settings.zoom;
            }
            if ( typeof settings.zoom === 'object' )
            {
                user_options.zoomControlOptions = new ControlPosition().get( settings.zoom.position );
                if ( settings.zoom.style !== undefined )
                {
                    user_options.zoomControlOptions.style =  new ZoomControlStyle().get( settings.zoom.style );
                }
            }
        }
        return user_options;
    };

    /**
     * Build MapTypeControlOptions object
     *
     * @param {object} controls
     * @param {object} MapTypeId
     * @param {object} ControlPosition
     * @param {object} MapTypeControlStyle
     *
     * @return {object} mapTypeControlOptions
     */
    function MapTypeControlOptions( controls, MapTypeId , ControlPosition , MapTypeControlStyle )
    {
        var mapTypeControlOptions = {};

        if ( controls.position !== undefined )
        {
            mapTypeControlOptions = ControlPosition.get( controls.position );
        }

        if ( controls.type !== undefined )
        {
            if ( typeof controls.type === 'object' )
            {
                $.map( controls.type, function( type , i ) {
                    controls.type[ i ] = MapTypeId.get( controls.type[ i ] );
                });
                 mapTypeControlOptions.mapTypeIds = controls.type;
            }
            if ( typeof controls.type === 'string' )
            {
                mapTypeControlOptions.mapTypeIds = [ MapTypeId.get( controls.type ) ];
            }
        }

        if ( controls.style !== undefined )
        {
            mapTypeControlOptions.style =  MapTypeControlStyle.get( controls.style );
        }

        return mapTypeControlOptions;
    }

    /**
     * Control position constructor
     */
    function ControlPosition()
    {
        this.control_position = gmap.ControlPosition;
    }

    /**
     * Control Position Get method, will get the position based on the string passed
     *
     * @param  {string} position String defining the position
     *
     * @return {object}          Position of the control element, will return an object, e.g { position:  }
     */
    ControlPosition.prototype.get = function ( position )
    {
        if ( position === 'bottom_center' ) { return { position:  this.control_position.BOTTOM_CENTER  }; }
        if ( position === 'bottom_left' )   { return { position:  this.control_position.BOTTOM_LEFT  }; }
        if ( position === 'bottom_right' )  { return { position:  this.control_position.BOTTOM_RIGHT  }; }
        if ( position ==='left_bottom' )    { return { position:  this.control_position.LEFT_BOTTOM  }; }
        if ( position === 'left_center' )   { return { position:  this.control_position.LEFT_CENTER  }; }
        if ( position === 'left_top' )      { return { position:  this.control_position.LEFT_TOP  }; }
        if ( position === 'right_bottom' )  { return { position:  this.control_position.RIGHT_BOTTOM  }; }
        if ( position === 'right_center' )  { return { position:  this.control_position.RIGHT_CENTER  }; }
        if ( position === 'right_top' )     { return { position:  this.control_position.RIGHT_TOP  }; }
        if ( position === 'top_center' )    { return { position:  this.control_position.TOP_CENTER  }; }
        if ( position === 'top_right' )     { return { position:  this.control_position.TOP_RIGHT  }; }
        return { position:  this.control_position.TOP_LEFT };
    };

    /**
     * Map Type Constrol Style constructor
     */
    function MapTypeControlStyle()
    {
        this.control_style = gmap.MapTypeControlStyle;
    }

    /**
     * Map Type Control Style get method, will return the layout type of the map type control
     * 3 options available: dropdown, horizontal bar, default
     *
     * @param  {string} style String defining the control style
     *
     * @return {mixed}      Style of the Map Type Control
     */
    MapTypeControlStyle.prototype.get = function( style )
    {
        if ( style === 'dropdown_menu' )     { return this.control_style.DROPDOWN_MENU; }
        if ( style === 'horizontal_bar' )    { return this.control_style.HORIZONTAL_BAR; }
        return this.control_style.DEFAULT;
    };

    /**
     * Zoom Control Style constructor
     */
    function ZoomControlStyle()
    {
        this.zoom_control_style = gmap.ZoomControlStyle;
    }

    /**
     * Zoom Control Style get method, will get the zoom style
     * 3 options available: large, small, default
     *
     * @param  {string} style String defining the zoom style
     *
     * @return {mixed}      Style of the zoom control
     */
    ZoomControlStyle.prototype.get = function( style )
    {
        if ( style === 'large' ) { return this.zoom_control_style.LARGE; }
        if ( style === 'small' ) { return this.zoom_control_style.SMALL; }
        return this.zoom_control_style.DEFAULT;
    };

    /**
     * Constructor for centering the map
     * This will set the position property based on the user settings
     *
     * @param {mixed} position  Either a string as an address, or an array of lat and lng e.g [ 48.856614 , 2.352222 ]
     */
    var Helpers =
    {
        center: function ( map , position, disable_pan ) 
        {
            if ( typeof position === 'string' ) 
            {
                new Geocoder( position ).getGeocode().done( function ( coordinates ) {
                    Helpers.setCenter( map, coordinates[0].geometry.location , disable_pan );
                });
            }

            if ( typeof position === 'object' ) 
            {
                Helpers.setCenter( map, new LatLng( position[0], position[1] ).get(), disable_pan );
            }
        },
        setCenter: function ( map , coordinates , disable_pan ) {
            if ( disable_pan !== undefined && disable_pan === true )
            {
                map.setCenter( coordinates );
            }
            else {
                map.panTo( coordinates );
            }
        },
        getKeys: function ( array ) {
            var keys = [];
            for (var key in array) 
            {
                    keys.push(key);
            }
            return keys;
        }
    };

    /**
     * Geolocation module
     *
     * Mini wrapper of the HTML5 Geolocation API
     *
     * @param {object} settings             User settings
     * @param {object} marker_collection    Marker collection
     */
     function Geolocation( map , settings , geolocation_marker , default_center ) 
     {
        this.map = map;
        var self = this;
        /**
         * Check if the browser support HTML5 geolocation
         * Call getCurrentPosition and assign its success/error callbacks and options
         *
         * @return {void}
         */
        self.init = function()
        {
            if ( self.has() )
            {
                var options = {};
                if ( typeof settings.options  === 'object' )
                {
                    options = settings.options;
                }

                // Call getCurrentPosition
                navigator.geolocation.getCurrentPosition( self.set , self.error , options );
            }
            else
            {
               if ( typeof settings.unsupported === 'function' )
                {
                    settings.unsupported.call( self.map );
                }
            }
        };

        /**
         * Check if the browser supports HTML 5 Geolocation API
         *
         * @return {bool}
         */
        self.has = function()
        {
            return typeof navigator.geolocation !== 'undefined';
        };

        /**
         * Set marker or/and center if we need 
         *
         * @param  {object} position  Position returned from getCurrentPosition
         *
         * @return {void}
         */
        self.set = function ( position ) 
        {
            var current_position =  new LatLng( position.coords.latitude , position.coords.longitude ).get();

            if ( settings.center ) 
            {
                Helpers.setCenter( self.map, current_position );
            }
            if ( settings.marker ) 
            {
                var marker_options = {};
                if ( typeof settings.marker === 'object' ) 
                {
                    marker_options = settings.marker;
                }
                geolocation_marker.marker = new Marker( self.map , "geolocation_marker", marker_options, new InfoWindow( self.map, new Event() ), new Animation() ).createMarker( current_position );
                geolocation_marker.deferred.resolve( geolocation_marker.marker );
            }
            self.success( position );
        };
        /**
         * Error callback from getCurrentPosition()
         *
         * @param  {object} error  Code and message object e.g { code : 2, message : 'Position unknown'}
         *
         * @return {void}
         */
        self.error = function( error )
        {
            // If error center the map to the default center as a fallback
            Helpers.center( self.map, default_center );
            if ( typeof settings.error === 'function' )
            {
                settings.error.call( self.map , error );
            }
        };

        /**
         * Success callback from getCurrentPosition()
         *
         * @param  {object} results  The position information object
         * e.g { coordinates : ... }
         *
         * @return {void}
         */
        self.success = function( results )
        {
            if ( typeof settings.success  === 'function' )
            {
                settings.success.call( self.map , results );
            }
        };
    }
})( jQuery );