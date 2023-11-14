### Description
This pattern is adds an `<h1>` page title and other helpful bit of content that helps define the page's purpose.

### Status
* Stable as of 5.0.0

### Variant options


### Variables
~~~
pageHeader: {
  publishState: {
    type: publishState / optional
  }
  prefix: (This is used as a default value for category, if category is set it will be overriden):
    type: string / optional
  category: 
    type: string / optional,
  subCategory:
    type: compHeading / optional,
  nested: (This will wrap subTitle into H1)
    type: boolean
  title:
    type: string / required
  titleSubText: (used to include title abbreviation)
    type: string / optional
  subTitle:
    type: string / optional
  description:
    type: string / optional
  links: [ / optional
    text: 
      type: string / required
    href: 
      type: string / optional
    info: 
      type: string / optional
    description: 
      type: string / optional
  ]
  buttonLabel: / optional
    type: text - label of the buttons, only rendered when buttons are added
  buttons: / optional
    type: array of buttons
  underline (This adds a short decorated separater under all page header content)
    type: boolean
------------------------------------------------------------------
Data below this line are passed into page-header-addons.twig, 
and page-header-addons.twig will need to be added separately.
------------------------------------------------------------------
  divider: (This adds a fullwidth decorated separater under page header addons)
    type: boolean
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
}
~~~
