### Description
This is a variant of the [Page Header](./?p=organisms-page-header) pattern showing an example of how it is being used on the Location page.

### How to generate
* set the `divider` variable to false
* set the `category`, socialLinks`, and `publishState` to null
* populate the `optionalContents` array with the following patterns:
  * @organisms/by-author/contact-us.twig
  * @organisms/by-author/key-actions.twig
* populate the `widgets` array with the following pattern:
  * @molecules/location-icons.twig
