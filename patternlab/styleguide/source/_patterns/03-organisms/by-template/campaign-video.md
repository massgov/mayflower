### Description
Displays a campaign video using an iframe with a transcript link.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Decorative Link

### Variant options
* This pattern includes an optional link to a page containing a transcript of the video
* This pattern can also by floated to the right by setting the position to ['right'](./?p=atoms-video-as-floated-right)
* This pattern can have its background set to one of five colors:

  * Bay Blue (primary)
  * Berkshires Green (primary-alt)
  * White (white)
  * Light Gray (gray-lightest)
  * Pale Blue (primary-lightest)

  When the component is used as a header, only primary and primary-alt
  are available as background colors.

### Variables
~~~
isHeader:
  type: bool / required
backgroundColor:
  type: string / optional ("", "primary", "primary-alt", "white", "gray-lightest", "primary-lightest")
description
  type: string / optional
video {
  src: 
    type: string (video url) / required
  label: 
    type: string / required
  width: 
    type: string (numbers only) / optional
  height:
    type: string (numbers only) / optional
  link: 
    type: decorativeLink / required
  position: 
    type: string ('', 'right') / optional
}
~~~
