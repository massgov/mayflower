### Description
This pattern shows a two column list of data rendered in a table.

### Status
* Stable as of 5.0.0

### Javascript used
* This pattern uses JavaScript for the accordions (js/modules/accordions.js)

### Variables
~~~
listingTable: {
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
