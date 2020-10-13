### Description
This is an example of a Mass.gov Organization page variant that demonstrates an additional "Board Members" section. The page uses a stacked row template.

### Status
* Stable as of TBA

### Pattern Contains
* Header
* Footer
* Stacked Row (template)
* Page Header - location
* Page Banner - large
* Rich Text
* Teaser Listing
* General Teaser
* Icon Links
* Action Finder
* Mapped Locations
* Section Three Up
* Link List


### Variables
See Patterns above
~~~
pageBanner: {
  type: pageBanner / required
},

pageHeader: {
  type: pageHeader / required
},

stackedRows: [{
  type: array of stackedRows / required
}]
~~~
