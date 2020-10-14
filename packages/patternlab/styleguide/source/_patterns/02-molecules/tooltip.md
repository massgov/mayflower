### Description
This pattern show a modal with helpful information.

### Status
* Stable as of 5.0.0

### Variables
~~~
tooltip: {
  controlId: 
    type: string (unique per page) / required,
  location: 
    type: string / optional ('' or above')
  info: 
    type: string / required (description on link for screen readers)
  openText: 
    type: string / required
  openIcon: 
    type: string / path / optional
  closeText: 
    type: string / required,
  title: 
    type: string / optional,
  level
    type: number / optional
  message: 
    type rich text / required. 
}
~~~
