### Description
This pattern displays a collection of Contact Groups

### Status
* Stable as of 5.0.0

### Pattern Contains
* Column Heading
* Contact Group

### Variant options
* With a [linked title](./?p=molecules-contact-us-with-linked-title)
* As an [accordion](./?p=molecules-contact-us-as-accordion)


### Usage Guidelines
* This component can be viewed as an accordion or in list view
* When in the Accordion view, all or no contact groups (depending on accordion state)
* When in the List view, the first two contact groups or shown by default with the remainder collapsed.

### JavaScript Used
* This pattern uses JavaScript for the accordions (js/modules/accordions.js)

### Variables
~~~
contactUs: {
  accordion: 
    type: boolean
  isExpanded:
    type: boolean
  subTitle: {
    type: columnHeading / optional
  }
  showMore: {
    type: boolean / optional
  }
  hideSecondary: {
    type: boolean / optional
  }
  level:
    type: number / optional
  contactName:
    type: string / required
  groups: [{
    type: array of contactGroup / required
  }]
}
~~~
