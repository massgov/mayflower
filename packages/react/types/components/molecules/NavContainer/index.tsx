// @ts-nocheck
import React from 'react';

export interface NavContainerProps {
  mainNav?: React.ReactElement
  navSearch?: React.ReactElement
  logo?: React.ReactElement
  utilityNav?: React.ReactElement
}

const NavContainer = ({
  mainNav,
  navSearch,
  logo,
  utilityNav,
  ...rest
}: NavContainerProps) => (
  <div {...rest}>
    { logo && logo}
    { navSearch && navSearch}
    { mainNav && mainNav }
    { utilityNav && utilityNav }
  </div>
);

export default NavContainer;
