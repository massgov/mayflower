### Description
This is an banner pattern that combines an image an a leafletMap map.

### Status
* Stable as of 5.0.0

### Pattern Contains
* LeafletMap Map


### JavaScript Used
* LeafletMap Map (js/modules/leafletMapMap.js)

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
  leafletMapMap: {
    type: leafletMapMap / required
  }
}
~~~
