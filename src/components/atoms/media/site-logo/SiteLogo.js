import React from 'react';
import logo from '@massds/mayflower/images/pilot-logo.png';

const SiteLogo = ({data}) => {
  const {url} = data;
  return (
    <div className="ma__site-logo">
      <a href={url.domain ? url.domain : '' + '/'} title="Mass.gov home page">
        <img src={logo} alt="Mass.gov" width="164" height="75"/>
      </a>
    </div>
  )
};

export default SiteLogo;
