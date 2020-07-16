### Description
A inline block'd display of radio options in a scaling format.

### Status
* Stable as of 5.0.0

### Notes
Component uses the "checkbox hack" for displaying the interactivity.

### Variables
~~~
radioScale: {
  fieldset: {
    fieldsetClasses:
      type: string / optional
  },
  legend: {
    text:
      type: string / optional,
    legendClasses:
      type: string / optional
  },
  beforeText: {
    text:
      type: string / optional
  },
  afterText: {
    text:
      type: string / optional
  },
  radioOptions: [{
    checked:
      type: boolean,
    for_id:
      type: boolean / required,
    name:
      type: boolean / required,
    value:
      type: boolean / required,
    text:
      type: string / required,
    labelClasses:
      type: string / optional,
    inputClasses:
      type: string / optional,
    textClasses:
      type: string / optional
  }]}
~~~

