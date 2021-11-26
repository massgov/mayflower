### Description
This is displays a Page Header pattern with an optional image off to the right

### Status
* Stable as of 5.0.0

### Pattern Contains
* Page Header

### Variant options
* Colored: If the image isn't used a [green](./?p=organisms-illustrated-header-colored) background is shown in it's place.
* Inverted: There is an inverted variation which uses a [blue](./?p=organisms-illustrated-header-inverted) background in place of the white in the standard variant.
* Image Centered: The image-centered variant is used for images with a [custom focal point] (./?p=organisms-illustrated-header-image-centered). Set `bgCentered` to true. 
* Plain: A plain header with on text and no image or color background.

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