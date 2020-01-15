### Description
Short multi-use teaser with an optional image. This pattern can display the photo and details with one of three layouts:
stacked (with the contents in a single column), side-by-side (with the text content alongside the image) or
contents-stacked (contents under the image, eyebrow/title/emphasized text displayed next to the image). If the provided
image is too large, the content will wrap and appear in a single column, regardless of the specified layout.

If a teaser image is provided, it will link to the title's href, if set.

### Status
This component is deprecated and is replaced by [GenTeaser](../GenTeaser).
This component will be archives in the next major version, version 10.

### Pattern Contains
* Decorative Link
* Icon Link
* Paragraph
* ContactGroup
* SvgChevron

### Variables
```
GeneralTeaser.propTypes = {
  The image to be displayed in the teaser.
  image: PropTypes.shape({
    The src url for the image.
    src: PropTypes.string.isRequired,
    The alternate text explaining the image, required for accessibility.
    alt: PropTypes.string.isRequired
  }),
  The short for tag that will appear in the eyebrow, e.g. press release.
  eyebrow: PropTypes.string,
  A linked title for the teaser content, @atoms/links/DecorativeLink
  title: DecorativeLink.isRequired,
  The heading level.
  level: PropTypes.number,
  The date the teaser content represents
  date: PropTypes.string,
  The author/publishing entity of the teaser content
  org: PropTypes.string,
  A short description of the teaser content, @atoms/text/Paragraph 
  description: Paragraph,
  An array of @atoms/links/DecorativeLink components.
  subLinks: PropTypes.arrayOf(DecorativeLink),
  A @molecules/ContactGroup component used to display primary information.
  primaryInfo: ContactGroup,
  An array of @molecule/IconLink components.
  secondaryInfo: PropTypes.arrayOf(IconLink)
};
```
