import React from 'react';
import PropTypes from 'prop-types';

import DecorativeLink from '../../atoms/links/DecorativeLink';
import Image from '../../atoms/media/Image';
import Paragraph from '../../atoms/text/Paragraph';
import Icon from '../../base/Icon';

const ImagePromo = (props) => {
  const HeadingElement = `h${props.title.level || 2}`;
  const sectionClasses = [
    'ma__image-promo',
    props.stacked && 'ma__image-promo--stacked',
    props.small && 'ma__image-promo--small',
    props.location && props.location.map && 'js-location-listing-link'
  ];
  const imagePromoHeader = (
    <div className="ma__image-promo__header">
      <HeadingElement className="ma__image-promo__title">
        {props.tags && (
          <div className="ma__image-promo__tags">
            {props.tags.map((tag) => (
              <span key={tag.id} title={tag.label} data-ma-tag-id={tag.id}>{tag.icon}</span>
            ))}
          </div>
        )}

        {props.title ? (
          <DecorativeLink {...props.title} />
        ) : (
          <React.Fragment>{props.title.text}</React.Fragment>
        )}
      </HeadingElement>

      {props.subTitle && (
      <h3 className="ma__org-info__job-title">
        {props.subTitle}
      </h3>
      )}
    </div>
  );
  return(
    <section className={sectionClasses.join(' ')}>

      <div className="ma__image-promo__image">
        {props.image && props.image.src && (
          <Image {...props.image} />
        )}
        { props.stacked && imagePromoHeader }
      </div>

      <div className="ma__image-promo__details">
        { !props.stacked && imagePromoHeader }
        {props.location && props.location.text && (
          <div className="ma__image-promo__location">
            {props.location.text}
            {props.link && props.link.text && (
              <div>
                <DecorativeLink {...props.link} />
              </div>
            )}
          </div>
        )}

        {props.phone && (
          <div className="ma__image-promo__phone">
            <Icon name="phone" />&nbsp;
            {props.phone.href ? (
              <a href={`tel:${props.phone.href}`}>{props.phone.text}</a>
            ) : (
              <span>{props.phone.text}</span>
            )}
          </div>
        )}

        {props.description && (
          <div className="ma__image-promo__description">
            <Paragraph text={props.description} />
          </div>
        )}

        {props.link && !props.location && (
          <div className="ma__image-promo__link">
            <DecorativeLink {...props.link} />
          </div>
        )}
      </div>
    </section>
  );
};

ImagePromo.propTypes = {
  title: PropTypes.shape({
    level: PropTypes.number,
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }),
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    icon: PropTypes.element
  })),
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  }),
  /** Stack image and details */
  stacked: PropTypes.bool,
  /** Stack image and details */
  small: PropTypes.bool,
  /** Add a subtitle field below title */
  subTitle: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.shape({
    text: PropTypes.string,
    href: PropTypes.string,
    info: PropTypes.string
  }),
  location: PropTypes.shape({
    text: PropTypes.string,
    map: PropTypes.bool
  }),
  phone: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string
  })
};

export default ImagePromo;
