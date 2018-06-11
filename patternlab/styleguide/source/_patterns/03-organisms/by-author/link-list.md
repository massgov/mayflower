### Description
List of links that can be rendered stack or as two columns

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* Sidebar Heading
* Rich Text
* Decorative Link

### Variant options
* When a [Short List](./?p=organisms-link-list-with-short-list) is passed it renders as a single column
* Can be rendered a [Stacked](./?p=organisms-link-list-as-stacked) list instead of two columns
* A [short description](./?p=organisms-link-list-with-description) can be added to explain the contents of the list
* You can hide the [Bullets](./?p=organisms-link-list-as-helpful-links)
* Here's an example of how this pattern can be used to render as [Helpful Links](./?p=organisms-link-list-as-helpful-links)

### Usage Guidelines
* When this pattern is used in the Right Rail, the Comp Heading will render as a Sidebar Heading and the bullets will disappear.
* If a link has no href, it will be displayed as plain text.


### Variables
~~~
linkList : {
  compHeading: {
    type: compHeading / optional
  },
  sidebarHeading: { 
    type: sidebarHeading / optional
  },
  description: {
    type: richText / optional
  },
  stacked: 
    type: boolean
  hideBullets: 
    type: boolean
  links : [{
    type: array of decorativeLink / required
  }],
  more:
    type: decorativeLink / optional
}
~~~
