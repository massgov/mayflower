/**
 * SiteLogo module.
 * @module @massds/mayflower-react/SiteLogo
 * @requires module:@massds/mayflower-assets/scss/01-atoms/site-logo
 * @requires module:@massds/mayflower-assets/scss/01-atoms/image
 */
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'MayflowerReactMedia/Image';
import getFallbackComponent from 'MayflowerReactComponents/utilities/getFallbackComponent';

const SiteLogo = ({
  url, image, siteName, title, Wrapper
}) => {
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

SiteLogo.propTypes = {
  /** The URL for the site */
  url: PropTypes.shape({
    /** The URL for the site root */
    domain: PropTypes.string.isRequired
  }),
  /** The site logo image to display. */
  image: PropTypes.shape(PropTypes.Image),
  /** An optional label to display next to the site logo. */
  siteName: PropTypes.string,
  /** The title attribute for the site logo link. */
  title: PropTypes.string,
  /** An uninstantiated component for rendering a wrapper around the site logo div. */
  Wrapper: PropTypes.elementType
};

SiteLogo.defaultProps = {
  image: {
    alt: '',
    width: 45,
    height: 45
  }
};

export default SiteLogo;
