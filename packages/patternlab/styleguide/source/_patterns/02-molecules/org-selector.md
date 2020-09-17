### Description
This pattern is an interactive select box that when changed will shows a brief description of an organization.  The description of the organization is rendered using a Handlebar template (js/templates/orgInfo.html)

### Status
* Stable as of 5.0.0

### Pattern Contains
* Select Box

### Usage Guidelines
* The organizations array is consumed by JavaScript
* The organizations.value should be the same value used in the select box.

### JavaScript Used
* This pattern uses JavaScript to render the organization's information (js/modules/orgSelector.js)

### Variables
~~~
orgSelector: {
  selectBox:{
    type: selectBox / required
  },

  organizations: [{
    value: 
      type: string / required
    image: {
      href:
        type: string (url) / required 
      alt: 
        type: string / required,
      src: 
        type: string (image path) / required,
      height: 
        type: string (number) / required,
      width: 
        type: string (number) / required
    },
    name: {
      text: 
        type: string / required,
      href:
        type: string (url) / required
    },
    jobTitle: 
      type: string / required,
    message: 
      type: rich text / required,
    moreLink: {
      text: 
        type: string / required,
      href: 
        type: string (url) / required,
      info: 
        type: string / optional
    }
  }]
}
~~~
