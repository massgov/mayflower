### Description
This is a set of columns designed to contain other patterns.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Any pattern can be rendered in these columns by setting the `path` variable to the location of the pattern and setting the `data` variable to container the data object of that pattern.  
  * {% include item.path with item.data %}


### Variant options
* Can be viewed as [two columns](./?p=organisms-split-columns-two)
* [Example](./?p=organisms-split-columns-example) two column including a Linked List and a Form Download


### Variables
~~~
splitColumns: {
  columns: [{
    items:[{
      path: 
        type: string / required,
      data: {
        type: object / required
      }
    }]
  }]
}
~~~
