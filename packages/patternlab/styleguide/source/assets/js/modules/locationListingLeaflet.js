import sticky from "../helpers/sticky.js";

export default (function (window, document, $) {

  function initListing (el, i) {
    $(el).each(function(i){
      let $el = $(this),
      $mapCol = $el.find(".js-location-listing-map");
      sticky.init($mapCol);
    });
  }


  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll(".js-location-listing.leaflet").forEach(function(el, i) {
      initListing(el, i);
    })
  })
}) (window, document, jQuery);
