### Description
This pattern shows an item of related contact information (phone, fax, online, or address).

### To do
This pattern currently depends on a wrapper to display properly. In the future, it should be updated to exist correctly on its own.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Decorative Link

### Variant options
* Phone is currently shown. The variants are shown for the group wrapper.
* [Online](./?p=molecules-contact-group-as-online)
* [Fax](./?p=molecules-contact-group-as-fax)
* [Address](./?p=molecules-contact-group-as-address)


### Variables
~~~
  item: {
    contactName:
      type: string / required,
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
  }
}
~~~
