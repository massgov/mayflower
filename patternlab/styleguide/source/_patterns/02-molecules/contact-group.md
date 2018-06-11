### Description
This pattern shows a group of related contact information (phone, fax, online, or address).

### Status
* Stable as of 5.0.0

### Pattern Contains
* Contact Item
* Decorative Link

### Variant options
* Phone is currently shown
* [Online](./?p=molecules-contact-group-as-online)
* [Fax](./?p=molecules-contact-group-as-fax)
* [Address](./?p=molecules-contact-group-as-address)


### Variables
~~~
group: {
  icon:
    type: string (path to icon) / optional
  name:
    type: string ("Phone", "Online", "Fax", or "Address") / optional
  level:
    type: number / optional
  contactName:
    type: string / optional
  items: [{
    type: 
      type: string ("phone", "online", "email", "address" ) / required,
    label:
      type: string / optional
    address:
      type: string (html allowed) / optional
    link: {
      type: decorativeLink (href is optional for type "address") / required
    }
    details: 
      type: string / optional
  }]
}
~~~
