### Description
List of links with optional images

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* Sidebar Heading
* Image Link

### Variant options

### Usage Guidelines
* When this pattern is used in the Right Rail, the Comp Heading will render as a Sidebar Heading


### Variables
~~~
imageLinkList : {
  blocks: {
    type: boolean / option (defaults to false)
  },
  itemPluralName: {
    type: string / optional
  }
  compHeading: {
    type: compHeading / optional
  },
  sidebarHeading: {
    type: sidebarHeading / optional
  }
  links : [{
    type: array of imageLink / required
  }]
}
~~~
