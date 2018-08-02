### Description
This pattern is adds a block and layout for the contact us tab of the organization navigation

### Status
* Stable as of 5.0.0

### Pattern Contains
contact row



### Variables
~~~
orgMenuContactRow: {
  contactList: {
    compHeading: {
      type: compHeading / requited
    }
    hasManyAdditional: {
      type: true
    }
    additionalContacts:[{
      type: array of contactGroup / required
    }]
  },
  customItems / optional
  title:
      type: string / required
  link:
      type: link / required
  icon: 
      type: icon / required
}
~~~
