### Description
Emergency Alert message describing the event with a timestamp reflecting when this message was created.  An optional link is provided to take the user to page with more information

### Status
* Stable as of 5.0.0

### Pattern Contains
* Link

### Usage Guidelines
* The Link is optional.

### Variables
~~~
emergencyAlert: {
  message:
    type: string / required,
  timeStamp:
    type: date / required
    format: mm.dd.yy, h:mm am/pm
  link: {
    type: link (with chevron) / optional,
  }
}
~~~

