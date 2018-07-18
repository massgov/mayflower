export default function (window,document,$,undefined) {
  $('.js-location-filters').each(function(){
    let $el = $(this);

    // NJ - remove comment: within this scope that should be called on page load, call the new function to set form
    // data and then call the new function that used to be part of the submit.

    // When google map libraries are loaded, initialize places.autocomplete on the location input, if it exists.
    $(document).on('ma:LibrariesLoaded:GoogleMaps', function() {
      let $locationFilterParent = $('.js-filter-by-location', $el);
      let $locationFilter = $locationFilterParent.find('input');
      if ($locationFilter.length) {
        // Create the google places autocomplete object and associate it with the zip code text input.
        let locationInput = document.getElementById($locationFilter.attr('id'));
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
          placeIdOnly: true
        };
        ma.autocomplete = new google.maps.places.Autocomplete(locationInput, options);
      }
    });

    // Listen for new data from another component interaction (i.e. results heading), update form.
    $el.on('ma:FormFilter:DataUpdated', function(e, data){
      renderForm({clearedFilter: data.clearedFilter, $form: $el});
    });

    // Handle global form submission.
    $el.submit(function(e){
      e.preventDefault();
      // Update master data with the various filter values.
      // NJ - remove comment: move the next 6 lines of this function to a new named one so that it can be called
      // directly. We need to trigger this on page load after we have populated the form values.
      let formData = getFormData({$form: $(this)});

      pushFilterState(formData);

      // Trigger location listing filter event with current filter values.
      // NJ - Remove comment: Add another parameter to this event that controls whether or not the pager is reset,
      // because on submit, the pager should reset, but on page load, it should use the page parameter in the url.
      $el.trigger('ma:LocationFilter:FormSubmitted', [{formData: formData}]);
    });

  });

  function renderForm(args) {
    let clearedFilter = args.clearedFilter;
    // The clear all button was pressed.
    if (clearedFilter === "all") {
      clearForm(args);
    }
    // Single filter button was pressed.
    else {
      clearDeactivatedFilter(args);
    }
  }

  // NJ - remove comment: Add a new function that is just the opposite of this one. Instead of getting the form data, it
  // needs to set it from the get parameter (see lines 134-140 of locationListing.js to pull params from the url).

  function getFormData(args) {
    let $form = $(args.$form),
      $location = $form.find('.js-filter-by-location'),
      $tags = $form.find('.js-filter-by-tags'),
      formData = [];

    // Get location
    if ($location.find('input').length) {
      let place = $location.find('input').val();
      if (place) {
        formData.push({
          type: 'location',
          text: place,
          value: place
        });
      }
    }

    $tags.find('input:checked').each(function() {
      formData.push({'type': 'tag', 'value': $(this).val(), 'text': $(this).siblings("label").text()});
    });

    return formData;
  }

  function clearDeactivatedFilter(args) {
    let $form = $(args.$form),
      $place = $form.find('.js-filter-by-location'),
      $tags = $form.find('.js-filter-by-tags'),
      clearedFilter = args.clearedFilter;

    // If the cleared filter button was for a location filter.
    if (clearedFilter.type === 'location') {
      $place.find('input').val("");
      return;
    }

    // If the cleared filter button was for a tag filter.
    if (clearedFilter.type === 'tag') {
      $tags.find('input[type=checkbox][value=' + clearedFilter.value + ']').prop('checked', false);
    }
  }

  function clearForm(args) {
    let $form = $(args.$form),
      $tags = $('.js-filter-by-tags', $form),
      $place = $('.js-filter-by-location', $form).find('input');

    // Clear location text input.
    if ($place.length) {
      $place.val("");
    }
    // Uncheck all checked tags inputs.
    $tags.find('input:checked').prop('checked', false);
  }

  function pushFilterState(filters) {
    let params = new URLSearchParams(window.location.search);
    let pageNum = params.get('page');

    params.delete('location');
    params.delete('tags');

    if (filters.length) {
      filters.forEach((filter) => {
        params.set(filter.type, filter.value);
      });
    }

    history.pushState(
      { page: pageNum },
      `${document.title} | page ${pageNum}`, `${window.location.origin}${window.location.pathname}?${params.toString()}`
    );
  }

}(window,document,jQuery);
