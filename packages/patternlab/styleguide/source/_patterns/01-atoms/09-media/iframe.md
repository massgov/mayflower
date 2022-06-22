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
            "2-to-3": 150%, /* 2:3 Aspect Ratio -vertical */
            "3-to-4": 133.33%, /* 3:4 Aspect Ratio - verical */
            "1-to-1": 100%, /* 1:1 Aspect Ratio - square */
            "4-to-3": 75%, /* 4:3 Aspect Ratio - horizontal */
            "3-to-2": 66.66%, /* 3:2 Aspect Ratio - horizontal */
            "16-to-9": 56.25% /* 16:9 Aspect Ratio - horizontal */
      ] Note: passing in a ratio will override the iframe height, iframe will take up 100% of the width of the parent container will responsive height persisting the set aspect ratio.
}
~~~
