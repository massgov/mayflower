### Description
This Pattern contains the markup for the feedback form found in the footer of each page.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Input Groups - radio 
* input text
* textarea
* helper text
* header alerts

### Variables
~~~
feedbackForm: {
  formAction: 
    type: string (url) / required
  title:
    type: string / required
  org: 
    type: string / required
  query Legends: {
    type: string / required -- positive or negative
  } 
  inputGroup: {
    type: inputRadio / required
  }
  reportMessage:
    type: string / optional
  helperText:
    type: string / optional
  hiddenElements: 
    id: string / required
    name: string / required
    value: string / required
  submit: 
    type: submit / required
}
~~~
