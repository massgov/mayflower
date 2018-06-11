### Status
* Archived as of 6.0.0

Description: A teaser for a gallery of images with a link to view the full gallery.

## State: DEPRECATED

### Notes
- This style is deprecated as it should be generalized to display a gallery teaser anywhere in the site.
- The component should be updated to allow a title to be added to the images in the gallery.

### Contains
- [@atoms/decorative-link](?p=atoms-decorative-link)

### Used in:
- [@molecules/action-section](?p=molecules-action-section)
- [@organisms/by-author/action-details](?p=organisms-action-details)

### Required Variables
~~~
actionGallery: {
  link: {
    href:
      type: string/url/required
    target:
      type: string
    text:
      type: string/required
    chevron:
      type: boolean/True/required
  },
  items: [{
    src:
      type: string/url/required
    alt:
      type: string/required
  }]
}
~~~
