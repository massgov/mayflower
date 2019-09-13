### Description
Displays a campaign video using an iframe with a transcript link.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Decorative Link

### Variant options
* This pattern includes an optional link to a page containing a transcript of the video
* This pattern can also by floated to the right by setting the position to ['right'](./?p=atoms-video-as-floated-right)

### Variables
~~~
isHeader:
  type: bool / required
backgroundColor:
  type: string / optional ("", "primary", "primary-alt", "white", "gray-lightest", "primary-lightest")
noVideoBg:
  type: bool / optional
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
