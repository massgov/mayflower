import getTemplate from "../helpers/getHandlebarTemplate.js";

export default (function (window,document,$) {
  // Only run this code if there is a google map component on the page.
  if(!$('.js-google-map').length || typeof ma.googleMapData === 'undefined'){
    return;
  }
  console.log('!!!')

  // Initialize global (at component scope) map properties
  let max = false, // Maximum number of map markers per map, can be updated instance
    mapsInitialized = false; // Flag to set to trigger clearInterval(checkForGoogleMaps)

  /**
   * Test for presence of google maps default library (without geocode, places, etc.) until we find it.
   * Loaded in _meta/_01.foot.twig with static api key
   * @todo set up config to pull in dynamic api key
   */
  let checkForGoogleMaps = setInterval(function() {
    if (!mapsInitialized) {
      console.log('leaflet?!')
      initMaps();
    }
  }, 100);

  // Stop checking for google maps library after 2 minutes. ? why wait for 2 mins to clear interval?
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
    console.log(ma.googleMapData)
    console.log(L)

    $(".js-google-map").each(function(i) {
      
      // Get the maps data (this could be replaced with an api)
      const rawData = ma.googleMapData[i]; // Data object created in @molecules/google-map.twig

      var mymap = window.L.map('mapid').setView([rawData.map.center.lat, rawData.map.center.lng], rawData.map.zoom);
      window.L.tileLayer('https://tiles.arcgis.com/tiles/hGdibHYSPO59RG1h/arcgis/rest/services/MassGISBasemap/MapServer/tile/{z}/{y}/{x}', {
          attribution: '<a href ="https://www.mass.gov/service-details/about-massgis">MassGIS (Bureau of Geographic Information)</a>, Commonwealth of Massachusetts EOTSS',
          maxZoom: 19,
          minZoom: 7,
          //tileSize: 256,
      }).addTo(mymap);
  
      console.log(mymap)

    })
  }

})(window,document,jQuery);
