### Description
This patten shows a grid of Callout Links Patterns, with optional heading and description

### Status
* New as of 11.24.0

### Pattern Contains
* Heading
* Callout Links


### Variables
~~~
calloutLinksThreeUp : {
  "headingText":
    type: string / optional,
  "headingDescription":
    type: string / optional,
  "headingLevel":
    type: number (1-4) / optional,
  "sections": [{
    type: array of sectionLinks / required
  }]
}
~~~
