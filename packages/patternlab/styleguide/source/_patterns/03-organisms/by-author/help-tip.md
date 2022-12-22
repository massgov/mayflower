### Description
This pattern allows an expandable content as a help tip triggered by part of a sentence. 

### Status
* New as of 11.26.0

### Pattern Contains
* Icon
* Paragraph

### Variables
~~~
helpTip: {
  textBefore: 
    type: string / optional
  textTrigger: 
    type: string / required
  textAfter:
    type: string / optional
  helpText:
    type: type: string or raw HTML / required
  id: 
    type: string / required
  expanded: 
    type: boolean / optional (defaults to false)
  isDescription:
    type: boolean / optional (defaults to false) - whether the helpTip is being referenced to as aria-describedBy
}
~~~

