### Description
Displays one of more Contacts Group patterns as a static row of content alongside an image.

### Status


### Pattern Contains
* Comp Heading
* Image
* Contact Group
* Decorative Link

### Variant options

### Usage Guidelines
* The hasManyAdditional should be used as an explicit flag to denote that the additionalContacts array is longer than 1

### JavaScript Used


### Variables
~~~
contactList: {
  compHeading: {
    type: compHeading / requited
  },
  primaryContact: {
      type: contactGroup / optional
  }
  hasManyAdditional: {
    type: boolean / optional
  }
  additionalContacts:[{
    type: array of contactGroup / optional
  }]
  moreLink: {
      type: decorativeLink / optional
  }
}
~~~
