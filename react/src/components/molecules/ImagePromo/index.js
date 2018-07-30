import React from 'react';
import PropTypes from 'prop-types';

import DecorativeLink from '../../atoms/links/DecorativeLink';
import Image from '../../atoms/media/Image';
import Paragraph from '../../atoms/text/Paragraph';
import SvgPhone from '../../atoms/icons/SvgPhone';
import './style.css';
import { OrgSelectorContext } from '../OrgSelector';

const ImagePromo = (props) => {
  let promo;
  return(
    <OrgSelectorContext.Consumer>
      {(selectedOrg) => {
        if (selectedOrg) {
          promo = {
            title: {
              href: selectedOrg.name.href,
              text: selectedOrg.name.text
            },
            tags: null,
            image: {
              alt: selectedOrg.image.alt,
              src: selectedOrg.image.src,
              height: selectedOrg.image.height,
              width: selectedOrg.image.width
            },
            stacked: true,
            small: true,
            subTitle: selectedOrg.jobTitle,
            description: selectedOrg.message,
            link: {
              text: selectedOrg.moreLink.text,
              href: selectedOrg.moreLink.href,
              info: selectedOrg.moreLink.info
            }
          };
        } else {
          promo = props;
        }
        const HeadingElement = `h${promo.title.level || 2}`;
        const sectionClasses = [
          'ma__image-promo',
          promo.stacked && 'ma__image-promo--stacked',
          promo.small && 'ma__image-promo--small',
          promo.location && promo.location.map && 'js-location-listing-link'
        ];
        const imagePromoHeader = (
          <div className="ma__image-promo__header">
            <HeadingElement className="ma__image-promo__title">
              {promo.tags && (
                <div className="ma__image-promo__tags">
                  {promo.tags.map((tag) => (
                    <span key={tag.id} title={tag.label} data-ma-tag-id={tag.id}>{tag.icon}</span>
                  ))}
                </div>
              )}

              {promo.title ? (
                <DecorativeLink {...promo.title} />
              ) : (
                <React.Fragment>{promo.title.text}</React.Fragment>
              )}
            </HeadingElement>

            {promo.subTitle && (
              <h3 className="ma__org-info__job-title">
                {promo.subTitle}
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
            { !promo.stacked && imagePromoHeader }
            {promo.location && promo.location.text && (
              <div className="ma__image-promo__location">
                {promo.location.text}
                {promo.link && promo.link.text && (
                  <div>
                    <DecorativeLink {...promo.link} />
                  </div>
                )}
              </div>
            )}

            {promo.phone && (
              <div className="ma__image-promo__phone">
                <SvgPhone />&nbsp;
                {promo.phone.href ? (
                  <a href={`tel:${promo.phone.href}`}>{promo.phone.text}</a>
                ) : (
                  <span>{promo.phone.text}</span>
                )}
              </div>
            )}

            {promo.description && (
              <div className="ma__image-promo__description">
                <Paragraph text={promo.description} />
              </div>
            )}

            {promo.link && !promo.location && (
              <div className="ma__image-promo__link">
                <DecorativeLink {...promo.link} />
              </div>
            )}
          </div>
        </section>);
      }}
    </OrgSelectorContext.Consumer>
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
