### Description
This Pattern is a variant of the [details](./?p=templates-details) template that has been extended to include patterns needed to help provide information about a given location.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Header Alerts
* Page Header
* Location Banner
* Colored Heading
* Sticky Nav
* Contact List
* This template contains [Twig Blocks](https://twig.symfony.com/doc/2.x/tags/extends.html) that can be used to populated the Page Content, Right Rail, or Post Content sections with patterns found in Mayflower

### JavaScript Used
* Contact List Accordion (js/modules/accordions.js)
* Google Map (js/modules/googleMap.js)
* Sticky Nav (js/modules/scrollAnchors.js)

### Variables
~~~
{
  location: {
    contentTitle: 
      type: string / required
  },

  headerAlerts: [{
    type: array of headerAlerts / optional
  }],

  pageHeader: {
    type: pageHeader / required
  },
  
  locationBanner: {
    type: locationBanner / required
  },

  stickyNav: { 
    type: stickNav / required
  },

  mainContent: {
    contactList: {
      type: contactList / required.
    }
  },

  sidebar: {
    coloredHeadings: 
      type: boolean (should always be true),
    contactList: {      
      type: contactList / required.
    }
  }
}
~~~
