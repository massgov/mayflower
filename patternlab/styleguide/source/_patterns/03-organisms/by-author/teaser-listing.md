### Description
This Pattern shows a list of General Teaser patterns.

### Status
* Stable as of TBD

### Pattern Contains
* Comp heading
* Sidebar heading
* Paragraph
* General Teaser
* Link

### Variables
~~~
teaserListing: {
  compHeading: {
    type: compHeading / optional
  },
  sidebarHeading: {
    type: sidebarHeading / optional
  },
  stacked:
    type: boolean / optional,
  expandable:
    type: boolean / optional,
  accordionLabel:
    type: string / required if expandable is true
  itemsLabel:
    type: string / required if expandable is true
  featuredItems: [{
    type: generalTeaser / optional
  }],
  items: [{
    type: generalTeaser / optional
  }],
  more: {
    type: link / optional
  }
}
~~~
