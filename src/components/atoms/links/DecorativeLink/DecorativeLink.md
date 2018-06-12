Description: This pattern shows a stylized `a` tag with an arrow icon.

### Status
* Stable as of 4.0.0

### Variables
~~~
decorativeLink {
  href:
    type: string (url) / required
  text:
    type: string / required
  info: 
    type: string (adds more description to the link) / optional
  showFileIcon:
    type: boolean (displays icon related to file extension of url) / optional / default value is false (do not display icon)
}
~~~
