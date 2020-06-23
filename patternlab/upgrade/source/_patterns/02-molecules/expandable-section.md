### Description
This Pattern shows an expandable sections with a section title and link.

### Status
* Stable as of 5.11.0

### Pattern Contains
* Decorated Link
* Download Link
* Expandable Section

### Usage Guidelines
* This is meant to be used to contain a section titles with child links/download links within accordions.

### Variables
~~~
expandableSection: {
  text: string / required,
  linkItems: [{
      type: decorativeLink or downloadLink
  }]
}
~~~
