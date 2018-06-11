### Description
This pattern is used as a template for Policy Advisory type pages and is based off of the Two Column template

### Status
* Stable as of 5.0.0

### Pattern Contains
* Page Header
* Contact List
* Jump Links
* Rich Text
* Form Downloads
* Footnote list
* Header Tags
* Press Listing
* Event Listing
* This template contains [Twig Blocks](https://twig.symfony.com/doc/2.x/tags/extends.html) that can be used to populated the Page Content, Right Rail, or Post Content sections with patterns found in Mayflower

### JavaScript Used
* Contact List (js/modules/accordions.js)
* Footnote List (js/modules/footnote.js)
* Jump Links (js/modules/scrollAnchors.js)

### Variables
~~~
pageHeader: {
  type: pageHeader / required
},

jumpLinks: {
  type: jumpLinks / optional
},

mainContent: {
  contents: [{
    type: array of richText / required
  }],

  formDownloads: {
    type: formDownloads / optional
  },

  contactList: {
    type: contactList / required
  },

  footnoteList: {
    type: footnoteList / optional
  },

  references: {
    type: headerTags / optional
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
