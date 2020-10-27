### Description
This pattern is used as a template for Bio type pages and is based off of the Two Column template

### Status
* Stable as of TBD

### Pattern Contains
* Header
* Footer
* Two Column (template)
* Header Tags
* Page Intro
* Rich Text
* Link List
* Personal Message
* Image
* Decorative Link
* Contact List
* Icon Links

### Variables
~~~
teaserListing: {
  pageHeader: {
    type: pageHeader / required
  },
  mainContent: {
    richText: {
      richText / optional
    },
    roles: {
      type: linkList / optional
    },
    personalMessage: {
      type: personalMessage / optional
    }
  },
  sideContent: {
    headshot: {
      image: {
        type: image / optional
      },
      downloadLink: {
        type: decorativeLink / optional
      }
    },
    contactList: {
      type: contactList / optional
    },
    social: {
      type: iconLinks / optional
    }
  }
}
~~~
