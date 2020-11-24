import React from 'react';

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

export default NavContainer;
