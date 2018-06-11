### Description
This pattern displays the contents of a rich text editor with an optional title and learn more link.

### Status
* Stable as of 5.0.0

### Pattern Contains
* headerIndent
* anchorLinks
* Comp Heading
* Sidebar Heading
* Decorative Link
* Acceptable patterns for Rich Text
  * Paragraph
  * Headings 2-6
  * Unordered List
  * Ordered List
  * Table
  * Check List
  * Icon List
  * Figure
* Any pattern can be rendered in this pattern by setting the `path` variable to the location of the pattern and setting the `data` variable to container of the data object of that pattern.  
  * {% include item.path with item.data %}
* rteElements [Twig block](https://twig.symfony.com/doc/2.x/tags/block.html)
    * allows implementers to iterate through their own loop to render child content.

### JavaScript Used
* This pattern uses JavaScript to wrap tables in a div with scrollbars, to optionally provide "outline" indentation of headings and child content, and to optionally add anchor links to headings  (js/modules/richText.js)

### Variables
~~~
richText: {

  headerIndent: {
    type: boolean / optional
  },
  anchorLinks: {
    type:boolean / optional
  },
  compHeading: {
    type: compHeading / optional
  },
  sidebarHeading: {
    type: sidebarHeading / optional
  },
  decorativeLink {
    type: decorativeLink / optional
  },
  rteElements: [{
    path: 
      type: string / required,
    data: {
      type: object / required
    }
  }]
}
~~~
