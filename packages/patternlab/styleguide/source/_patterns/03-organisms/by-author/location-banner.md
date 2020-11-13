### Description
This is an banner pattern that combines an image an a google map.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Google Map


### JavaScript Used
* Google Map (js/modules/googleMap.js)

### Variables
~~~
locationBanner: {
  bgTitle:
    type: string / required (describes the images)
  bgWide:
    type: string (image path) / required,
  bgNarrow:
    type: string (image path) / required,
  id: 
    type: string (unique) / required,
  googleMap: {
    type: googleMap / required
  }
}
~~~
