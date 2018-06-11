### Description
This is Event style content type.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Page Header
* Event Teaser
* Contact Us
* Image
* Page Overview
* Rich Text
* Form Downloads
* Contact List
* Link List
* Event Listing

### Variables
~~~
pageHeader: {
  type: pageHeader / required
},

mainContent: {
  pageOverview: {
    type: pageOverview / required
  },

  youWillNeed: {
    type: richText / optional
  },

  formDownloads: {
    type: formDownloads / optional
  },

  contactList: {
    type: contactList / required
  },

  mediaContact: {
    type: contactList / optional
  },

  linkList: {
    type: linkList / optional
  }
},

sideContent: {
  contactList: {
    type: contactList / required
  },

  mediaContact: {
    type: contactList / optional
  }
},

bottomContent: {
  eventListing: {
    type: eventListing / optional
  }
}
~~~
