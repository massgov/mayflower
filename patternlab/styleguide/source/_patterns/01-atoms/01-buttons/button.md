### Description
This is the standard button pattern

### Status
* Stable as of 6.0.0

### Variant options
* Using a [link](./?p=atoms-button-as-link) instead of a button
* [small](./?p=atoms-button-as-small)
* [outline](./?p=atoms-button-as-outline)
* [gray](./?p=atoms-button-as-quaternary-color) color
* [green with an outline](./?p=atoms-button-as-secondary-color)


### Variables
~~~
button: {
  href:
    type: string (url) / optional
  info: 
    type: string / optional
  text: 
    type: string / required
  type:
    type: string / optional (ex: "button", "submit")
  size:
    type: string / optional ("" or "small")
  theme:
    type: string / optional ("", "secondary", or "quaternary")
  outline: 
    type: boolean
}
~~~
