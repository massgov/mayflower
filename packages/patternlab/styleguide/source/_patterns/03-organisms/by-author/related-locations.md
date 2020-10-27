### Description
This Pattern shows a collection of related locations.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Illustrated link
* Decorative Link
* Image
* Link

## Usage Guidelines:
* This Pattern shows only three locations with a link below

### Variables
~~~
"relatedLocations": {
  "title": 
    type: string / required,
  "titleContext": 
    type: string / optional,
  "pages": [{
    "image": 
      type: image / required,
    "link": {
      type: decorativeLink / required
    }
  }]
}
~~~
