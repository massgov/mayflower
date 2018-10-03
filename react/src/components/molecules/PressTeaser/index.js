import React from 'react';
import PropTypes from 'prop-types';
import DecorativeLink from '../../atoms/links/DecorativeLink';
import RichText from '../../organisms/RichText';
import './style.css';

const PressTeaser = (pressTeaser) => {
  const imageClass = pressTeaser.image ? 'ma__press-teaser ma__press-teaser--image' : 'ma__press-teaser';
  const Element = `h${pressTeaser.level || 2}`;

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
        </a>)}
      <div className="ma__press-teaser__details">
        { pressTeaser.eyebrow && (
          <div className="ma__press-teaser__eyebrow">
            <span>{pressTeaser.eyebrow}</span>
          </div>)
        }
        <Element className="ma__press-teaser__title">
          <DecorativeLink {...pressTeaser.title} />
        </Element>
        { (pressTeaser.date || pressTeaser.org) && (
          <div className="ma__press-teaser__details">
            { pressTeaser.date && (
              <span className="ma__press-teaser__date">{pressTeaser.date}</span>
              )
            }
            { pressTeaser.org && (
              <span className="ma__press-teaser__org">{pressTeaser.org}</span>
              )
            }
          </div>
        )}
        { pressTeaser.description && (
        <div className="ma__press-teaser__description">
          <RichText {...pressTeaser.description} />
        </div>
          )
        }
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
  title: PropTypes.instanceOf(DecorativeLink).isRequired,
  /** The heading level */
  level: PropTypes.number,
  /** The date the teaser content represents */
  date: PropTypes.string,
  /** The author/publishing entity of the teaser content */
  org: PropTypes.string,
  /** A short description of the teaser content, rendered as a paragraph */
  description: PropTypes.instanceOf(RichText)
};

export default PressTeaser;
