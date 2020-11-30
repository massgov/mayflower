import React from 'react';

import HeaderNav from 'MayflowerReactMolecules/HeaderNav';
import HamburgerNav, { HamburgerLogo, HamburgerNavSearch } from 'MayflowerReactMolecules/HamburgerNav';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';

const MixedContainer = ({ Logo = HamburgerLogo, NavSearch = HamburgerNavSearch }) => (
  <div className="ma__header__container">
    <Logo mobile={false} />
    <NavSearch />
  </div>
);

const HeaderMixed = ({ Container = null, mainItems, utilityItems }) => {
  // Babel won't play nice with setting Container to MixedContainer by default in props.
  // This appears to only be the case for the default export of a file.
  // We do it here as a work around.
  const RenderedContainer = Container || MixedContainer;
  return(
    <header className="ma__header__hamburger ma__header__mixed" id="header">

      <a className="ma__header__hamburger__skip-nav" href="#main-content">skip to main content</a>

      <HamburgerNav Logo={HamburgerLogo} NavSearch={MixedNavSearch} mainItems={mainItems} utilityItems={utilityItems} />

      <RenderedContainer />

      <HeaderNav ButtonContainer={null} Logo={null} NavSearch={null} utilityItems={utilityItems} mainItems={mainItems} />
    </header>
  );
};

// For whatever reason, HeaderMixed has its own nav search for header hamburger...
const MixedNavSearch = () => (
  <div className="ma__header__nav-search js-header__nav-search">
    <div className="ma__header-search">
      <form action="#" className="ma__form js-header-search-form" role="search">
        <label htmlFor="header-search" className="ma__header-search__label">Search terms</label>
        <input id="header-search" className="ma__header-search__input" placeholder="Search Mass.gov" type="search" inputMode="search" />
        <ButtonWithIcon usage="secondary" icon={<IconSearch />}>Search</ButtonWithIcon>
      </form>
    </div>
  </div>
);

export default HeaderMixed;
