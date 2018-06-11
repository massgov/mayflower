Description: This pattern shows a link with an optional image

### Status
* Stable as of 6.0.0

### Pattern Contains
* Decorative Link


### Variables
~~~
imageLink: {
  block:
    type: boolean / optional (defaults to false)
  href:
    type: string / required
  text:
    type: string / required
  info:
    type: string (adds more description about the link) / optional
  image:
    type: optional
    src:
        type: string / required
    alt:
        type: string / required
}
~~~
