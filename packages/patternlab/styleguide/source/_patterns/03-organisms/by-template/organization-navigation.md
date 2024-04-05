### Description
This pattern is an in-page jump link navigation pattern, used on organization pages.

### Status
* Stable as of 5.0.0
* Major change after 12.6.0

### Variables
~~~
organizationNavigation {
    orgNavTitle: 
      type: string / required
      description: Used as part of aria label for the nav and the mobile toggle button text 
    orgNavAbbrev:
      type: string / required
      description: used in org search
    orgId: "6676"
      type: string / required
      description: used in org search
    orgSearch: 
      type: boolean / optional
      description: whether to render org search, used in org search
    orgNav: [
      {
        text:
          type: string / required
          description: jump link text
        id: 
          type: string / required
          description: jump link achor ID, must match the section/section header ID
      }
    ]
}



