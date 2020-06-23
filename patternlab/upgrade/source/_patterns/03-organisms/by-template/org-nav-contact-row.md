### Description
Originally used throught the site, the pattern is now only used in the contact menu of the organization navigation submenu

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
