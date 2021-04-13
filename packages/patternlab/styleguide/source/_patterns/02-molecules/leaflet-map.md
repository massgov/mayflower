### Description
A leaflet map with multiple markers and info windows

### Status
* Stable as of 5.0.0


### JavaScript Used
* Leaflet's API (https://leafletjs.com/)
* The rendering of the map (js/modules/leafletMap.js)

### Variables
~~~
leafletMap: {
  isStatic: 
    type: boolean (1 or 0) / required,
  hideAttribution: 
    type: boolean (1 or 0) / required,
  map: {
    center: {
      lat:
        type: float / required
      lng:
        type: float / required
      }
    },
    markers: [{
      position: {
        lat:
          type: float / required
        lng:
          type: float / required
      },
      label:
        type: string / required
      infoWindow: {
        name:
          type: string / required
        phone:
          type: string (number with no spaces) / optional
        fax:
          type: string / optional
        email:
          type: string / optional
        address:
          type: string / required
        directions:
          type: string (url to goole maps) / optional
      }
    }]
  }
}
~~~
