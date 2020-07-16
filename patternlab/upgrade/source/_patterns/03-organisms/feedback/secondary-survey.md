### Description
This Pattern contains the markup for the secondary feedback form found in the footer of each page.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Input Groups - radio 
* Input group - radio scale
* input text
* textarea

### Variables
~~~
secondarySurvey: {
  formAction: 
    type: string (url) / required
  inputGroup: {
    type: inputRadio / required
  }
  inputGroup: {
    type: radioScale / required
  }
  hiddenElements: 
    id: string / required
    name: string / required
    value: string / required
  submit: 
    type: submit / required
}
~~~
