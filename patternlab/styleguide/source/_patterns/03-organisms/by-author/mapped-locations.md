### Description
A google map with a title and see all link

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* Google Map
* Decorative Link

### Variant options
* Wrapped in a colored [container](./?p=organisms-mapped-locations-contained)

### Usage Guidelines
* The decorative link was placed above the map to make it easy for screen readers to use instead of placing it after the map like we normally do for a 'view more' type link.
* The decorative link should take the user to a page that lists out all of the address contained within the map.

### JavaScript Used
* This pattern uses JavaScript for the Google map (js/modules/googleMap.js)

### Variables
~~~
mappedLocations: {
  compHeading: 
    type: compHeading / optional
  contained: 
    type: boolean
  link: 
    type: decorativeLink / optional
  map: 
    type: googleMap / required
}
~~~
