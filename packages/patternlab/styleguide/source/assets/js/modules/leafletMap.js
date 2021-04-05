import getTemplate from "../helpers/getHandlebarTemplate.js";

export default (function (window,document,$,undefined) {
  // console.log('leaflet!!!!!')
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
      // console.log('leaflet!!!!!')
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

    $(".js-google-map").each(function(i) {
      

      var mymap = L.map('mapid').setView([ma.googleMap.map.center.lat, ma.googleMap.map.center.lng], googleMap.map.zoom);

    })
  }

})(window,document,jQuery);
