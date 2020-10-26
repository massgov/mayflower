### Description
This pattern shows Left and Right arrows page links along with a blurb about the destination page being linked to

### Status
* Stable as of 5.0.0

### Pattern Contains
* Arrow Nav

### Variables
~~~
pageFlipper: {
  context : { /optional
    label: {
      type: string / required
    },
    link: {
      decorativeLink / required
    }
  },
  prev: {
    type: arrowNav / optional
  },
  next: {
    type: arrowNav / optional
  }
}
~~~
