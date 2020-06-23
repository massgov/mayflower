### Description
This pattern shows a list of credits for images used on the page.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Link

### Variables
~~~
imageCredit: {
  items:[{
    caption: 
      type: string / required
    link: {
      type: link / optional
    }
    source:
      type: string / required (optional if link provided)
  }]
}
~~~
