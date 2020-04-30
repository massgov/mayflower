### Description
An `<ul>`  element with its child `<li>` elements and optional nested child `<ul>` and `<li>` elements.


### Status
* Stable as of 5.0.0

### Variables:
~~~
class:
  type: string / optional
unorderedList [{
  text:
    type: string / required
  sublist (optional) [{ 
    text:
      type: string / required
  }]
}]
~~~
~~~
