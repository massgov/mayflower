### Description
This Pattern shows a button with directional arrows, typically used to show sort order

### Status
* Stable as of 5.0.0

### Variant options
* The arrows can be changed to show [ascending](./?p=atoms-button-sort-as-ascending) or [descending](./?p=atoms-button-sort-as-descending) sort order instead of the default in active state

### Usage Guidelines:
- the gray triangle represents the current state.  The blue triangle is the clickable link.


### Variables
~~~
buttonSort {
  text: 
    type: string / required
  direction:
    type: string ("", "asc", "dsc")
}
~~~
