export default (function (window,document,$,undefined) {

  function initFilters () {
    $('.js-location-filters.leaflet').each(function() {
      let $el = $(this);
      let $resultHeading = $('.js-results-heading'),
        $clearAllButton = '.js-results-heading-clear', // events triggered on parent
        $filterButton = '.js-results-heading-tag'; // events triggered on parent
        let $locationFilterParent = $('.js-filter-by-location', $el);
        let $locationFilter = $locationFilterParent.find('input');
        if ($locationFilter.length) {
          // Create the google places autocomplete object and associate it with the zip code text input.
          const locationFilterID = $locationFilter.attr('id');
          let locationInput = document.getElementById(locationFilterID);
          let swLat = $locationFilterParent.data('maPlaceBoundsSwLat');
          let swLng = $locationFilterParent.data('maPlaceBoundsSwLng');
          let neLat = $locationFilterParent.data('maPlaceBoundsNeLat');
          let neLng = $locationFilterParent.data('maPlaceBoundsNeLng');

          let defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(swLat,swLng), new google.maps.LatLng(neLat,neLng));

          // See options: https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
          let options = {
            bounds: defaultBounds,
            strictBounds: true,
            types: ['geocode'],
            componentRestrictions: {country: 'us'},
          };

          ma.autocomplete = new google.maps.places.Autocomplete(locationInput, options);

          ma.autocomplete.addListener('place_changed', function() {
            const place = ma.autocomplete.getPlace();
            $(document).trigger('ma:GoogleMaps:placeChanged', place);
          }); 

          // Fix google places autocomplete use enter key to select - separating form submit action from option selection while pressing the enter key.
          google.maps.event.addDomListener(locationInput, 'keydown', function(e) { 
              if (e.key == 'Enter' && $('.pac-container:visible').length) { 
                  e.preventDefault(); 
              }
          }); 
        }
    });
  };

  // When google map libraries are loaded, initialize places.autocomplete on the location input, if it exists.
  $(document).on('ma:LibrariesLoaded:GoogleMaps', function() {
    initFilters();
  });  

  document.addEventListener('DOMContentLoaded', function() {
    if (window.googleMapsLoaded) {
      initFilters();
    }
  })
})(window,document,jQuery);
