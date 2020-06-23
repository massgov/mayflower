### Description
This is a filter page used to search for events.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Single Column (template)
* Page Header
* Event Filters
* Results Heading
* Event Listing
* Pagination


### JavaScript Used
* Not built yet


### Variables
~~~
pageHeader: {
  type: pageHeader / required
},

mainContent: {
  eventFilters: {
    type: eventFilters / required
  },

  resultsHeading: {
    type: resultsHeading / required
  },

  eventListing: {
    type: eventListing / required
  },

  pagination: {
    type: pagination / required
  }
}
~~~
