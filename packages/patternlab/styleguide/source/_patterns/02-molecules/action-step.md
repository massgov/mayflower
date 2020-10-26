### Description
Displays details about how to complete a step.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Rich Text
* Form Downloads
* Decorative Link

### Variant options
* Displayed as an [accordion](./?p=molecules-action-step-as-accordion)


### JavaScript Used
* accordions (js/modules/accordions.js)

### Variables
~~~
actionStep: {
  accordion: 
    type: boolean
  isExpanded
    type: boolean
  accordionLabel: 
    type: string / required if accordion is set to true
  icon: 
    type: string (path to icon) / optional
  title: 
    type: string / required
  level:
    type: number / optional
  richText: 
    type: richText /required
  downloadLinks: (optional) [{ 
    downloadLink: 
      type: downloadLink / required
  }]
  decorativeLink: 
    type: decorativeLink / optional
}
~~~
