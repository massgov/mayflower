### Description
Example of a Mass Gov Link Listing page using the stacked row template

### Status
* Stable as of 5.0.0

### Pattern Contains
* Header
* Footer
* Page Header
* Stacked Row (template)
* Form Downloads (listing variant)

### Usage Guidelines
* When using the Jump Links option, each Section should have a matching ID value in the compHeading.
* The Stacked Row Sections are used to populate the Page Content and Right Rail areas shown.
* The Stacked Row Sections each set their `borderless` variable to `true` to remove the top border between adjacent stacked rows.

### JavaScript Used
* Jump Links (js/modules/scrollAnchors.js)

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
