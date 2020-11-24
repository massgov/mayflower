import React from 'react';

const NavContainer = ({
  mainNav,
  NavSearch,
  Logo,
  utilityNav,
  ...rest
}) => (
  <div {...rest}>
    { Logo && <Logo />}
    { NavSearch && <NavSearch />}
    { mainNav && mainNav }
    { utilityNav && utilityNav }
  </div>
);

export default NavContainer;
