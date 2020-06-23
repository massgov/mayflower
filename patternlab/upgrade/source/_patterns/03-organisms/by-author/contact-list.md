### Description
Displays one of more Contacts Us patterns as a stacked list of accordions.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* Sidebar Heading
* Contact Us

### Variant options
* [Right Rail](./?p=organisms-contact-list-without-accordion) version

### Usage Guidelines
* The viewSpecific variable is used to hide the pattern in the Page Content area for wide screens and hide the pattern in the Sidebar area for narrow screens.  Typically this variable is used when you want to show the Contacts in the Right Rail of a two column template at the top of the Page Content when the columns stack.

### JavaScript Used
* This pattern uses JavaScript for the accordions (js/modules/accordions.js)

### Variables
~~~
contactList: {
  viewSpecific: 
    type: boolean,
  compHeading: {
    type: compHeading / optional
  },
  sidebarHeading: {
    type: sidebarHeading / optional
  }
  contacts:[{
    type: array of contactUs / required
  }]
}
~~~