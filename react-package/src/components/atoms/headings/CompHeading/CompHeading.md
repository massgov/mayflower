### Description
A title with a styled, colored underline. The heading level and style are customizable. 

* `titleContext` adds a visibly hidden suffix to the `title` to provide context to assistive technologies like screen readers
* `sub` and `level` control the heading level:
  * Headings default to h2
  * A level (from 1 to 6) can be provided with `level`
  * `sub` is a deprecated option which sets the level to 3
* `color` is the color for the line under the heading:
  * If left blank, the line color defaults to green
  * Current permissible values are: `yellow` 

### Variables
~~~
compHeading: {
  title:
    type: string / required
  titleContex: 
    type: string / optional
  sub:
    type: boolean / optional / deprecated
  level:
    type: number / optional
  color:
    type: string ("yellow") / optional
  id:
    type: string (unique per page) / optional
  centered:
    type: boolean / optional
  sidebar: 
    type: boolean / optional
}
~~~