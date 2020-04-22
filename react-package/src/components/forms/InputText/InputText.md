### Description
A stylized text input field.

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
onChange:
  type: function / optional
defaultText:
  type: string / optional
~~~
