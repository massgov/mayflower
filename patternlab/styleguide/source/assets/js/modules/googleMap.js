import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {
  // Only run this code if there is a google map component on the page.
  if(!$('.js-google-map').length || typeof ma.googleMapData === 'undefined'){
    return;
  }

  // Initialize global (at component scope) map properties
  let max = false, // Maximum number of map markers per map, can be updated instance
    mapsInitialized = false; // Flag to set to trigger clearInterval(checkForGoogleMaps)

  /**
   * Test for presence of google maps default library (without geocode, places, etc.) until we find it.
   * Loaded in _meta/_01.foot.twig with static api key
   * @todo set up config to pull in dynamic api key
   */
  let checkForGoogleMaps = setInterval(function() {
    if (window.google && window.google.maps && !mapsInitialized) {
      initMaps();
    }
  }, 100);

  // Stop checking for google maps library after 2 minutes.
  let stopChecking = setTimeout(function() {
    clearInterval(checkForGoogleMaps);
  }, 2 * 60 * 1000);

  // Clear out any potential HTML tags in text
  function sanitizeText (potentialHTML) {
    let d = document.createElement("div");
    d.innerHTML = potentialHTML;
    return d.innerText;
  }

  // Initialize the map
  function initMaps () {
    // Stop checking for google maps library.
    mapsInitialized = true;
    clearInterval(checkForGoogleMaps);
    clearTimeout(stopChecking);

    $(".js-google-map").each(function(i) {
      const $el = $(this);
      max = ma.googleMapData[i].maxItems ? ma.googleMapData[i].maxItems : ma.googleMapData[i].markers.length;

      // Get the maps data (this could be replaced with an api)
      const rawData = ma.googleMapData[i]; // Data object created in @molecules/google-map.twig

      // *** Create the Map *** //
      // Map default config.
      const initMapData = {
        scrollwheel: false
      };
      // Create map data by combining the rawData with the defaults.
      const mapData = Object.assign({}, rawData.map, initMapData);
      // Create google map object assigned to this component instance with map data.
      const map = new google.maps.Map(this, mapData);
      // Initialize global markers, map bounds.
      let bounds = new google.maps.LatLngBounds();
      // Initialize all markers
      let markers = initMarkers(map, rawData.markers);
      // Add up to max markers to the map, zoom map to fit all bounds
      addMarkersToMap(markers, map, bounds);

      // Trigger map initialized event, broadcast master markers.
      $el.trigger('ma:GoogleMap:MapInitialized', [markers]);

      // Add keyboard navigation only after the map is rendered (becoming idle).
      google.maps.event.addListenerOnce(map, 'idle', function() {
        let $mapItems = $(".js-google-map").find(
          'div[title="Show street map"],' +
          'div[title="Show street map with terrain"],' +
          'div[title="Show satellite imagery"],' +
          'div[title="Zoom in to show 45 degree view"],' +
          'div[title="Show imagery with street names"],' +
          'div[title="Pan up"],' +
          'div[title="Pan down"],' +
          'div[title="Pan left"],' +
          'div[title="Pan right"],' +
          'div[title="Return to the last result"],' +
          'div[title="Zoom in"],' +
          'div[title="Zoom out"],' +
          'img[title="Rotate map 90 degrees"],' +
          '.gmnoprint area'
        );
        $mapItems.each(function(i, o){
          $(o).attr({
            role: 'button',
            tabindex: '0',
            'aria-label': o.title
          }).bind('keydown', function(ev){
            // If enter is pressed on one of these elements, trigger a click of the element.
            if (ev.which == 13){
              ev.preventDefault();
              $(o).trigger('click');
            }
          });
        });
      });

      // Listen for map recenter event
      $el.on("ma:GoogleMap:MapRecenter", function (event, markerIndex) {
        if (typeof markers[markerIndex] === "undefined") {
          return false;
        }
        let marker = markers[markerIndex];
        // center the map on this marker
        map.setCenter(marker.getPosition());
        // close all open infoWindows
        for (let i in markers) {
          if (markers[i].open) {
            markers[i].hideInfo();
          }
        }
        // show the infoWindow for this marker
        marker.showInfo();
      });
      // Listen for map marker bounce event
      $el.on("ma:GoogleMap:MarkerBounce", function( event, markerIndex ) {
        if(typeof markers[markerIndex] === "undefined") {
          return false;
        }
        let marker = markers[markerIndex];
        // center and zoom the map on this marker
        map.setCenter(marker.getPosition());
        map.setZoom(15);
        // make the marker bounce three times
        marker.bounce();
      });
      // Listen for data change event to update markers by filters.
      $el.on("ma:GoogleMap:MarkersUpdated", function (e, args) {
        // Update map based on pre-sorted markers order
        markers = updateMapByMarkers({
          dataMarkers: args.markers,
          map: map,
          markers: markers,
          place: args.place ? args.place : false
        });

        // hide all info windows
        for (let i in markers) {
          if(markers[i].open) {
            markers[i].hideInfo();
          }
        }
      });
    });
  }

  /**
   * Returns the array of initialized current map markers.
   *
   * @param map
   *  The current map object.
   *
   * @param markers
   *  The markers to be initialized.
   *
   * @return {Array}
   */
  function initMarkers(map, markers) {
    let initializedMarkers = [];
    markers.forEach(function(data) {
      let markerData = {
        position: new google.maps.LatLng({
          lat: data.position.lat,
          lng: data.position.lng
        }),
        label: data.label,
        infoWindow: data.infoWindow,
        title: 'Marker: ' + sanitizeText(data.infoWindow.name)
      };
      let marker =  new google.maps.Marker(markerData);
      let infoData = infoTransform(markerData.infoWindow);
      let compiledTemplate = getTemplate('googleMapInfo');
      let template = compiledTemplate(infoData);
      let infoWindow = new google.maps.InfoWindow({
        content: template
      });
      let markerBouncing = null;

      marker.addListener('click', function(){
        // hide all info windows
        for (let i in initializedMarkers) {
          if(initializedMarkers[i].open) {
            initializedMarkers[i].hideInfo();
          }
        }

        // show this info window
        marker.showInfo();
      });

      marker.showInfo = () => {
        infoWindow.open(map, marker);
        marker.open = true;
      };

      marker.hideInfo = () => {
        infoWindow.close(map, marker);
        marker.open = false;
      };

      marker.bounce = () => {
        clearTimeout(markerBouncing);
        marker.setAnimation(null);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        markerBouncing = setTimeout(() => {
          marker.setAnimation(null);
        },3000);
      };

      initializedMarkers.push(marker);
    });

    return initializedMarkers;
  }

  /**
   * Return formatted marker infowindow data.
   *
   * @param data
   *   Infowindow data object:
   *   "infoWindow": {
   *      "name": "Attleboro District Court",
   *      "phone": "15082225900",
   *      "fax": "15082233706",
   *      "email": "courts@state.ma.us",
   *      "address": "88 North Main Street\nAttleboro, MA 02703"
   *   }
   *
   * @returns {*}
   *   Object with passed data and new infoData property.
   */
  function infoTransform(data) {
    let infoData = {
      phoneFormatted: formatPhone(data.phone),
      faxFormatted: formatPhone(data.fax)
    };
    return Object.assign({},data,infoData);
  }

  /**
   * Return phone number data formatted for map marker.
   *
   * @param phone
   *   "15082225900",
   * @returns {string}
   *    (508) 222-5900
   */
  function formatPhone(phone) {
    let phoneTemp = phone[0] === '1' ? phone.substring(1) : phone;
    return phoneTemp.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }

  /**
   * Location listing specific map helper functions
   */


  /**
   * Renders a new map, with markers  reference to passed marker order and length.
   *
   * @param args
   *  arguments object:
   *    {
   *      dataMarkers: args.markers, // sorted array of markers by witch to sort and filter master markers
   *      map: map, // initialized map instance
   *      markers: markers, // master list of current map markers
   *      place: args.place, // optional location filter place input

   *    }
   */
  function updateMapByMarkers(args) {
    removeMarkersFromMap(args.markers);

    // Reset bounds to remove previous search locations.
    let bounds = new google.maps.LatLngBounds();
    if (args.place && ma.autocomplete.getPlace()) {
      // Ensure the map includes the provided location based on the place value.
      bounds.extend(args.place.geometry.location);
    }

    // Add the new markers to the map and set new bounds based on filtered markers.
    addMarkersToMap(args.dataMarkers, args.map, bounds);

    // If there is only one marker, zoom out to provide some context.
    if (args.dataMarkers.length === 1) {
      args.map.setZoom(16);
    }

    return args.dataMarkers;
  }

  /**
   * Removes passed marker objects from a given map.
   *
   * @param markers
   *   Array of map marker objects.
   */
  function removeMarkersFromMap(markers) {
    for(let i = 0; i < markers.length; i++){
      markers[i].setMap(null);
    }
  }

  /**
   * Adds markers to a given map and sets bounds based on those markers.
   *
   * @param markers
   *   Initialized map marker objects to be added.
   * @param map
   *   Initialized map object.
   * @param bounds
   *   Initialized map bounds object.
   */
  function addMarkersToMap(markers, map, bounds) {
    // Set max number of markers to whichever is smaller: max or the number of markers sent.
    let maxItems = markers.length < max ? markers.length : max;

    markers.forEach(function(marker, index) {
      if (index < maxItems) {
        marker.setMap(map);
        // Extend the bounds to include each marker's position.
        bounds.extend(marker.position);
      }
    });

    // Google Maps default behavior with a single marker when calling
    // fitBounds() is to maximize zoom. This can be undesirable behavior.
    // If only a single marker, let mapData define center and zoom.
    if (markers.length > 1) {
      // Make the map zoom to fit the bounds, showing all locations.
      map.fitBounds(bounds);
    }
  }

}(window,document,jQuery);
