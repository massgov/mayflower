### Description
The search form that displays in the header.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Button Search

### JavaScript Used
* Header Search (js/modules/mobileNav.js) 

### Variables
~~~
headerSearch : {
  placeholder:
    type: string / required,
  id:
    type: string (unique per page) / required,
  label: 
    type: string / required
  buttonSearch: 
    type: buttonSearch / required
  hasSuggestions:
    type: boolean / optional
  suggestedScopes: [{ / required if hasSuggestions is true
    value:
      type: string (slugified) / required
    type:
      type: string / required (currently available types: "org", "microsite" )
    label:
      type: string / required if hideLabel is falsy
    hideLabel: 
      type: boolean / optional
  }]
  defaultScope (optional - if present, will add a new hidden input on page load. This default scope is removed if one of the suggestedScopes is chosen to avoid filter parameters compounding) : { 
    value:
      type: string (slugified) / required
    type:
      type: string / required (currently available types: "org", "microsite" )
    label:
      type: string / required if hideLabel is falsy
    hideLabel: 
      type: boolean / optional
  }

}
~~~
