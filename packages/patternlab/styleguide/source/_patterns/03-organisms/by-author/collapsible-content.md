### Description
This is pattern is used to display content collapsed into accordions with an optional title and description.

### Status
* Stable as of 5.7.0

### Pattern Contains
* Comp Heading
* Rich Text
* Collaspible Header
* Decorative Link
* Any pattern can be included in this pattern's body area by setting the 'path' variable to the location of the pattern and setting the 'data' variable to container of the data object of that pattern.  
  * {% include item.path with item.data %}

### Variant options
* This pattern could be used to show [steps to complete a task](./?p=organisms-collapsible-content-as-steps) or a list of [contacts](./?p=organisms-collapsible-content-as-contacts) 

### JavaScript Used
* This pattern uses JavaScript for the accordions (js/modules/accordions.js)

### Usage Guideline
* The accordions are collapsed by default, but you can set the `expanded` variable to true to have to show expanded on page load instead.

### Variables
~~~
"collapsibleContent": {
  "compHeading": {
    type: compHeading / optional
  },
  "description": {
    type: richText / optional
  },

  "items": [{
    "expanded": 
      type: boolean,
    "collapsibleHeader": {
      type: collapsibleHeader
    },
    "more": {
      type: decorativeLink / optional
    },
    "includes": [{
      "path": 
        type: string / required,
      "data": {
        type: object / required
    }]    
  }]
}
~~~
