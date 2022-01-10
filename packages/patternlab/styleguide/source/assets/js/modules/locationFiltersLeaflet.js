
export default (function (window,document,$,undefined) {

  function initFilters () {
    $('.js-location-filters').each(function() {
      let $el = $(this);
      debugger;
      let $resultHeading = $('.js-results-heading'),
        $clearAllButton = '.js-results-heading-clear', // events triggered on parent
        $filterButton = '.js-results-heading-tag' // events triggered on parent
        let $submitButton = $('.js-location-filters__submit');
        let $locationFilterParent = $('.js-filter-by-location', $el);
        const errorMessage = $locationFilterParent.find('.ma__error-msg')
        let $locationFilter = $locationFilterParent.find('input');

        

        // $el.onsubmit = (e) => {
        //   console.log('submit!')
        //   e.preventDefault();
        // }

        // $submitButton.onclick = (e) => e.preventDefault;
        // $el.addEventListener("keypress", function(event) {
        //   console.log('key pressed')
        //   if (event.key === "Enter") {
        //     alert(event.key  + " " + event.which);
        //     event.preventDefault();
        //   }
        // });

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
            fields: ['formatted_address', 'geometry', 'name'],
            componentRestrictions: {country: 'us'},
          };

          ma.autocomplete = new google.maps.places.Autocomplete(locationInput, options);


          var placeChanged = false;
          ma.autocomplete.addListener('place_changed', function() {
            console.log('changed')

            const place = ma.autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) {
              // User entered the name of a Place that was not suggested and
              // pressed the Enter key, or the Place Details request failed.
              errorMessage.addClass('has-error');
              console.log("Not a valid input: '" + place.name + "'");
              return;
            }

            placeChanged = true;
            errorMessage.removeClass('has-error');

            $(document).trigger('ma:GoogleMaps:placeChanged', place);
            console.log(place)
          }); 

          locationInput.onkeyup = (e) => {
            // console.log(e)
            const matches = document.querySelectorAll('.pac-item-query');
            const matchNodes = Array.from(matches)
            const suggestions = matchNodes.map((match) => match.innerText)
            console.log(suggestions)
          }

          google.maps.event.addDomListener(locationInput, 'keydown', function(e) { 
              if (e.key == 'Enter') {
                  //only submits when the autocomplete dropdown is closed and a valid place is selected
                  if ($('.pac-container:visible').length || !placeChanged) {
                    e.preventDefault(); 
                  } 
                  placeChanged = false; 
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
