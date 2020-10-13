### Status
* Obsolete as of 5.0.0

Description: An image with an optional title and caption.
## State: DEPRECATED
### Notes
- The action image should be refactored to use the image base element component which should be updated to allow a caption.
### Used in:
- [@molecules/action-section](?p=molecules-action-section)
- [@organisms/by-author/action-details](?p=organisms-action-details)
### Required Variables
~~~
actionImage: {
  title:
    type: string
  image: {
    alt:
      type: string/required
    width:
      type: string/required
    height:
      type: string/required
    src:
      type: string/url/required
  },
  caption:
    type: string
  source:
    type: string/required
}
~~~
