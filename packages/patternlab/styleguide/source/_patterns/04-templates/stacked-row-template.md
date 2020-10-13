### Description
This template allows you to have rows of content that are either full width or with a right rail.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Emergency Alerts
* Header
* Footer
* Jump Links
* Stacked Row Section
* This template contains [Twig Blocks](https://twig.symfony.com/doc/2.x/tags/extends.html) that can be used to populated the Header, Pre-Content, Post Content, and Footer sections with patterns found in Mayflower

### Usage Guidelines
* When using the Jump Links option, each Section should have a matching ID value in the compHeading.
* The Stacked Row Sections are used to populate the Page Content and Right Rail areas shown.

### JavaScript Used
* Jump Links (js/modules/scrollAnchors.js)
* Emergency Alerts (js/modules/emergencyAlerts.js)

### Usage Guidelines
* The ID value is used as an anchor tag when the Jump Links pattern is added as a table of contents (see guide pages)

### Variables
~~~
stackedRows: [{
  borderless:
    type: boolean / optional (defaults to false),
  title:
    type: string / optional,
  id: 
    type: string (unique per page) / optional
  pageContent: [{
    path: 
      type: string / required,
    data: {
      type: object / required
    }
  }],
  sideBar: (optional) [{
    path: 
      type: string / required,
    data: {
      type: object / required
    }
  }]
}]
~~~
