// @ts-nocheck
/**
 * ImagePromo module.
 * @module @massds/mayflower-react/ImagePromo
 * @requires module:@massds/mayflower-assets/scss/02-molecules/image-promo
 * @requires module:@massds/mayflower-assets/scss/02-molecules/org-info
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 * @requires module:@massds/mayflower-assets/scss/01-atoms/image
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';

import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';
import Image from 'MayflowerReactMedia/Image';
import Paragraph from 'MayflowerReactText/Paragraph';
// eslint-disable-next-line import/no-unresolved
import IconPhone from 'MayflowerReactBase/Icon/IconPhone';

export interface ImagePromoProps {
  title?: {
    level?: number
    href: string
    text: string
  }
  tags?: {
    id: string
    label?: string
    icon?: React.ReactElement
  }[]
  image?: {
    src?: string
    alt?: string
    width?: number
    height?: number
  }
  /** Stack image and details */
  stacked?: boolean
  /** Stack image and details */
  small?: boolean
  /** Add a subtitle field below title */
  subTitle?: string
  description?: string
  link?: {
    text?: string
    href?: string
    info?: string
  }
  location?: {
    text?: string
    map?: boolean
  }
  phone?: {
    text: string
    href?: string
  }
}

const ImagePromo = (props: ImagePromoProps) => {
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
          <>{props.title.text}</>
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
            <span>{props.location.text}</span>
            {props.link && props.link.text && (
              <div>
                <DecorativeLink {...props.link} />
              </div>
            )}
          </div>
        )}

        {props.phone && (
          <div className="ma__image-promo__phone">
            <IconPhone />
            <span>&nbsp;</span>
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

export default ImagePromo;
