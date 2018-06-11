### Description
This Pattern contains a set of links used on other Patterns to navigate a list of content organized into groups (pages).

### Status
* Stable as of 5.0.0

### Variables
~~~
pagination: {
  next: {
    disabled: 
      type: boolean,
    text: 
      type: string / required
  },
  prev: {
    disabled: 
      type: boolean,
    text: 
      type: string / required
  },
  pages (optional): [{
    active: 
      type: boolean,
    text: 
      type: string / required
  }]
}
~~~
