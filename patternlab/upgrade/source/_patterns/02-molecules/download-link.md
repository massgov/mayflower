### Description
This pattern is a link to a file or online form.

### Status
* Stable as of 5.0.0

### Pattern Contains
* Decorative Link
* Rich Text

### Variant options
* You can use [small](./?p=molecules-download-link-with-small-icon) icons
* You can link to an [online form](./?p=molecules-download-link-as-form) icons
* There are icons in Mayflower for 'docx', 'pdf', and 'xlsx' file formats along with a [generic](./?p=molecules-download-link-as-generic) icon for other formats


### Variables
~~~
downloadLink: {
  iconSize: 
    type: string ('' or 'small') / optional
  icon: 
    type: string (icon path) / optional
  decorativeLink: {
    type: decorativeLink / required
  }
  size: 
    type: string (filesize) / optional
  format:  
    type: string (fileformat or 'form') / optional
  description:
    type: rich text / optional
}
~~~
