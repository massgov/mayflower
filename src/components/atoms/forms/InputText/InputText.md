### Description
A stylized text input field.

### Changes for React
* `classes` array: To get this to work in React, a wrapper had to be added. To work with the SearchBannerForm component, the wrapper needs to have an appropriate class. This is passed in with the new `classes` array.

### Variables
~~~
labelText:
  type: string / required,
required: 
  type: boolean / optional
id: 
  type: string (unique per page) / required
name: 
  type: string / required
type:
  type: string (html5 input types => 'text','email', 'number', etc...) / required
maxlength:
  type: number / optional
pattern:
  type: string / optional (ex: "[0-9]" for numbers only)
width:
  type: number / optional
placeholder:
  type: string / optional
errorMsg:
  type: string / optional
classes:
  type: array (string) / optional
~~~
