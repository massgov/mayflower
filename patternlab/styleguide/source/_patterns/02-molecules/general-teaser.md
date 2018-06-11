### Description
Short multi-use teaser with an optional image. This pattern can display the photo and details with one of three layouts:
stacked (with the contents in a single column), side-by-side (with the text content alongside the image) or
contents-stacked (contents under the image, eyebrow/title/emphasized text displayed next to the image). If the provided
image is too large, the content will wrap and appear in a single column, regardless of the specified layout.

If a teaser image is provided, it will link to the title's href, if set.

### Status
* Stable as of TBA

### Pattern Contains
* Decorative Link
* Image
* Rich Text
* [General Teaser Title](/?p=molecules-general-teaser-title)
* [General Teaser Eyebrow](/?p=molecules-general-teaser-eyebrow)
* [General Teaser Emphasized Text ](/?p=molecules-general-teaser-emphasizedText)


### Variables
~~~
generalTeaser : {
  layout:
    type: string / optional
  image:
    type: image / optional
  eyebrow:
    type: string / optional
  title : {
    type: decorativeLink / required
  },
  level:
    type: number / optional
  emphasizedText: [
    type: array of string / optional,
  ],
  contents: (optional) [{
    path:
      type: string (path to pattern) / required
    data: {
      type: object / contains data object of pattern to include
    }
  }]
}
~~~
