### Description
This pattern is adds a block and layout for the i want to tab of the organization navigation

### Status
* Stable as of 5.0.0

### Pattern Contains
link list

### Variables
~~~
linkList : {
  sectionClass: {
    type string / optional
  },
  compHeading: {
    type: compHeading / optional
  }
  stacked: 
    type: false
  hideBullets: 
    type: true
  links : [{
    type: array of decorativeLink / required
  }],
  more:
    type: decorativeLink / optional
}
~~~
