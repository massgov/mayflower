export default (function (window,document,$,undefined) {

  function initFilters () {
    $('.js-location-filters').each(function() {
      let $el = $(this);
      let $resultHeading = $('.js-results-heading'),
        $clearAllButton = '.js-results-heading-clear', // events triggered on parent
        $filterButton = '.js-results-heading-tag'; // events triggered on parent
        let $locationFilterParent = $('.js-filter-by-location', $el);
        let $locationFilter = $locationFilterParent.find('input');

        if ($locationFilter.length) {
          // Create the google places autocomplete object and associate it with the zip code text input.
          let locationInput = document.getElementById($locationFilter.attr('id'));
          console.log(locationInput)
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
            fields: ['formatted_address', 'geometry', 'name'],
            componentRestrictions: {country: 'us'},
          };

          ma.autocomplete = new google.maps.places.Autocomplete(locationInput, options);

          google.maps.event.addListener(ma.autocomplete, 'place_changed', () => {
              let place = ma.autocomplete.getPlace();
              console.log(place); // You will get complete data
              // If you want to move your map center to the searched lat long position. Use below any one
              // (with animation)
              // this.gmap.panTo({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }); 
              // // (without animation)
              // this.gmap.setCenter({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }); 
          });


          ma.autocomplete.addListener('place_changed', function() {
            console.log('changed')

            const place = ma.autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) {
              // User entered the name of a Place that was not suggested and
              // pressed the Enter key, or the Place Details request failed.
              window.alert("No details available for input: '" + place.name + "'");
              return;
            }
            console.log(place)
            $(document).trigger('ma:GoogleMaps:placeChanged', place);
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
