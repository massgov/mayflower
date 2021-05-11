import getTemplate from "../helpers/getHandlebarTemplate.js";
// import * as L from 'leaflet/dist/leaflet-src.js'; // safari bug exists in this version https://github.com/Leaflet/Leaflet/issues/7255
import * as L from '../vendor/leaflet-src.js'; // wait for the bug fix to get into a released version to remove this local JS file and import from the leaflet package

export default (function (window,document) {
  // Only run this code if there is a leaflet map component on the page.
  if(!document.querySelectorAll('.js-leaflet-map').length){
    return;
  }

  // Initialize the map
  function initMaps () {

    const compiledTemplate = getTemplate('mapMarkerInfo');

    document.querySelectorAll(".js-leaflet-map").forEach(function(el, i) {
      // Get the maps data (this could be replaced with an api)
      const { map, markers, isStatic=0, hideAttribution=0 } = ma.leafletMapData[i]; // Data object created in @molecules/leaflet-map.twig

      // max bounds
      // const corner1 = L.latLng(43.12916191721289, -67.40279674530031); //northEast
      // const corner2 = L.latLng(41.09188542307055, -76.28524303436281); //southWest
      // const maxBounds = L.latLngBounds(corner1, corner2);

      let mymap = L
        .map(el, {
          center: [map.center.lat, map.center.lng],
          zoom: map.zoom || 0,
          zoomControl: false,
          minZoom: 8,
          scrollWheelZoom: false,
          dragging: false
          // maxBounds,
        });
      
      // if map is not static, add zoom control with custom position
      if (!isStatic) {
        L.control.zoom({
            position: 'bottomleft'
        })
        .addTo(mymap);
      }

      // add tile layer image to map
      L
      .tileLayer('https://tiles.arcgis.com/tiles/hGdibHYSPO59RG1h/arcgis/rest/services/MassGISBasemap/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Source: <a href ="https://www.mass.gov/service-details/about-massgis">MassGIS</a>'
      })
      .addTo(mymap);

      if (hideAttribution) {
        el.querySelector('.leaflet-control-attribution').style.display = 'none';
      }
      
      // if zoom is not specified, set map bounds automatically by markers
      if (!map.zoom) {
        // set bounds by markers
        const markerArray = markers.map((marker) => [marker.position.lat, marker.position.lng]); // Array of [lat, lng] coordinates to be used as bounds in fitBounds()
        function setMapBounds() {
          mymap.fitBounds(markerArray, {
            padding: [60, 60]
          })
        }
        setMapBounds();
        window.addEventListener('resize', setMapBounds);
      }


      // disable map interactions if is static 
      if (isStatic) {
        mymap.touchZoom.disable();
        mymap.doubleClickZoom.disable();
        mymap.boxZoom.disable();
        mymap.keyboard.disable();
        if (mymap.tap) mymap.tap.disable();
        el.style.cursor='default';
      } else {
        let locked = true;
        const customControl =  L.Control.extend({
          options: {
            position: 'topleft'
          }, 
          onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-control-attribution');
            container.id="lockButton"
            container.title="tab on the map to unlock the interactivity, tab off the map to lock interactivity";
            container.value = locked ? "locked" : "unlocked";
            container.innerHTML = locked ? 'Click or tap INSIDE map to move the map' : 'Click or tap OUTSIDE map to scroll the page';

        
            container.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';   
            // container.style.backgroundImage = locked ? `url('${ma.iconPath}/lock.svg')` : `url('${ma.iconPath}/unlock.svg')`;
            // container.style.backgroundSize = "20px";
            container.style.padding = '3px';
        
            return container;
          }
        });

        mymap.addControl(new customControl());

        const container = L.DomUtil.get('lockButton');
        /* Prevent scolling/swiping ambiguity
        ** Only enable scroll zoom and pane if map is in focus, and disable after user click outside of the map */
        mymap.on('focus', function() { 
          locked = false;
          container.value = "unlocked";
          container.innerHTML = locked ? 'Click or tap INSIDE map to move the map' : 'Click or tap OUTSIDE map to scroll the page';
          mymap.scrollWheelZoom.enable(); 
          mymap.dragging.enable();
        });
        mymap.on('blur', function() { 
          locked = true;
          container.value = "locked";
          container.innerHTML = locked ? 'Click or tap INSIDE map to move the map' : 'Click or tap OUTSIDE map to scroll the page';
          mymap.scrollWheelZoom.disable(); 
          mymap.dragging.disable();
        });
      }


      // custom marker icon 
      var markerIcon = L.icon({
        iconUrl: `${ma.iconPath}/marker-blue.svg`,

        iconSize: [50, 50],
        iconAnchor: [25, 50], 
        /* The coordinates of the "tip" of the icon (relative to its top left corner). The icon will be aligned so that this point is at the marker's geographical location. Centered by default if size is specified, also can be set in CSS with negative margins.
         see leaflet docs: https://leafletjs.com/reference-1.7.1.html#icon-iconanchor
        */
        popupAnchor: [0, -50],
        shadowUrl: ''
    });

      // add markers to map 
      markers.forEach(({ position, infoWindow}) => {
        const mymarker = L.marker(
          L.latLng(
            +position.lat,
            +position.lng
          ), {
            icon: markerIcon,
            interactive: !isStatic,
            // When true, a mouse event on this marker will trigger the same event on the map (unless L.DomEvent.stopPropagation is used).
            bubblingMouseEvents: true
          })
        .addTo(mymap)
        .bindPopup(compiledTemplate(infoWindow));

        mymarker.on('focus', function() { 
          console.log('test test marker')
        });
      })

    })
  }

  initMaps();

})(window,document);
