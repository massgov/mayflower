### Description
Page Banner component that is composed of an H1 page title, with optional icon, featured image and description.

### Status
* Stable as of 5.0.0

### Variant options
* Layouts: 
  - ['taper'](./?p=organisms-page-banner-as-large) - Trepezoid solid color background, side-by-side image
  - ['overlay'](./?p=organisms-page-banner-as-overlay) - Transparent background color over an image
* Color themes:
  - blue (./?p=organisms-page-banner)
  - green
* The icon and description are both optional

### Variables
~~~
pageBanner: {
  bgWide:
    type: string (image path - wide screens) / required
  bgNarrow:
    type: string (image path - narrow screens) / required
  underline:
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
}
~~~