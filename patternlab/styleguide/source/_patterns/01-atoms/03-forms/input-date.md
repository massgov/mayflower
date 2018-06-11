### Description
This is a Date Input field with a calendar interface.

### Status
* Stable as of 5.0.0

### Usage Guidelines:
* The 'restrict' variable controls whether the user can pick any date (''), today and prior ('max') or today and future ('min')

### JavaScript Used
* This pattern uses JavaScript for the Calendar interface (js/modules/pickaday.js)

### Variables
~~~
inputDate: {
  labelText:
    type: string / required,
  required: 
    type: boolean,
  id: 
    type: string (unique per page) / required
  name: 
    type: string / required
  placeholder:
    type: string / optional
  restrict:
    type: string ('','max','min') / optional
}
~~~
