### Description
Renders an inline list of links or text items (if URL is not provided for the link).
It provides an alternative background using the "background" variable.


### Variables
~~~
inlineLinks: {
  ariaLabel: string / optional
  background: [{null, "gray"}] / optional
  links: [{
    text:
      type: string / required,
    href:
      type: string (url) / optional,
    info:
      type: string / optional
  }]
}
~~~
