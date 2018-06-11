### Description
This template is for the Organization Detail content type based on the stacked row template

### Status
* Stable as of 5.0.0

### Pattern Contains
* Emergency Alerts
* Header
* Footer
* Stacked Row Section
* This template contains [Twig Blocks](https://twig.symfony.com/doc/2.x/tags/extends.html) that can be used to populated the Header, Pre-Content, Post Content, and Footer sections with patterns found in Mayflower

### Usage Guidelines
* The Stacked Row Sections are used to populate the Page Content and Right Rail areas shown.

### JavaScript Used
* Emergency Alerts (js/modules/emergencyAlerts.js)

### Variables
~~~
stackedRows: [{
  title:
    type: string / optional,
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
