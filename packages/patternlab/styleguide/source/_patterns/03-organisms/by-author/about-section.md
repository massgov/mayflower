### Description
An about section for the Elected Officials

### Status
* Stable as of 5.0.0

### Pattern Contains
* comp heading
* link
* icon link
* rich text
* person card (1 required, 2 optional)



### Variables
~~~
about: {
  title:
    type: string /required

  content:
    type: richtext / required

  socialLinks: [{
    type: icon links
  }]

  person:
    type: person card /required

  secondary_person:
    type: person card
}
~~~
