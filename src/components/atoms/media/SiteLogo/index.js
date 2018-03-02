import React from 'react';
import PropTypes from 'prop-types';
import logo from './mass-logo.png';

const SiteLogo = (siteLogo) => (
  <div className="ma__site-logo">
    <a href={siteLogo.url.domain ? siteLogo.url.domain : '/'} title="Mass.gov home page">
      <img src={logo} alt="Mass.gov" width="164" height="75" />
    </a>
  </div>
);

SiteLogo.propTypes = {
  /** The URL for the site */
  url: PropTypes.shape({
    /** The URL for the site root */
    domain: PropTypes.string
  })
};

SiteLogo.defaultProps = {
  url: {
    domain: '/'
  }
};

export default SiteLogo;
