### Description
This pattern shows a list of links to downloadable files and online forms.  You can also include a link to another page, but that should be used sparingly.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Comp Heading
* Sidebar Heading
* Download Link

### Variables
~~~
formDownloads: {
  listing: 
    type: boolean / optional (defaults to false)
  compHeading: {
    type: compHeading / optional
  },
  sidebarHeading: {
    type: sidebarHeading / optional
  },
  "downloadLinks": [{
    "downloadLink": {
      type: downloadLink / required
    }
  }]
}
~~~
