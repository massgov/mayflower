import React from 'react';
import PropTypes from 'prop-types';
import DecorativeLink from '../../atoms/links/DecorativeLink';
import RichText from '../../organisms/byAuthor/RichText';

const PressTeaser = (props) => {
  const pressTeaser = props;
  const imageClass = pressTeaser.image ? 'ma__press-teaser ma__press-teaser--image' : 'ma__press-teaser';
  const Element = `h${pressTeaser.level || 2}`;
  return(
    <section className={imageClass}>
      { pressTeaser.image ?
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
        </a> : '' }
      <div className="ma__press-teaser__details">
        { pressTeaser.eyebrow ?
          <div className="ma__press-teaser__eyebrow">
            <span>{pressTeaser.eyebrow}</span>
          </div> : ''
        }
        <Element className="ma__press-teaser__title">
          <DecorativeLink {...pressTeaser.title} />
        </Element>
        { pressTeaser.date || pressTeaser.org ?
          <div className="ma__press-teaser__details">
            { pressTeaser.date ?
              <span className="ma__press-teaser__date">{pressTeaser.date}</span> : ''
            }
            { pressTeaser.org ?
              <span className="ma__press-teaser__org">{pressTeaser.org}</span> : ''
            }
          </div>
        : ''}
        { pressTeaser.description ?
          <div className="ma__press-teaser__description">
            {/* <RichText {...pressTeaser.description}/> */}
          </div> : ''
        }
      </div>
    </section>
  );
};

PressTeaser.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  eyebrow: PropTypes.string,
  title: PropTypes.instanceOf(DecorativeLink).isRequired,
  level: PropTypes.number,
  date: PropTypes.string,
  org: PropTypes.string/* ,
  description: PropTypes.instanceOf(RichText) */
};

export default PressTeaser;
