### Description
This Pattern shows a group of multiple General Teaser List patterns.

### Status
* Stable as of TBD

### Pattern Contains
* General Teaser

### JavaScript Used
* Accordion (js/modules/accordions.js)

### Usage Guidelines


### Variables
~~~
teaserListingGroup: {
  totalShown:
    type: number / required
  moreItemsLabel:
    type: string / required
  lessItemsLabel:
    type: string / required
  teaserListings: [
      type: teaserListing / required
  ],
  more: {
    type: link / optional
  }
}
~~~
