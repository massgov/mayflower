---
title: Iframe
---
Description: an atom for an '<iframe>' element.
## State: STABLE

### Used In:
~~~
This is an item in Section field in 'pageContent'.
~~~

### Variant options
~~~
* [No height provided](/?p=atoms-iframe-no-height-provided) - when no height is provided, iframes default to a responsive 16:9 aspect ratio
~~~

### Required Variables
~~~
iframe {
  src:
      type: string (url) / required
  title:
      type: string / required
  height:
      type: string / required
}
~~~
