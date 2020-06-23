### Description
This Pattern shows a list of Press Teaser patterns.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* Sidebar Heading
* Press Teaser
* Link

### Variant options
* Can be rendered followed by a [grid](./?p=organisms-press-listing-as-grid) of secondary Press Teasers

### Variables
~~~
pressListing: {
  compHeading: {
    type: compHeading / optional
  },
  sidebarHeading: {
    type: sidebarHeading / optional
  },
  items: [{
    type: pressTeaser / required
  }],
  "secondaryItems": [{
    type: pressTeaser / optional
  }],
  "more":{
    type: link / optional
  }
}
~~~
