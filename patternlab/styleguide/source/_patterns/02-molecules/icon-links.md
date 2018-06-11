### Description
This is a list of links with a corresponding icon.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* Icon List Item

### Variables
~~~
iconLinks: {
  compHeading: { 
    type: compHeading / optional
  },
  items: [{
    icon:
      type: string (path to SVG icon) / required
    link: {
      type: decorativeLink / required
    }
  }]
}
~~~
