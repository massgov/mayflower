import React from 'react';
import HamburgerNav, { HamburgerLogo, Container as HamburgerContainer } from 'MayflowerReactMolecules/HamburgerNav';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';

const HeaderHamburger = ({ Logo, NavSearch, Container = null, mainItems, utilityItems }) => {
  const RenderedContainer = Container || HamburgerContainer;
  return(
    <header className="ma__header__hamburger" id="header">
      <a className="ma__header__hamburger__skip-nav" href="#main-content">skip to main content</a>
      <HamburgerNav Logo={Logo} NavSearch={HamburgerNavSearch} mainItems={mainItems} utilityItems={utilityItems} />
      <RenderedContainer Logo={Logo} NavSearch={NavSearch} />
    </header>
  );
};

// For some reason, Header Hamburger has its own Nav Search...
// This appears to be the same version from HeaderMixed.
const HamburgerNavSearch = () => {
  return(
    <div className="ma__header__nav-search js-header__nav-search">
      <div className="ma__header-search">
        <form action="#" className="ma__form js-header-search-form" role="search">
          <label for="nav-search" className="ma__header-search__label">Search terms</label>
          <input id="nav-search" className="ma__header-search__input" placeholder="Search Mass.gov" type="search" inputmode="search" />
          <ButtonWithIcon usage="secondary" icon={<IconSearch />}>Search</ButtonWithIcon>
        </form>
      </div>
    </div>
  );
};

export default HeaderHamburger;
