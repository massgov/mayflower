### Description
This is a page level alert message that can be dismissed.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Decorative Link

### JavaScript Used
* Cookies are used to hide the alert (js/modules/hideAlert.js)

### Variables
~~~
headerAlert: {
  id: 
    type: string (unique per page) / required
  prefix:
    type: string / optional (default "alert!")
  text: 
    type: string / required
  href:
    type: string (url) / optional
  info: 
    type: string / required with href
}
~~~
