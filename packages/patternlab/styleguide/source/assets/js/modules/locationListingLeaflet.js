import sticky from "../helpers/sticky.js";

export default (function (window, document, $) {

  function initListing (el, i) {
    $(el).each(function(i){
      let $el = $(this),
      $mapCol = $el.find(".js-location-listing-map");
      sticky.init($mapCol);

      $el.find(".ma__image-promo__directions a").on('click', function(e){
        e.preventDefault();
        let parent = $(this).parents('.ma__image-promo');
        let index = parent.index();
        $('html, body').animate({
          scrollTop: $mapCol.offset().top,
        });

        let maker = window.leafletMarkers[index];
        window.leafletMap.flyTo(maker.getLatLng());
        maker.openPopup();
      });
    });
  }


  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll(".js-location-listing.leaflet").forEach(function(el, i) {
      initListing(el, i);
    })
  })
}) (window, document, jQuery);
