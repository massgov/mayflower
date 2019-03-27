### Description
This is an example of a Detail page for the Service, HowTo, and Location content type pages.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Header
* Footer
* Two Column (template)
* Rich Text
* Mapped Locations
* Video
* Form Downloads
* Link Lists

### JavaScript Used
* This pattern uses JavaScript for the accordions (js/modules/accordions.js)

### Variables
~~~
pageHeader: {
  type: pageHeader / required
},

sections: [{
  richText: {
    type: richText / required
  },
  video: {
    type: video / optional
  },
  mappedLocations: {
    type: mappedLocations / optional
  },
  formDownloads: {
    type: formDownloads / optional
  }
}],

sidebar: {
  linkList : {
    type: linkList / optional
  }
}
~~~
