### Description
Short teaser for a related press event with an optional image

### Status
* Stable as of 5.0.0

### Pattern Contains
* Decorative Link
* Rich Text


### Variables
~~~
pressTeaser : {
  image: (optional) {
    src:
      type: string (image path) / required
    alt: 
      type: string (imgage description) / required
  }
  eyebrow: 
    type: string / optional
  title : {
    type: decorativeLink / required
  },
  level:
    type: number / optional
  date: 
    type: string / optional,
  org: 
    type: string / optional,
  description: {
    type: richText / optional
  }
}
~~~
