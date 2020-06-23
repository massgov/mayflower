### Description
Displays a video using an iframe with an optional link.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Decorative Link

### Variant options
* This pattern includes an optional link to a page containing a transcript of the video
* This pattern can also by floated to the right by setting the position to ['right'](./?p=atoms-video-as-floated-right)

### Variables
~~~
video {
  src: 
    type: string (video url) / required
  label: 
    type: string / required
  width: 
    type: string (numbers only) / required
  height: 
    type: string (numbers only) / required
  link: 
    type: decorativeLink / optional
  position: 
    type: string ('', 'right') / optional
}
~~~


