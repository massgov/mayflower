### Description
This pattern renders a group of radio buttons or checkboxes with an optional title.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Input Checkbox
* Input Radio

### Variant options
* The pattern can also be rendered with [checkboxes](./?p=atoms-input-group-checkbox)
* The input can be rendered inline for [radio buttons](./?p=atoms-input-group-radio-inline) and [checkboxes](./?p=atoms-input-group-checkbox-inline)

### Usage Guidelines:
- radio button groups should always have the `required` variable set to true since radio inputs are never optional

### Variables
~~~
inputGroup: {
  required: 
    type: boolean
  inline: 
    type: boolean
  title: 
    type: string / optional 
  type: 
    type: string ('radio' or 'checkbox') / required
  items: [{
    type: array of inputRadio / required.
  }]
}
~~~
