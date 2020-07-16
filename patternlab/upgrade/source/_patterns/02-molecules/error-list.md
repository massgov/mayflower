### Description
Displays a list of error messages that link to the inputs on a form page.

### Status
* Stable as of 5.0.0

### JavaScript Used
* When used in a form (js/modules/formValidation.js)

### Variables
~~~
errorList: {
  title: 
    type: string / required
  labels: [{
    inputId: 
      type: string (unique per page) / required
    text: 
      type: string / required
    info:
      type: string / optional 
  }]
}
~~~
