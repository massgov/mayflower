### Description
This pattern appends additional elements to the main page header component - optional contents in the main well, and widgets in the right sidebar.

### Status
* New as of 11.11.0

### Pattern Contains
* Any pattern can be rendered in the optional content or widgets areas by setting the 'path' variable to the location of the pattern and setting the 'data' variable to container of the data object of that pattern.  
  * {% include item.path with item.data %}

### Variables
~~~
pageHeader: {
  fullWidth: 
    type: boolean (allow optionalContents to take up the entire container width when widgets is null) / optional - default to false
  divider:
    type: boolean (add a divider below the addons) / optional - default to false
  optionalContents: (optional) [{
    path:
      type: string (path to pattern) / required
    data: {
      type: object / contains data object of pattern to include
    }
  }]
  widgets: [{
    path:
      type: string (path to pattern) / required
    data: {
      type: object / contains data object of pattern to include
    }
  }]
}
~~~
