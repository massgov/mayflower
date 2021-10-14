### Description
A collection of featured and general links

### Status
* Stable as of 5.0.0

### Pattern Contains
* Callout Link
* Illustrated Link
* Decorative Link

### Variant options
* [Without a Background](./?p=organisms-action-finder-without-background)
* [See All Link](./?p=organisms-action-finder-see-all)
* [Search Filter](./?p=organisms-action-finder-filter)


### Variables
~~~
actionFinder: {
  id:
    type: string (unique per page) /required 
  bgWide:
    type: string (image path) / optional / (required with bgNarrow)
  bgNarrow:
    type: string (image path) / optional
  title:
    type: string / required
  featuredHeading:
    type: string / required
  generalHeading:
    type: string / required
  noBgClass:
    type: string / optional, defaults to `ma__action-finder--no-background` which shows up as a light gray background, to remove the background colors, pass in `ma__action-finder--clear-background`.

  seeAll: {
    type: decorativeLink / optional
  }

  featuredLinks: [{
    type: illustratedLink or calloutLink / optional,
  }],

  links: [{
    type: illustratedLink or calloutLink / required,
  }]
}
~~~
