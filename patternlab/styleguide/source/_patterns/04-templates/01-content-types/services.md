### Description
Displays a collection of components to help describe an available Service on Mass Gov

### Status
* Stable as of 5.0.0

### Pattern Contains
* Page Banner organism
* Image atom
* Video atom
* Rich Text organisms
* Key Actions organism
* Icon Links organism
* Image Link List organism
* Action Finder organism
* Contact List organism
* Mapped Locations organism
* Split Columns organism
* Form Downloads organism


### Variant options
* Most of the elements on the page are optional.  The Page Banner, Intro text, and Google Map are required on this template.


### Notes
* This Pattern's Layout is based off of the Stack Row template
* The 50/50 columns contain a Linked List and a Form Downloads organism.

### Variables
~~~
{
  pageBanner:
    type: pageBanner / required

  introPageContent: {
    video: {
      type: video / optional
    }
    intro: {
      type: richText / required
    },

    keyActions: {
      type: keyActions / optional
    }
  },

  introSidebar: {
    logo: {
      type: image / optional
    },

    social: {
      iconLinks: {
        type: iconLinks / optional
      }
    },

    imageLinkList : {
      type: imageLinkList / optional
    }
  },

  doActionFinder: {
    actionFinder: {
      type: actionFinder / optional
    }
  },

  learnActionFinder: {
    actionFinder: {
      type: actionFinder / optional
    }
  },

  contactList: {
    type: contactList / required
  },

  mappedLocations: {
    type: mappedLocations / required
  },

  splitColumns: {
    type: splitColumns / optional
  }
}
~~~
