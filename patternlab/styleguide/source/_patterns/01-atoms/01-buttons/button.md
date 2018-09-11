### Description
This is the standard button pattern

### Status
* Stable as of 6.0.0

### Variant options
* Using a [link](./?p=atoms-button-as-link) instead of a button
* [small](./?p=atoms-button-as-small)
* [large](./?p=atoms-button-as-large)
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
    type: string / optional ("","small","large")
  theme:
    type: string / optional ("", "c-primary-alt", or "c-highlight")
  usage: 
    type: string / optional ("","secondary","tertiary","quaternary")
}
~~~
