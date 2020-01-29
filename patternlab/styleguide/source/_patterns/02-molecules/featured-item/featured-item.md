### Description
A Pattern that displays a photo and a call to action

### Status
* Stable as of 5.0.0

### Pattern Contains
* Image

### Variant options
* Tall - the tall variation requires 2 images. 1 for mobile which is the same as the standard image sizing, and one for larger viewports when the featured item spans 'two rows'.

### Usage Guidelines
* Text must be less than 60 characters. Truncate with an ellipsis after the last word that makes the string less than 60 characters.
* Image dimentions are:
  * image (standard): 4x3
  * featuredImage (tall): 3x5

### Variables
~~~
featuredItem: {
  href:
    type: string (url) / required
  text:
    type: string / required
  image: {
    alt:
      type: string / required
    src:
      type: string (url) / required
  },
  featuredImage: (Only required for 'tall' variant) {
    alt:
      type: string / required
    src:
      type: string (url) / required
  }
}
~~~
