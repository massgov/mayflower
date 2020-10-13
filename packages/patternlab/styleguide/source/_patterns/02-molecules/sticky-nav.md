### Description
This is a sticky navigation list with links to content within the page.

### Status
* Stable as of 5.0.0


### JavaScript Used
* Stick Nav (js/modules/scrollAnchors.js)
* Accordion (js/modules/accordions.js)

### Variables
~~~
stickyNav: {
  titleContext: 
    type: string / optional
  anchorLinks:[{
    href: 
      type: string (id of target) / required,
    text: 
      type: string / required
    info:
      type: string / required for screen readers 
  }]
}
~~~
