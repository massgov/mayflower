### Description
Short multi-use teaser with an optional image. This pattern can display the photo and details with one of three layouts:
stacked (with the contents in a single column), side-by-side (with the text content alongside the image) or
contents-stacked (contents under the image, eyebrow/title/emphasized text displayed next to the image). If the provided
image is too large, the content will wrap and appear in a single column, regardless of the specified layout.

If a teaser image is provided, it will link to the title's href, if set.

### Status
* Stable as of TBA

### Pattern Contains
* Decorative Link
* Paragraph
* ContactGroup
* SvgMarker
* SvgPhone
* SvgLaptop
* SvgFax
* SvgChevron

### Variables
~~~
GeneralTeaser.propTypes = {
  The image to be displayed in the teaser.
  image: PropTypes.shape({
    The src url for the image.
    src: PropTypes.string.isRequired,
    The alternate text explaining the image, required for accessibility.
    alt: PropTypes.string.isRequired
  }),
  /** The short for tag that will appear in the eyebrow, e.g. press release */
  eyebrow: PropTypes.string,
  /** A linked title for the teaser content, @atoms/links/DecorativeLink */
  title: PropTypes.shape(DecorativeLink.propTypes).isRequired,
  /** The heading level */
  level: PropTypes.number,
  /** The date the teaser content represents */
  date: PropTypes.string,
  /** The author/publishing entity of the teaser content */
  org: PropTypes.string,
  /** A short description of the teaser content, rendered as a paragraph */
  description: PropTypes.shape(Paragraph.propTypes),
  /** A list of descorative sublinks * */
  subLinks: PropTypes.arrayOf(PropTypes.shape(DecorativeLink.propTypes)),
  /** A list of contact information * */
  primaryInfo: PropTypes.shape(ContactGroup.propTypes),
  /** Secondary Info */
  secondaryInfo: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.oneOf(['SvgMarker', 'SvgPhone', 'SvgLaptop', 'SvgFax']),
    linkedTitle: PropTypes.shape(DecorativeLink.propTypes)
  }))
};
~~~
