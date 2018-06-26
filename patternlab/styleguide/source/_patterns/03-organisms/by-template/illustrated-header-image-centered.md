### Description
This variation displays a centered image with a custom focalpoint in an illustrated header

### Status
* Stable as of 5.0.0

### Pattern Contains
* Page Header

### Variant options
* The image-centered variant is used for images with a [custom focal point](./?p=organisms-illustrated-header-image-centered)

### Variables
~~~
illustratedHeader: {
  bgTitle:
    type: string / optional (required with image)
  bgImage:
    type: string (image path) / optional
  retinaBgImage:
    type: string (image path) / optional
  bgCentered:
    type: bollean / optional
  category:
    type: string / required,
  pageHeader: {
    type: pageHeader / required
  }
}
~~~
