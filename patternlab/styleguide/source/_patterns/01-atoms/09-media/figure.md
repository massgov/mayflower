### Description
This shows an Image using a `<figure>` elements with an optional caption

### Status
* Stable as of 5.0.0

### Variant options
* [Floated Left](/?p=atoms-figure-left)
* [Floated Right](/?p=atoms-figure-right)
* [Full Container Width](/?p=atoms-figure-full)


### Variables
~~~
figure: {
  align:
    type: string ('left', 'right') / optional
  image: {
    alt:
      type: string / required
    src:
      type: string (url) / required
    height:
      type: string
    width:
      type: string
  }
  iframe: {
    src:
      type: string (url) / required
    title:
      type: string / required
    height:
      type: string
    width:
      type: string
  }
  dataviz: {
    id: string('small', 'medium', 'large') / optional
    size: string / optional
    src:
      type: string (url) / required
  }
  title:
    type: string
  caption:
    type: string
}
~~~
