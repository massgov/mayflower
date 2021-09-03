import sticky from "../helpers/sticky.js";

export default (function (window, document, $) {

  function initListing (el, i) {

    let currentMarker = null;

    $(el).each(function(i){
      let $el = $(this),
      $mapCol = $el.find(".js-location-listing-map");
      sticky.init($mapCol);

      $el.find(".ma__image-promo").on('click', function(e){
        if (e.target.href) {
          e.stopImmediatePropagation();
          return;
        }

        e.preventDefault();
        let index = $(this).index();
        $('html, body').animate({
          scrollTop: $mapCol.offset().top,
        });

        let marker = window.leafletMarkers[index];
        $(marker._icon).addClass('ma-transition');
        marker._icon.style.transform = marker._icon.style.transform.replace(' scale(1.25)', '');
        window.leafletMap.flyTo(marker.getLatLng());
        marker.openPopup();
      }).on("mouseenter focusin", function (e) {
        let index = $(this).index();
        let marker = window.leafletMarkers[index];

        if ($(marker._icon).hasClass('ma-highlighted')) {
          return;
        }

        // The marker have a transform for position in the map so we need to use +=
        $(marker._icon).removeClass('ma-transition');
        marker._icon.style.transform += ' scale(1.25)';
        $(marker._icon).addClass('ma-highlighted');
        marker._focusin = true;
      }).on("mouseleave focusout", function (e) {
        let index = $(this).index();
        let marker = window.leafletMarkers[index];
        marker._icon.style.transform = marker._icon.style.transform.replace(' scale(1.25)', '');
        $(marker._icon).removeClass('ma-highlighted');
      });
    });
  }


  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll(".js-location-listing.leaflet").forEach(function(el, i) {
      initListing(el, i);
    })
  })
}) (window, document, jQuery);
