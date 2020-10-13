### Description
This pattern shows an image banner with large search input as the focus followed by some helpful links.

### Status
* Stable as of 5.8.0

### Pattern Contains
* Page Intro
* Search Banner Form
* Link List

### Variables
~~~
searchBanner: {
  bgWide: 
    type: string (image path) / optional
  bgNarrow: 
    type: string (image path) / optional
  id:
    type: string (unique per page) / required
  imageName: 
    type: string / optional
  imageAuthor: 
    type: string / optional
  pageIntro: 
    type: pageIntro / required
  searchBannerForm: {
    type: searchBannerForm / required
  }
  linkList: {
    type: linkList / required
  }
}
~~~
