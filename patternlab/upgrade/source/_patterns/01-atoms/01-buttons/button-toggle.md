---
title: Button Toggle
---
Description: Two linked `button` elements which toggle between two values.

### Status:
* New as of 5.14.0

### Variables:
~~~
buttonToggle {
  options: [{
    value:
      type: string / required
    text:
      type: string / required
    selected:
      type: boolean /required
  },{
    value:
      type: string / required
    text:
      type: string / required
    selected:
      type: boolean /required
  }]
  id:
    type: string (url) / required
  labelText:
    type: string / required
}
~~~
