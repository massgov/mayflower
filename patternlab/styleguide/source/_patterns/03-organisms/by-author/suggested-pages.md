### Description
This Pattern shows a collection of images and links to other pages on the site.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Illustrated link
* Decorative Link
* Image
* Link

### Variant options
* The pattern can be shown with [Illustrated Links](./?p=organisms-suggested-pages-guide)

## Usage Guidelines:
* This Pattern can show Illustrated links or Images with a link below, but it can not show both.
* Only three Illustrated Links should be shown or four Images with a link below.

### Variables
~~~
"suggestedPages": {
  "title": 
    type: string / required,
  "titleContext": 
    type: string / optional,
  "view": 
    type: string ('', 'guide') / optional,
  "pages": [{
    "image": 
      type: image / required,
    "link": {
      type: decorativeLink / required
    }
  }]
  "more": {
    type: link / optional
  }
}
~~~
