### Description
A list of events where each item displays the Name, Location, Time, Date and a brief description of that event

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* Sidebar Heading
* Event Teaser
* Link

### Variant options
* This pattern can also be used in the [Right Rail](./?p=organisms-event-listing-in-template) or as two columns with a background in [Post Content](./?p=organisms-event-listing-in-template)
* This Pattern can also be rendered as a [Grid](./?p=organisms-event-listing-as-grid)


### Variables
~~~
eventListing: {
  compHeading:{
    type: compHeading / optional
  },
  sidebarHeading:{
    type: compHeading / optional
  },
  emptyText: {
    type: string / optional
  }
  events:[{
    type: eventTeaser / required
  }],
  more:{
    type: link / optional
  }
  pastMore:{
    type: link / optional
  }
}
~~~
