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
      type: string / optional
  ratio:
      type: string / one of [
            "1-to-2": 200%, /* 2:3 Aspect Ratio - vertical */
            "2-to-3": 150%, /* 2:3 Aspect Ratio - vertical */
            "3-to-4": 133.33%, /* 3:4 Aspect Ratio - vertical */
            "1-to-1": 100%, /* 1:1 Aspect Ratio - square */
            "4-to-3": 75%, /* 4:3 Aspect Ratio - horizontal */
            "3-to-2": 66.66%, /* 3:2 Aspect Ratio - horizontal */
            "2-to-1": 50%, /* 2:1 Aspect Ratio - horizontal */
            "3-to-1": 33.33% /* 3:1 Aspect Ratio - horizontal */
      ] Note: passing in a height will override the responsive ratio. Iframe using the ratio will take up 100% of the width of the parent container, height is responsive to persist the set aspect ratio.
}
~~~
