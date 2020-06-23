### Description
An ordered list of steps.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* sidebar Heading
* Action Step

### Variant options
* If there is [only one option](./?p=organisms-steps-ordered-just-one) they number icon is not rendered


### Variables
~~~
stepsOrdered: {
  compHeading: {
    type: compHeading / optional
  },
  sidebarHeading: {
    type: sidebarHeading / optional
  }
  steps: [{
    type: array of actionStep / required
  }]
}
~~~
