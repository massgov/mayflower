/**
 * SiteLogo module.
 * @module @massds/mayflower-react/SiteLogo
 * @requires module:@massds/mayflower-assets/scss/01-atoms/site-logo
 * @requires module:@massds/mayflower-assets/scss/01-atoms/image
 */
import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';

const SiteLogo = (siteLogo) => (
  <div className="ma__site-logo">
    <a href={siteLogo.url.domain ? siteLogo.url.domain : '/'} title={siteLogo.title}>
      {siteLogo?.image?.src && <Image {...siteLogo.image} />}
      {siteLogo.siteName && <span>{siteLogo.siteName}</span>}
    </a>
  </div>
);

SiteLogo.propTypes = {
  /** The URL for the site */
  url: PropTypes.shape({
    /** The URL for the site root */
    domain: PropTypes.string
  }),
  image: PropTypes.shape(PropTypes.Image),
  siteName: PropTypes.string,
  title: PropTypes.string
};

SiteLogo.defaultProps = {
  url: {
    domain: '/'
  },
  image: {
    alt: '',
    width: 45,
    height: 45
  },
  title: 'Mass.gov homepage'
};

export default SiteLogo;
