### Description
This pattern has a message/overview about the page navigated through the link followed.

### Status
* Stable as of 9.49.0

### Variables
~~~
calloutMessage {
  theme:
    type: string / optional
  message: {
    type: richText / required,
  }
  link: {
    type: calloutLink / required,
  }
}
~~~
