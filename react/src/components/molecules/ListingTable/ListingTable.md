### Description
This pattern shows a two column list of data rendered in a table.

### Javascript used
* This pattern uses JavaScript for the accordions (js/modules/accordions.js)

### Variables
~~~
listingTable: {
  heading: {
    title:
      type: string / required
    titleContext: 
      type: string / optional
    id: 
      type: string (unique per page) / optional
    sub: 
      type: string /optional
    level: 
      type: int / required
    color: 
      type: string /optional
    centered: 
      type: string /optional
    visuallyHidden: 
      type: boolean /optional (default: true)
  },
  rows: [{
    label:
      type: string / required
    visibleItems:
      type: int / optional (default: 2)
    moreLabel:
      type: string / optional (default: "show more")
    lessLabel:
      type: string / optional (default: "show less")
    items: [{
      text:
        type: string / required
    }]
  }]
}
~~~
