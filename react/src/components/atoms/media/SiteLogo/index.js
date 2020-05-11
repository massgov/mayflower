import React from 'react';
import PropTypes from 'prop-types';
import logo from '@massds/mayflower-assets/static/images/stateseal.png';
import './style.css';
import Image from '../Image';

const SiteLogo = (siteLogo) => (
  <div className="ma__site-logo">
    <a href={siteLogo.url.domain ? siteLogo.url.domain : '/'} title={siteLogo.title}>
      <Image {...siteLogo.image} />
      <span>{siteLogo.siteName}</span>
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
    src: logo,
    alt: '',
    width: 45,
    height: 45
  },
  siteName: 'Mass.gov',
  title: 'Mass.gov homepage'
};

export default SiteLogo;
