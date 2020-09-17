### Description
This is an app for filtering a set of locations displayed in list and map form.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Location Filters
* Image Promo
* Google Map
* Results Heading
* Pagination

### Usage Guidelines
* Set the `maxItem` variable to restrict the results into "pages" 

### JavaScript Used
* This pattern uses JavaScript for filtering the results (js/modules/locationListing.js)

### Variables
~~~
locationListing: {
  maxItems: 
    type: integer / optional
  locationFilters: {
    type: LocationFilters / required
  }
  googleMap: {
    type: googleMap / required
  }
  resultsHeading: {
    type: resultsHeading / required
  }
  imagePromos: {
    type: imagePromos / required
  }
  pagination: {
    type: pagination / required
  }
}
~~~
