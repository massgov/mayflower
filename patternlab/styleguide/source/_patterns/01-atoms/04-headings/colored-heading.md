### Description
An Heading element with a background color

### Status
* Stable as of 5.0.0

### Variant options
* With a [green](./?p=atoms-colored-heading-green) background
* Usage [example](./?p=atoms-colored-heading-usage-example) showing green heading for Page Content and gray for Right Rail
* With a [blue](./?p=atoms-colored-heading-blue) background

### Usage Guidelines
* Green color would only be used at the top of the Page Content
* Gray color would be used in the Right Rail
* When used in the Right Rail the diagonal will automatically appear on the left
* Blue color is only used for filter in the search application


### Variables
~~~
coloredHeading {
  text: 
    type: string / required
  titleContext: 
    type: string / optional
  color:
    type: string ('','green','blue') / optional
  level:
    type: number / optional
}
~~~
