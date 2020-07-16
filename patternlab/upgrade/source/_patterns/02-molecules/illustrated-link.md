### Description: Displays a link as a card with an optional category label.

### Status
* Stable as of 4.0.0

### Pattern Contains
* Decorative Link

### Variant options
* if the image variable is set to null a [blue background](./?p=molecules-illustrated-link-without-image) will show in it's place.

### Variables
~~~
illustratedLink {
  text:
    type: string / required
  href:
    type: string / required
  type:
    type: string / ('', or 'external')
  image:
    type: string (path) / optional
  label:
    type: string / optional
}
~~~
