### Description
This pattern shows a group of related contact information (phone, fax, online, or address) for a person.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Column Heading
* Rich Text Item
* Contact Item
* Decorative Link

### Variables
~~~
Name: {
  type: columnHeading / required
}
Title:
  type: string / optional
Organization:
  type: string / optional
Description: {
  type: richText / optional
}
groups: [{
  type: array of contactGroup / required
}]
~~~

