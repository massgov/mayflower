import getTemplate from "../helpers/getHandlebarTemplate.js";
import * as L from 'leaflet/dist/leaflet-src.js';

export default (function (window,document,$) {
  console.log('render leaflet map!')
  // Only run this code if there is a leaflet map component on the page.
  if(!$('.js-leaflet-map').length){
    return;
  }

  // Initialize the map
  function initMaps () {

    const compiledTemplate = getTemplate('googleMapInfo');

    document.querySelectorAll(".js-leaflet-map").forEach(function(el, i) {
      
      // Get the maps data (this could be replaced with an api)
      const { map, markers } = ma.leafletMapData[i]; // Data object created in @molecules/leaflet-map.twig


      const markerArray = markers.map((marker) => [marker.position.lat, marker.position.lng]) ;
      console.log(i)

      let mymap = L.map(el).setView([map.center.lat, map.center.lng], map.zoom);
      mymap.fitBounds(markerArray);

      window.L
      .tileLayer('https://tiles.arcgis.com/tiles/hGdibHYSPO59RG1h/arcgis/rest/services/MassGISBasemap/MapServer/tile/{z}/{y}/{x}', {
          attribution: '<a href ="https://www.mass.gov/service-details/about-massgis">MassGIS (Bureau of Geographic Information)</a>, Commonwealth of Massachusetts EOTSS'
      })
      .addTo(mymap);

      
      markers.forEach(({ position, infoWindow}) => {
        L.marker(
          L.latLng(
            +position.lat,
            +position.lng
          ))
        .addTo(mymap)
        .bindPopup(compiledTemplate(infoWindow));
      })

    })
  }

  initMaps();

})(window,document,jQuery);
