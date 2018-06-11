### Status
* Obsolete as of 5.0.0

Description: A singular event including title, link, date and a description of the event.
## State: DEPRECATED
### Notes
- This style is deprecated and was replace be the event-teaser pattern.
### Contains
- [@atoms/decorative-link.twig](?p=atoms-decorative-link)
### Used in:
- [@molecules/action-section](?p=molecules-action-section)
- [@organisms/by-author/sidebar-widget](?p=organisms-sidebar-widget)
### Required Variables
~~~
actionEvent: {
  name: {
    type:
      type: string/NULL or external
    href:
      type: string/url/required
    text:
      type: string/required
    property: 
      type: string/optional
  },
  date:
    type: date/required
  description:
    type: string
}
~~~
