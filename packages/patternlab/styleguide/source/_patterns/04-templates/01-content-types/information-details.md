### Description
This pattern is based off of the Two Column template.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Page Header
* This template contains an optional Pre Content Media section
* This template contains [Twig Blocks](https://twig.symfony.com/doc/2.x/tags/extends.html) that can be used to populated the Page Content, Right Rail, or Post Content sections with patterns found in Mayflower

### JavaScript Used
* Image Fill (js/modules/imageFill.js)

### Variables
~~~
details: {
  contentTitle:
    type: string / required
},

pageHeader: {
  type: pageHeader / required
},

sidebar: {
  coloredHeadings:
    type: boolean (should always be true),

  contactList: {
    type: contactList / required
  }
}
~~~
