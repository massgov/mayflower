/**
 * PressTeaser module.
 * @module @massds/mayflower-react/PressTeaser
 * @requires module:@massds/mayflower-assets/scss/02-molecules/press-teaser
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 * @requires module:@massds/mayflower-assets/scss/03-organisms/rich-text
 * @requires module:@massds/mayflower-assets/scss/01-atoms/comp-heading
 * @requires module:@massds/mayflower-assets/scss/01-atoms/sidebar-heading
 */
import React from 'react';
import PropTypes from 'prop-types';
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';
import RichText from 'MayflowerReactOrganisms/RichText';

const PressTeaser = (pressTeaser) => {
  const imageClass = pressTeaser.image ? 'ma__press-teaser ma__press-teaser--image' : 'ma__press-teaser';
  const Element = `h${pressTeaser.level || 2}`;
  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable-next-line no-console */
    console.warn('This component is deprecated and will be archived in v10. Use the GenTeaser Organism instead.');
  }
  return(
    <section className={imageClass}>
      { pressTeaser.image && pressTeaser.image.src && (
        <a
          className="ma__press-teaser__image"
          href={pressTeaser.title.href}
          title={pressTeaser.title.text}
        >
          <span
            aria-label={pressTeaser.image.alt}
            role="img"
            style={{ backgroundImage: `url(${pressTeaser.image.src})` }}
          />
        </a>
      )}
      <div className="ma__press-teaser__details">
        { pressTeaser.eyebrow && (
          <div className="ma__press-teaser__eyebrow">
            <span>{pressTeaser.eyebrow}</span>
          </div>
        )}
        <Element className="ma__press-teaser__title">
          <DecorativeLink {...pressTeaser.title} />
        </Element>
        { (pressTeaser.date || pressTeaser.org) && (
          <div className="ma__press-teaser__details">
            { pressTeaser.date && (
              <span className="ma__press-teaser__date">{pressTeaser.date}</span>
            )}
            { pressTeaser.org && (
              <span className="ma__press-teaser__org">{pressTeaser.org}</span>
            )}
          </div>
        )}
        { pressTeaser.description && (
        <div className="ma__press-teaser__description">
          <RichText {...pressTeaser.description} />
        </div>
        )}
      </div>
    </section>
  );
};

PressTeaser.propTypes = {
  /** The image to be displayed in the teaser
    src: The src url for the image
    alt: The alternate text explaining the image, required for accessibility */
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
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
  description: PropTypes.shape(RichText.propTypes)
};

export default PressTeaser;
