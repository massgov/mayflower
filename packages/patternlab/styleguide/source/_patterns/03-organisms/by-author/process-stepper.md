### Description
An ordered list of steps with connecting lines, typically used for long processes.

### Status
* Stable

### Pattern Contains
* Comp Heading
* Process Step

### Variables
~~~
processStepper: {
  compHeading: {
    type: compHeading / optional
  },
  steps: [{
    type: array of processStep / required
  }]
}
~~~
