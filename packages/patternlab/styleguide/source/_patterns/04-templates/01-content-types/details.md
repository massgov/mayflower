### Description
This pattern is based off of the Two Column template with an additional sticky left nav.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Page Header
* Contact List
* Colored Heading
* Sticky Nav
* This template contains [Twig Blocks](https://twig.symfony.com/doc/2.x/tags/extends.html) that can be used to populated the Page Content, Right Rail, or Post Content sections with patterns found in Mayflower


### JavaScript Used
* Sticky Nav (js/modules/scrollAnchors.js)
* Contact List Accordion (js/modules/accordions.js)


### Variables
~~~
details: {
  contentTitle: 
    type: string / required
},

pageHeader: {
  type: pageHeader / required
},

stickyNav: {
  type: stickyNav / required
},

sidebar: {
  coloredHeadings: 
    type: boolean (should always be true),

  contactList: {
    type: contactList / required
  }
}
~~~
