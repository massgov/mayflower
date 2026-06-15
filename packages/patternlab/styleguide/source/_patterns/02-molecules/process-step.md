### Description
A single step in a process-stepper, featuring a title and rich text content.

### Status
* Stable

### Pattern Contains
* Comp Heading
* Rich Text
* Form Downloads

### Variables
~~~
processStep: {
  title: "Step title",
  level: 3,
  richText: {
    type: object
  },
  content: [{
    type: array
  }],
  downloadLinks: [{
    downloadLink: {
      type: object
    }
  }]
}
~~~
