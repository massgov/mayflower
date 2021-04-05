import getTemplate from "../helpers/getHandlebarTemplate.js";

export default (function (window,document,$) {
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
    if (!mapsInitialized) {
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

    const compiledTemplate = getTemplate('googleMapInfo');

    $(".js-google-map").each(function(i) {
      
      // Get the maps data (this could be replaced with an api)
      const { map, markers } = ma.googleMapData[i]; // Data object created in @molecules/google-map.twig


      const markerArray = markers.map((el) => [el.position.lat, el.position.lng]) ;

      let mymap = window.L.map('mapid').setView([map.center.lat, map.center.lng], map.zoom);
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


})(window,document,jQuery);
