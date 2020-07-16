### Description
This is a row of content used in the Org Detail Template

### Status
* Stable as of 5.18.0

### Pattern Contains
* Comp Heading
* Any pattern can be rendered in the Page Content and Right Rail sections by setting the 'path' variable to the location of the pattern and setting the 'data' variable to container the data object of that pattern.  
  * {% include content.path with content.data %}
  * {% include sidebar.path with sidebar.data %}

### Variables
~~~
divider: boolean
stackedRow: {
  title:
    type: string / optional,
  pageContent: [{
    path: 
      type: string / required,
    data: {
      type: object / required
    }
  }],
  sideBar: (optional) [{
    path: 
      type: string / required,
    data: {
      type: object / required
    }
  }]
}
~~~
