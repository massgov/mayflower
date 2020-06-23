### Description
Displays a multi-column list of links used in the footer

### Status
* Stable as of 5.0.0

### Variables
~~~
footerLinks: {
  items: [{
    heading: 
      type: string / required
    id:
      type: string (unique ID) / required
    links: [{
      href: 
        type: string (url) / required
      text:
        type: string / required
    }]
  }]
}
~~~
