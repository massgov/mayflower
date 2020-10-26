A button that displays with an icon component.
e.g. ButtonSearch, which is used for submitting a keyword search.
e.g. Button with chevron, which is used for toggling between the expanded state and the collapsed state.

### Changes for React
* Button with Icon is a common button pattern that is currently not available in Patternlab. It's an extension on top of the [Button Search atom](https://mayflower.digital.mass.gov/patternlab/?p=atoms-button-search).
* `classes` array: To improve reusability of this component, classes can now be added to the button by adding them to the new `classes` array.
* `ariaLabel` string: To improve accessibility of this component, an aria-label can be added if the displayed text is not helpful to assistive technologies.
