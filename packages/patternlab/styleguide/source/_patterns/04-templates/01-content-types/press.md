### Description
This template is a collection of components to help describe a Press Release on Mass Gov and is based on the Two Column template

### Status
* Stable as of 5.0.0

### Pattern Contains
* Page Header
* Press Status
* Contact List
* Figure
* Video
* Rich Text
* Personal Message
* Press Listing

### JavaScript Used
* This pattern uses JavaScript for the accordions (js/modules/accordions.js)

### Variables
~~~
pageHeader: {
  type: pageHeader / required
},

pageContent: {
  pressStatus: {
    type: pressStatus / required
  },
  
  figure: {
    type: figure / optional
  },

  video: {
    type: video / optional
  },

  location: 
    type: string / optional,

  richText: {
    type: richText / required
  },

  contactList: {
    type: contactList / required
  },

  personalMessage: {
    type: personalMessage / optional
  }
},

sidebar: {
  contactList: {
    type: contactList / required
  },

  pressListing: {
    type: pressListing / optional
  }
}
~~~
