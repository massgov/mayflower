### Description
This is a variant of the [Page Header](./?p=organisms-page-header) pattern showing an example of how it is being used on a public meeting event page.

### How to generate
* set the `publishState` variable to null
* populate the `optionalContents` array with the following patterns:
  * @organisms/by-author/event-teaser.twig
  * @molecules/labelled-list.twig
   * @organisms/by-author/contact-us.twig
  * @organisms/by-author/callout-time.twig
    * alert
  * @organisms/by-author/key-actions.twig
* populate the `widgets` array with the following pattern:
  * @atoms/09-media/image.twig
