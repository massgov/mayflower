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
    type: boolean / optional (default to false),
  hideAttribution: 
    type: boolean / optional (default to false),
  id: 
    type: string / required (A unique ID for the map)
  map: {
    center: {
      lat:
        type: float / required
      lng:
        type: float / required
      },
    zoom: 
      type: float / optional (If a zoom is not specificied, the zoom and center will be set automatically by the markers)
    },
    markers: [{
      position: {
        lat:
          type: float / required
        lng:
          type: float / required
      },
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
