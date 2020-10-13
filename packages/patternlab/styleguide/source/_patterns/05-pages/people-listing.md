### Description
Example of a Mass Gov People Listing page using the stacked row template.

The page should use at least one `teaser-listing` organism as the `pageContent` of a `stackedRow`. If multiple lists are needed, they should each go in their own `stackedRow` to ensure a horizontal line appears between each of them.

Additional content, such as optional text, can be added as `optionalContents` to the `pageHeader`, `pageContent` of a `stackedRow`, or `optionalContents` of a `teaser-listing` based on the design requirements. 

### Status
* Stable as of TBA

### Pattern Contains
* Header
* Footer
* Page Header
* Teaser listing
* General Teaser
* Stacked Row (template)

### Variables
See Patterns above
~~~
pageHeader: {
  type: pageHeader / required
},

stackedRows: [{
  type: array of stackedRows / required
}]
~~~
