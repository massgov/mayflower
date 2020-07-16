### Description
This Pattern shows a title with a styled underline color

### Status
* Stable as of 5.0.0

### Variant options
* [Sub Heading](./?p=atoms-comp-heading-subheading) by setting 'sub' to true.
* [Centered](./?p=atoms-comp-heading-centered) by setting 'centered' to true
* [Yelllow Underline](./?p=atoms-comp-heading-yellow) by setting 'color' to "yellow"

### Variables
~~~
compHeading: {
  title:
    type: string / required
  titleContex: 
    type: string / optional
  level:
    type: number / optional
  color:
    type: string ("yellow") / optional
  id:
    type: string (unique per page) / optional
  centered:
    type: boolean
  sidebar: 
    type: boolean
}
~~~
