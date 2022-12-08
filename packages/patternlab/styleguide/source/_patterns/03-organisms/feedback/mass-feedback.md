### Description
This Pattern contains the markup for the feedback form found in the footer of each page.

### Status
* Stable as of 5.0.0
* Changed as of 11.26.0

### Pattern Contains
* Input Groups - radio 
* Textarea
* Help Tip
* Decorative Link

### Variables
~~~
feedbackForm: {
  {
    "formAction": string (url) / required,
    "heading": string / required, (form heading H2)
    "title": {
      "value": string / required, (field 1 question)
      "required": boolean / optional (default to false)
    },
    "inputGroup": {
      type: inputRadio / required
    },
    "queryAffirmative": {
      "value": string / required,
      "required": boolean / optional (default to false)
    },
    "queryNegative": {
      "value": string / required,
      "required": boolean / optional (default to false)
    },
    helpTip: {
      type: helpTip / optional
    },
    "alert": {
      "text": string / optional,
      "link": {
        type: link / optional
      } 
    },
    "affirmativeTextarea": {
      type: textarea / required
    },
    "negativeTextarea": {
      type: textarea / required
    },
    "alertMsg": rawHTML / optional,
    "warnMsg": rawHTML / optional,
    "hiddenElements": [
      {
        id: string / required
        name: string / required
        value: string / required
      }
    ],
    "showWarnMsg": boolean / optional (default to true) - whether to display the warning message by default
    "submitted": boolean / optional (default to false) - whether to display the success message screen
    "success": {
      "before": rawHTML / optional,
      "after": rawHTML / optional
    }
  }
}
~~~


