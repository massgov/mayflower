### Description
This pattern shows a Form with inputs to filter location and date range.

### Status 
* Stable as of 5.0.0

### Pattern Contains
* Input Text
* Date Range

### JavaScript Used
* Location Filters (js/modules/locationFilters.js)

### Usage Guidelines
* `zipcode.placeAutocomplete.bounds` sets default bounds for google maps api place autocomplete (see: [google maps api docs: LatLngBounds](https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds)) which will be used in `/assets/js/modules/eventFilters`.

### Required Variables
~~~
{
  eventFilters: {
    zipcode: {    
      inputText: {
        type: inputText / required
      },
      
      placeAutoComplet: {
        bounds: {
          sw: {
            lat: 
              type: int, latitude
            lng:
              type: int, longitude
          },
          ne: {
            lat: 
              type: int, latitude
            lng:
              type: int, longitude
          }
        }
      }
    },
    
    dateRange: {
      type: dateRange / optional
    },

  buttons: [{
    type: array of Button / required
  }]
}
~~~
