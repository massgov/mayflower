### Description
List of links that can be rendered stack or as two columns

### Status
* Obsolete as of 5.7.0
* Use [Link List](./?p=organisms-link-lists) instead

### Pattern Contains
* Comp Heading
* Decorative Link

### Variant options
* Rendered as [two columns](./?p=organisms-helpful-links-as-columns)


### Variables
~~~
helpfulLinks: {
  columns: 
    type: string ("", "true") / optional
  compHeading: {
    type: compHeading / required
  },
  items: [{
    type: array of decorativeLink / required
  }]
}
~~~
