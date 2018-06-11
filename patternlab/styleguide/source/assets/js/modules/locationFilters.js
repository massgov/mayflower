export default function (window,document,$,undefined) {
  $('.js-location-filters').each(function(){
    let $el = $(this);

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
      let formData = getFormData({$form: $(this)});

      // Trigger location listing filter event with current filter values.
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

}(window,document,jQuery);
