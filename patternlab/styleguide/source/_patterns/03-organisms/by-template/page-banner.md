### Description
Full width banner image shown behind a wedge shaped overlay containing a title and an optional description or icon.

### Status
* Stable as of 5.0.0

### Variant options
* There are multiple layouts, in addition to the default: ['small'](./?p=organisms-page-banner-as-small), ['large'](./?p=organisms-page-banner-as-large), ['overlay'](./?p=organisms-page-banner-as-overlay), ['linked'](./?p=organisms-page-banner-as-linked), and ['columns'](./?p=organisms-page-banner-as-columns).
* There is ['blue'](./?p=organisms-page-banner-as-blue) option
* The icon and description are both optional

### Variables
~~~
pageBanner: {
  bgWide:
    type: string (image path - wide screens) / required
  bgNarrow:
    type: string (image path - narrow screens) / required
  size:
    type: string ('', 'small', 'medium', 'large', 'overlay', 'columns') / optional
  icon:
    type: string (path to icon file) / optional,
  title:
    type: string / required
  titleSubText:
    type: string / optional
  description:
    type: string / optional
  color:
    type: string ('', 'blue') / optional
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
