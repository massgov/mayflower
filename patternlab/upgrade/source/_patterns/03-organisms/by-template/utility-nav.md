### Description
Sitewide utility links

### Status
* Stable as of 5.0.0

### Pattern Contains
* Utility Panel

### JavaScript Used
* Utility Nav (js/modules/utilNav.js)

### Variables
~~~
utilityNav: {
  items: [{
    text: 
      type: string / required
    ariaLabelText: 
      type: string / optional
    icon: 
      type: string (path to icon) / required
    closeText: 
      type: string / required
    panel: {
      type: utilityPanel / required
    }
  }]
}
~~~
