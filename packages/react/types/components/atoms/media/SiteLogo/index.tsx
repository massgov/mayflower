// @ts-nocheck
/**
 * SiteLogo module.
 * @module @massds/mayflower-react/SiteLogo
 * @requires module:@massds/mayflower-assets/scss/01-atoms/site-logo
 * @requires module:@massds/mayflower-assets/scss/01-atoms/image
 */
import React from 'react';
import Image, { ImageProps } from 'MayflowerReactMedia/Image';
import getFallbackComponent from 'MayflowerReactComponents/utilities/getFallbackComponent';

export interface SiteLogoProps {
  /** The URL for the site */
  url?: {
    /** The URL for the site root */
    domain: string
  }
  /** The site logo image to display. */
  image?: ImageProps
  /** An optional label to display next to the site logo. */
  siteName?: string
  /** The title attribute for the site logo link. */
  title?: string
  /** An uninstantiated component for rendering a wrapper around the site logo div. */
  Wrapper?: React.ElementType
}

const SiteLogo = ({
  url,
  image,
  siteName,
  title,
  Wrapper
}: SiteLogoProps) => {
  const RenderedWrapper = getFallbackComponent(Wrapper, React.Fragment);
  return(
    <RenderedWrapper>
      <div className="ma__site-logo">
        <a href={url.domain} title={title}>
          {image?.src && <Image {...image} />}
          {siteName && <span>{siteName}</span>}
        </a>
      </div>
    </RenderedWrapper>
  );
};

SiteLogo.defaultProps = {
  image: {
    alt: '',
    width: 45,
    height: 45
  }
};

export default SiteLogo;
