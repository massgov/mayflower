import getTemplate from "../helpers/getHandlebarTemplate.js";
import * as L from 'leaflet/dist/leaflet-src.js';

export default (function (window,document,$) {
  // Only run this code if there is a leaflet map component on the page.
  if(!$('.js-leaflet-map').length){
    return;
  }
  console.log('render leaflet map!')

  // Initialize the map
  function initMaps () {

    const compiledTemplate = getTemplate('mapMarkerInfo');

    document.querySelectorAll(".js-leaflet-map").forEach(function(el, i) {
      // Get the maps data (this could be replaced with an api)
      const { map, markers, isStatic=0, hideAttribution } = ma.leafletMapData[i]; // Data object created in @molecules/leaflet-map.twig

      // max bounds
      const corner1 = L.latLng(43.25487715669311, -69.63780641555788);
      const corner2 = L.latLng(41.2217127572528, -74.26305055618288);
      const maxBounds = L.latLngBounds(corner1, corner2);
      console.log(maxBounds)

      let mymap = L
        .map(el, {
          center: [map.center.lat, map.center.lng],
          zoom: 0,
          zoomControl: !isStatic,
          // maxBounds 
        });

      
      mymap.on('zoomend', function() {
        const bounds = mymap.getBounds();
        console.log(bounds)
      });
  

      // add tile layer image to map
      L
      .tileLayer('https://tiles.arcgis.com/tiles/hGdibHYSPO59RG1h/arcgis/rest/services/MassGISBasemap/MapServer/tile/{z}/{y}/{x}', {
          attribution: '<a href ="https://www.mass.gov/service-details/about-massgis">MassGIS (Bureau of Geographic Information)</a>, Commonwealth of Massachusetts EOTSS'
      })
      .addTo(mymap);
      
      const markerArray = markers.map((marker) => [marker.position.lat, marker.position.lng]); // Array of [lat, lng] coordinates to be used as bounds in fitBounds()

      function setMapBounds() {
        //console.log(window.innerWidth)
        const bounds = mymap.getBounds();
        //console.log(bounds)
        mymap.fitBounds(markerArray, {
          padding: [60, 60]
        })
      }

      setMapBounds();
      window.addEventListener('resize', setMapBounds);

      if (hideAttribution) {
        el.querySelector('.leaflet-control-attribution').style.display = 'none';
      }
      


      // disable map interactions
      if (isStatic) {
        mymap.dragging.disable();
        mymap.touchZoom.disable();
        mymap.doubleClickZoom.disable();
        mymap.scrollWheelZoom.disable();
        mymap.boxZoom.disable();
        mymap.keyboard.disable();
        if (mymap.tap) map.tap.disable();
        el.style.cursor='default';
      }


      // custom marker icon 
      var markerIcon = L.icon({
        iconUrl: `${ma.iconPath}marker-blue.svg`,
        iconSize: [60, 60],
        iconAnchor: [30, 60], 
        /* The coordinates of the "tip" of the icon (relative to its top left corner). The icon will be aligned so that this point is at the marker's geographical location. Centered by default if size is specified, also can be set in CSS with negative margins.
         see leaflet docs: https://leafletjs.com/reference-1.7.1.html#icon-iconanchor
        */
        popupAnchor: [0, -60],
        shadowUrl: ''
    });

      // add markers to map 
      markers.forEach(({ position, infoWindow}) => {
        L.marker(
          L.latLng(
            +position.lat,
            +position.lng
          ), {
            icon: markerIcon,
            interactive: !isStatic
          })
        .addTo(mymap)
        .bindPopup(compiledTemplate(infoWindow));
      })

    })
  }

  initMaps();

})(window,document,jQuery);
