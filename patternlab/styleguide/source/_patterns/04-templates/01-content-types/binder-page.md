### Description
This pattern is used as a template for Policy Advisory type pages and is based off of the Two Column template

### Status
* Stable as of 5.11.0

### Pattern Contains
* Illustrated Header
* Contact List
* Jump Links
* Rich Text
* Form Downloads
* Content Eyebrown
* Press Listing
* Event Listing
* This template contains [Twig Blocks](https://twig.symfony.com/doc/2.x/tags/extends.html) that can be used to populated the Page Content, Right Rail, or Post Content sections with patterns found in Mayflower

### JavaScript Used
* Contact List (js/modules/accordions.js)
* Footnote List (js/modules/footnote.js)
* Jump Links (js/modules/scrollAnchors.js)

### Variables
~~~
contentEyebrow: {
  type: contentEyebrow / required
},

pageHeader: {
  type: pageHeader / required
},

jumpLinks: {
  type: jumpLinks / optional
},

listingTable: {
  type: listingTable / required
},

mainContent: {
  contents: [{
    type: array of richText / required
  }],

  tableOfContentsSections: [{
    type: array of tableOfContentsHeirarchy / optional
  }],

  formDownloads: {
    type: formDownloads / optional
  },

  contactList: {
    type: contactList / required
  }

},

sideContent: {
  contactList: {
    type: contactList / required
  },

  pressListing: {
    type: pressListing / optional
  },

  eventListing: {
    type: eventListing / optional
  }
}
~~~
