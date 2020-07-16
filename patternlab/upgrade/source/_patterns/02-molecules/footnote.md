### Description
This pattern shows a Footnote that contains a two way link with a Rich Text footnote link else where on the page.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Rich Text

### JavaScript Used
* Links (js/modules/footnote.js)

### Variables
~~~
footnote: {
  number: 
    type: number / required
  target:
    type: string (id of rich text footnote) / required
  id:
    type: string (unique per page) / required
  richText: 
    type: richText / required 
}
~~~
