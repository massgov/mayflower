import React from 'react';

import HeaderNav from 'MayflowerReactMolecules/HeaderNav';
import HamburgerNav, { Container as HamburgerContainer } from 'MayflowerReactMolecules/HamburgerNav';

const HeaderMixed = ({ Container = null, mainItems, utilityItems }) => {
  const RenderedContainer = Container || HamburgerContainer;
  return(
    <header className="ma__header__hamburger ma__header__mixed" id="header">

      <a className="ma__header__hamburger__skip-nav" href="#main-content">skip to main content</a>

      <HamburgerNav mainItems={mainItems} utilityItems={utilityItems} />

      <RenderedContainer />

      <HeaderNav Logo={null} NavSearch={null} utilityItems={utilityItems} mainItems={mainItems} />
    </header>
  );
};

export default HeaderMixed;
