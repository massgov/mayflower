### Description
This is Alert style content type.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Page Header
* Callout Time
* Comp Heading
* Contact List
* Rich Text
* This template contains [Twig Blocks](https://twig.symfony.com/doc/2.x/tags/extends.html) that can be used to populated the Page Content, Right Rail, or Post Content sections with patterns found in Mayflower

### JavaScript Used
* Contact List Accordion (js/modules/accordions.js)

### Variables
~~~
pageHeader: {
  type: pageHeader / required
},

pageContent: {
  alerts: [{
    compHeading: {
      type: compHeading / optional
    },
    calloutTime: {
      type: calloutTime / optional
    },
    richText: {
      type: richText / optional
    }
  }]
},

sideContent: {
  contactList: {
    type: contactList / required
  }
}
~~~
