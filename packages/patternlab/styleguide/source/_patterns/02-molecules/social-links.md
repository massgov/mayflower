### Description
Displays a list of social links for sharing a page with an optional label

### Status
* Stable as of 5.0.0


### Variables
~~~
socialLinks: {
  label:
    type: string / optional
  inverted: 
    type: boolean / optional (default to false)
  theme:
    type: string / optional (options: "", "c-primary", "c-primary-alt", default to "")
  items: [{
    href: 
      type: string(url) / required,
    icon: 
      type: string(path to icon) / required
    altText:
      type: string / required for accessibilty
  }
}]
~~~
