Description: This pattern shows a link styled as a card

### Status
* Stable as of 6.0.0

### Pattern Contains
* SVG Arrow atom

### Variant options
* With [description](./?p=molecules-callout-link-as-description) text.
* With theme set to [white](./?p=molecules-callout-link-as-white)
* With [details](./?p=molecules-callout-link-with-details) with the `theme` set to "white", and a string supplied to the eyebrow, details, and emphasized properties.

### Variables
~~~
calloutLink: {
  href:
    type: string / required
  text:
    type: string / required
  info:
    type: string (adds more description about the link) / optional
  description:
    type: string (adds a short description under the title text) / optional
  theme:
    type: string (" " or "white") / optional
  eyebrow:
  	type: string / optional
  emphasized:
  	type: string / optional
  time:
  	type: string / optional
}
~~~
