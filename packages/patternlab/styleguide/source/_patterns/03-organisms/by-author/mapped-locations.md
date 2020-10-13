### Description
A google map with a title, paragraph, and see all button

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* Paragraph
* Button
* Google Map

### Variant options
* Wrapped in a colored [container](./?p=organisms-mapped-locations-contained)

### Usage Guidelines
* Lead text should be a short paragraph describing the function of the button below. Simple text (no links) Language on both can coincide with one another to create intrigue to click CTA. No longer than one paragraph for lead-in text.
* The "All locations" button should take the user to a page that lists out all of the address contained within the map. 30 characters for button max.

### JavaScript Used
* This pattern uses JavaScript for the Google map (js/modules/googleMap.js)

### Variables
~~~
mappedLocations: {
  compHeading:
    type: compHeading / optional
  paragraph:
    type: paragraph / optional
  button:
    type: button / optional
  map:
    type: googleMap / required
}
~~~
