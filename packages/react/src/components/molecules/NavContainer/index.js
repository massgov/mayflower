import React from 'react';
import propTypes from 'prop-types';

const NavContainer = ({
  mainNav,
  navSearch,
  logo,
  utilityNav,
  ...rest
}) => (
  <div {...rest}>
    { logo && logo}
    { navSearch && navSearch}
    { mainNav && mainNav }
    { utilityNav && utilityNav }
  </div>
);
NavContainer.propTypes = {
  mainNav: propTypes.element,
  navSearch: propTypes.element,
  logo: propTypes.element,
  utilityNav: propTypes.element
};

export default NavContainer;
