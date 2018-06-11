### Description
An illustrated pattern that displays an image, title, description and a link to further information

### Status
* Stable as of 5.0.0

### Pattern Contains
* Image
* Decorative Link
* Rich Text

### Variant options
* As used on the [location listing](./?p=molecules-image-promo-with-map-link) page

### Usage Guidelines
- The image is 190px wide with a variable height.
- Set location.map to true to create a JS link to interact with a google map.

### Variables
~~~
imagePromo: {
  title: {
    text: 
      type: string / required,
    href: 
      type: string(url) / optional
    info:
      type: string / optional
  }
  level:
    type: number / optional 
  image: (optional) {  
    src:
      type: string (image path) / required
    alt: 
      type: string / required - describes the image
    href: 
      type: string (url) / optional
  },
  description: {
    type: richText / optional
  },
  link: {
    type: decorativeLink / optional
  },
  location (optional) : {
    text: 
      type: string / optional
    map:
      type: boolean
  }
  phone (optional) {
    text: 
      type: string / required
  },
  tags (optional) : [{ 
    label: 
      type: string / required
    icon: 
      type: string (path to tag icon) / (required)
    id:
      type: string / required
  }]
}
~~~
