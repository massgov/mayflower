
export default (function (window,document,$,undefined) {

  function initFilters () {
    $('.js-location-filters').each(function() {
      let $el = $(this);
      const $locationFilterParent = $('.js-filter-by-location', $el);
      const $locationFilter = $locationFilterParent.find('input');
      const errorMessage = $locationFilterParent.find('.ma__error-msg')
      const $submitButton = $el.find('.js-location-filters__submit');

      if ($locationFilter.length) {
        // Create the google places autocomplete object and associate it with the zip code text input.
        const locationFilterID = $locationFilter.attr('id');
        const locationInput = document.getElementById(locationFilterID);
        const swLat = $locationFilterParent.data('maPlaceBoundsSwLat');
        const swLng = $locationFilterParent.data('maPlaceBoundsSwLng');
        const neLat = $locationFilterParent.data('maPlaceBoundsNeLat');
        const neLng = $locationFilterParent.data('maPlaceBoundsNeLng');

        const defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(swLat,swLng), new google.maps.LatLng(neLat,neLng));

        // See options: https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
        let options = {
          bounds: defaultBounds,
          strictBounds: true,
          types: ['geocode'],
          fields: ['formatted_address', 'geometry', 'name'],
          componentRestrictions: {country: 'us'},
        };

        ma.autocomplete = new google.maps.places.Autocomplete(locationInput, options);


        var placeChanged = false;
        var autocompleteListener = _.debounce(function(e) {
          // place_changed is only triggered when an option is selected from the auto suggestion dropdown.
          // This includes mouse click and keyboard enter on an option.

          var place = ma.autocomplete.getPlace() || {};
          if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            errorMessage.addClass('has-error');
            placeChanged = false;
            return;
          }

          placeChanged = true;
          errorMessage.removeClass('has-error');

          $(document).trigger('ma:GoogleMaps:placeChanged', place);
        }, 500);

        ma.autocomplete.addListener('place_changed', autocompleteListener, false);

        const showSuggestions = () => {
          // Update the top position of the dropdown, as the error message can add additional space above the input.
          const positionTop = locationInput.getBoundingClientRect().bottom + window.scrollY;
          $('.pac-container').show();
          $('.pac-container').css("top", positionTop);
        }

        google.maps.event.addDomListener(locationInput, 'keydown', function(e) {
          if (e.key == 'Enter') {
            if (!placeChanged) {
              // If an auto-suggested location is not selected, persist the dropdown list on the next ENTER.
              showSuggestions();
            }
            //only submits when the autocomplete dropdown is closed
            if ($('.pac-container:visible').length) {
              e.preventDefault();
            }
          }
        });

        $submitButton.click(function(e) {
          //only submits the form when the autocomplete dropdown is closed and a valid place is selected
          if ($('.pac-container:visible').length || !placeChanged) {
            errorMessage.addClass('has-error');
            e.preventDefault();
          } else {
            placeChanged = false;
          }
        })
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
