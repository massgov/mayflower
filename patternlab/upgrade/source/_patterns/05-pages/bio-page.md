### Description
Example of a Bio page for Mass.gov

### Status
* Stable as of TBD

### Pattern Contains
* Header
* Footer
* Two Column (template)
* Page Header
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
