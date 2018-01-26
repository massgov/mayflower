import React from 'react';
import logo from '@massds/mayflower/images/pilot-logo.png';
import PropTypes from "prop-types";

const SiteLogo = ({ title, alt, width, height, src, data}) => {
  const { url } = data;
  return (
    <div className="ma__site-logo">
      <a href={url.domain ? url.domain : '' + '/'} title={title}>
        <img src={src} alt={alt} width={width} height={height}/>
      </a>
    </div>
  )
};

SiteLogo.propTypes = {
	title: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	width: PropTypes.string.isRequired,
	height: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired
}

SiteLogo.defaultProps = {
	title: "Mass.gov home page",
	alt: "Mass.gov",
	width: "164",
	height: "75",
	src: "/static/media/pilot-logo.b57e29e9.png"
}

export default SiteLogo;
