### Description
Displays a set of links in a card layout.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Decorative Link
* Callout Link
* Cat Icon

### Variant options
* Can be used with [Callout Links](./?p=molecules-section-links-with-callout-links)

### JavaScript Used
* This pattern uses JavaScript for the accordions shown on narrow screens (js/modules/accordions.js)

### Variables
~~~
sectionLinks: {
  catIcon: { 
    type: catIcon / optional
  },
  title: {
    type: decorativeLink / required
  },
  level: 
    type: number / optional
  description:
    type: string / optional
  type:
    type: string ("", "callout") / optional
  links: [{
    type: decorativeLink and calloutLink / required
  }]
  seeAll: {
    type: decorativeLink / optional
  }
}
~~~
