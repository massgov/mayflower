### Description
This is a row of content used in the Stacked Row Template

### Status
* Obsolute as of 5.7.0
* This code was added to the Stacked Row Template

### Pattern Contains
* Comp Heading
* Any pattern can be rendered in the Page Content and Right Rail sections by setting the 'path' variable to the location of the pattern and setting the 'data' variable to container the data object of that pattern.  
  * {% include content.path with content.data %}
  * {% include sidebar.path with sidebar.data %}

### Variant options
* Can be viewed as a [single column](./?p=organisms-stacked-row-section-single)

### Usage Guidelines
* The ID value is used as an anchor tag when the Jump Links pattern is added as a table of contents (see guide pages)
* Set `borderless` to true to remove the top border when there are multiple stacked rows.

### Variables
~~~
stackedRowSection: {
  borderless: 
    type: boolean / optional (defaults to false),
  title:
    type: string / optional,
  id: 
    type: string (unique per page) / optional
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
