### Description
Page Banner component that is composed of an H1 page title, featured image and description.

### Status
* New after v12.7.0

### Variant options
* Themes:
  - c-primary (Used on mass.gov for navigational pages)
  - primary (Used on mass.gov for navigational pages)
  - white
* Image
 - 


  "pageBanner": {
    "image": "../../assets/images/placeholder/2x1.png",
    "imageMedium": "../../assets/images/placeholder/4x3.png",
    "imageMobile": "../../assets/images/placeholder/2x1.png",
    "showMobileImage"
    "theme": "c-primary",
    "pageHeader": {
      "category": "Guide",
      "title": "Governor Maura Healey and Lt. Governor Kim Driscoll",
      "subTitle": "This is sub title",
      "description": "Have you lost your job? You may qualify for temporary income to support you while you look for a new one.",
      "headerTags": null
    }
  }
### Variables
~~~
pageBanner: {
  image:
    type: string (image path - wide screens 2:1 max rendering size @ 660 x 330px) / optional (required as the default image)
  imageMedium:
    type: string (image path - medium screens 4:3 max rendering size @ 460 x 345px) / optional
  imageMedium:
    type: string (image path - medium screens 2:1 480 x 240px) / optional
  showMobileImage:
    type: boolean / optional / default to false
  layout:
    type: string ('', 'taper', 'overlay') / optional
  renderImageOnMobile:
    type: boolean / optional / default to false
  icon:
    type: string (path to icon file) / optional
  title:
    type: string / required
  titleSubText:
    type: string / optional
  description:
    type: string / optional
  color:
    type: string ('', 'blue', 'green', 'white') / optional
  primaryLink: / opional
    text: string / required
    href: string / optional
    info: string / optional
    description: string / optional
  secondaryLink: / opional
    text: string / required
    href: string / optional
    info: string / optional
    description: string / optional
  buttonLabel: / optional
    type: text - label of the buttons, only rendered when buttons are added
  buttons: / optional
    type: array of buttons
}
~~~