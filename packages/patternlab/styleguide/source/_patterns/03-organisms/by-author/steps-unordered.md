### Description
An unordered list of steps with an optional description

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* sidebar Heading
* Rich Text
* Action Step

### JavaScript Used
* Accordions (js/modules/accordions.js)

### Variables
~~~
stepsUnordered: {
  compHeading: {
    type: compHeading / optional
  },
  sidebarHeading: {
    type: sidebarHeading / optional
  },
  richText {
    type: richText / optional
  }
  steps: [{
    type: array of actionStep / required
  }]
}
~~~
