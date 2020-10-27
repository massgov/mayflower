### Description
This is stylized textarea input

### Status
* Stable as of 5.0.0

### Variant options
* a [maxlength](./?p=atoms-textarea-set-characters) restriction can be applied

### JavaScript Used
* This pattern uses JavaScript for the maxlength option to show the remaining character count (js/modules/formInputs.js)

### Variables
~~~
textarea:  {
  labelText:
    type: string / required,
  hiddenLabel:
    type: boolean,
  required: 
    type: boolean,
  maxlength:
    type: number / optional
  id: 
    type: string (unique per page) / required
  name: 
    type: string / required
}
~~~
