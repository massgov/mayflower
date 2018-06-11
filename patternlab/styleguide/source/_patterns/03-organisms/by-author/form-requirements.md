### Description
This Pattern describes the requirements needed to complete a form page

### Status
* Stable as of 5.0.0

### Pattern Contains
* Column Heading
* Rich Text
* Location Icons

### Variant options
* When added to a [Two Column](./?p=organisms-form-requirements-in-two-column) template the background color bleeds out to the left.

### Variables
~~~
formRequirements: {
  rteTitle: {
    type: columnHeading / optional
  },

  richText: {
    type: richText / required
  },

  payment: (optional) {
    title: {
      type: columnHeading / required
    },

    locationIcons: {
      type: locationIcons / required
    }
  }
}
~~~
