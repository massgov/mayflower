### Description
This pattern is adds an `<h1>` page title and other helpful bit of content that helps define the page's purpose.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Header Tags
* Social Links
* Publish State
* Divider
* Any pattern can be rendered in the optional content or widgets areas by setting the 'path' variable to the location of the pattern and setting the 'data' variable to container of the data object of that pattern.  
  * {% include item.path with item.data %}

### Variant options
* As used on the [How To](./?p=organisms-page-header-for-howto) page 
* As used on the [Location](./?p=organisms-page-header-for-location) page 
* As used on the [Recurring Events](./?p=organisms-page-header-for-event) page 
* As used on the [Court Rules](./?p=organisms-page-header-for-court-rules) page


### Variables
~~~
pageHeader: {
  category: 
    type: string / optional,
  subCategory:
    type: compHeading / optional,
  divider: 
    type: boolean
  prefix:
    type: string / optional
  title:
    type: string / required
  subTitle:
    type: string / optional
  headerTags: {
    type: headerTags / optional
  }
  publishState: {
    type: publishState / optional
  }
  optionalContents: (optional) [{
    path:
      type: string (path to pattern) / required
    data: {
      type: object / contains data object of pattern to include
    }
  }]
  widgets: [{
    path:
      type: string (path to pattern) / required
    data: {
      type: object / contains data object of pattern to include
    }
  }]
~~~
