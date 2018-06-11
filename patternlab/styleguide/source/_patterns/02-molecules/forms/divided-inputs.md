### Description
This pattern shows a collection of inputs separated by a custom divider.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Any input type pattern can be rendered in this pattern by setting the `path` variable to the location of the pattern and setting the `data` variable to container of the data object of that pattern.  
  * {% include input.path with input.data %}

### Variables
~~~
dividedInputs: {
  title: 
    type: string / optional
  required: 
    type: boolean,
  divider: 
    type: string / optional,
  inputs: [{
    path: 
      type: string / required
    data: {
      type: object / required (matches the pattern in the path)
    }
  }]
}
~~~
