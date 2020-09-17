### Description
This is the standard button pattern

### Status
* Stable as of 6.0.0

### Variant options
* Using a [link](./?p=atoms-button-as-link) instead of a button
* [small](./?p=atoms-button-as-small)
* [large](./?p=atoms-button-as-large)
* [secondary](./?p=atoms-button-as-secondary)
* [tertiary](./?p=atoms-button-as-tertiary)
* [quaternary](./?p=atoms-button-as-quaternary)


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
    type: string / optional ("", "c-primary-alt","c-highlight")
  usage: 
    type: string / optional ("","secondary","tertiary","quaternary")
}
~~~
