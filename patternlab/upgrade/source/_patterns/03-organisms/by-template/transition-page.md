### Description
This Pattern shows messaging and controls to allow a user to cancel or continue a request to another page.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Input Checkbox

### Usage Guidelines
* Submitting the form takes you to the next page.
* If the checkbox is selected then a cookie should be set preventing this page from appearing again.

### Variables
~~~
transitionPage: {
  icon: 
    type: string (icon path) / required
  message:
    type: string / required
  href: 
    type: string (url) / required
  submit: {
    type: Button / required
  } 
  back: 
    type: string / required
  inputCheckbox: {
    type: inputCheckbox / required
  }
}
~~~
