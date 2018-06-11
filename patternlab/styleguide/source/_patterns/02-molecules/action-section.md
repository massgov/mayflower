### Status
* Obsolete as of 5.0.0

Description: A section of content on an action page that includes a title and multiple types of content.
## State: DEPRECATED
### Notes
- This style is deprecated as it should be generalized to display anywhere in the site.
- The action section renders it's content using a rich text element. More information on how to setup a RTE can be found here: [@organisms/by-author/rich-text](?p=organisms-rich-text)
### Contains:
- [@atoms/04-headings/comp-heading](?p=atoms-comp-heading)
### Used in
- [@organisms/by-author/action-section](?p=organisms-action-section)
### Required Variables
~~~
actionSection: {
  title:
    type: string
  titleContext
    type: string / optional
  id:
    type: string
  path:
    type: string/template name/required
  data:
    richText: {
      property: 
        type: string/optional
      rteElements: [{
          ...
              rteElement object instances, see @organisms/by-author/rich-text
          ...
       }] / required    
    }   
}
~~~
