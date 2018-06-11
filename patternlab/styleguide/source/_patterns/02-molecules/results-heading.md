### Description
This Pattern contains a string of text with a range and total value followed by selected filters and controls for sorting.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Sort Results

### Usage Guidelines
For the tags:

* 'type' -> the "type" of filter (i.e. input label)
* 'text' -> the text displayed on the filter tag
* 'value' -> machine friendly version of filter text


### Variables
~~~
resultsHeading: {
  level:
    type: number / optional
  subject:
    type: string / optional
  numResults:
    type: string (number range '1-12') / optional 
  totalResults:
    type: string (numeric) / optional 
  sortResults: {
    type: sortResults / optional
  },
  tags (optional): [{
    type:
      type: string / optional
    text:
      type: string / required
    value: 
      type: string / optional
  }]
}
~~~
