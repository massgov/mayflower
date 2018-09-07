# Adding new SVG icons
## These are the steps involved to add a new SVG icon to the site
1. Add SVG file to the /assets/images/svg-icon folder
# make sure the file includes a viewBox attribute so we can properly scale the icon and that the fill or stroke colors are not declared on any path elements (unless the colors will never be changed).
# on the svg element, add => aria-hidden="true" to add it from screen readers (icons should be for presentation only)
2. run the following command in terminal (command prompt) inside the styleguide root folder => gulp svg2twig to generate the twig icon files used in patternlab.

## Note when exporting icons from Avocode:
1. The fill and stroke styling need to be removed from the path elements
2. Remove the title and description fields
* if you want to update the these fields, instead of adding the aria-hidden attribute add => role="img"

###See Example:
```html
<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="14" height="16" viewBox="0 0 14 16">
```
