### Description
A google map with multiple markers and info windows

### Status
* Stable as of 5.0.0


### JavaScript Used
* Google's API (//maps.googleapis.com/maps/api/js)
* The rendering of the map (js/modules/googleMap.js)

### Variables
~~~
googleMap: {
  map: {
    center: {
      lat:
        type: float / required
      lng:
        type: float / required
      },
      zoom:
        type: integer / required
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
