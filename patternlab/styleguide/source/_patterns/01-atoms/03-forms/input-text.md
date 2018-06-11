### Description
This Pattern is a stylized input text field.

### Status
* Stable as of 5.0.0

### Variant options
* This pattern can be rendered with a fixed [width](./?p=atoms-input-text-with-width) and a [max character](./?p=atoms-input-text-with-max-char) length
* It can be used as a [number](./?p=atoms-input-text-for-number), [file](./?p=atoms-input-text-for-file), or any other HTML5 text input type.
* The label can also be visually [hidden](./?p=atoms-input-text-with-hidden-label)
* Next to the label, the word [optional](./?p=atoms-input-text-as-optional) appears if the input isn't required
* If the input is required and blank when submitted, it will display in an [error](./?p=atoms-input-text-as-error) state

### Usage Guidelines
* use the Input Date Pattern instead of setting the type variable to date here.


### JavaScript Used
* to increment the number input type and to enforce the [0-9] pattern value (js/modules/formInputs.js)


### Variables
~~~
inputText: {
  labelText:
    type: string / required,
  required: 
    type: boolean,
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
    type: string (number value) / optional
  placeholder:
    type: string / optional
  errorMsg:
    type: string / optional
}
~~~
