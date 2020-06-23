### Description
This pattern is used as a template for Form Pages and is based off of the Two Column template

### Status
* Stable as of 5.0.0

### Pattern Contains
* Page Header 
* Form Requirements
* Error List
* Comp Heading
* Any pattern (ie: form inputs) can be rendered in this pattern by setting the `path` variable to the location of the pattern and setting the `data` variable to container of the data object of that pattern.  
  * {% include item.path with item.data %}
* This template contains [Twig Blocks](https://twig.symfony.com/doc/2.x/tags/extends.html) that can be used to populated the Page Content above the form, Page Content below the form, Right Rail, or Post Content sections with patterns found in Mayflower

### JavaScript Used
* Form fields (js/modules/formInputs.js)
  * General inputs and Textarea (js/modules/formInputs.js)
  * Select Box (js/modules/dropdowns.js)
  * Date input (js/modules/pickaday.js)
* Basic Form Validation (js/modules/formValidation.js)

### Variables
~~~
pageHeader: {
  type: pageHeader / required
},

formRequirements: {
  type: formRequirements / optional
},

sideContent: {
  contactList: {
    type: contactList / optional
  }
},

form: {
  action: 
    type: string (form action url) / required,

  errorList: {
    type: errorList / required
  },

  groups: [{
    compHeading: {
      type: compHeading / required
    },
    fieldsets: [{
      legend: 
        type: string / optional,
      items: [{
        path: 
          type: string / required,
        data: {
          type: object / required
        }
      }]
    }]
  }]
}
~~~
