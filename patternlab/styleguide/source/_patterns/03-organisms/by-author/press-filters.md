### Description
This pattern shows a Form with inputs tailored to filtering Press Articles

### Status
* Stable as of 5.0.0

### Pattern Contains
* Colored Heading
* Org Selector
* Select Box
* Date Range
* Button


### Variables
~~~
pressFilters: {
  action:
    type: string (form's action url) / optional,
  coloredHeading: {
    type: coloredHeading
  },
  clearButton: {
    text :
      type: string / optional
    info :
      type: string / optional
  },

  orgSelector: {
    type: orgSelector / required
  },

  topic:{
    type: selectBox / required
  },

  pressType:{
    type: selectBox / required
  },

  dateRange: {
    type: dateRange / required
  },

  submitButton: {
    type: button / required
  }
}
~~~
