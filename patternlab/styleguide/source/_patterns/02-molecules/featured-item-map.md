### Description
A Pattern that displays a static google map image and a call to action

### Status
* Stable as of 5.0.0

### Pattern Contains
* Google Map


### Variables
~~~
featuredItem: {
  href:
    type: string (url) / required
  text:
    type: string / required
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
      }]
    }
  }
}
~~~
