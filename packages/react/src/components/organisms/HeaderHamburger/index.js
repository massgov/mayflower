import React from 'react';
import propTypes from 'prop-types';
import HamburgerNav, { Container as HamburgerContainer } from 'MayflowerReactMolecules/HamburgerNav';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';

const HeaderHamburger = ({
  Logo,
  NavSearch,
  Container = null,
  mainItems,
  utilityItems
}) => {
  // Babel won't play nice with setting Container to MixedContainer by default in props.
  // This appears to only be the case for the default export of a file.
  // We do it here as a work around.
  const RenderedContainer = Container || HamburgerContainer;
  return(
    <header className="ma__header__hamburger" id="header">
      <a className="ma__header__hamburger__skip-nav" href="#main-content">skip to main content</a>
      <HamburgerNav Logo={Logo} NavSearch={HamburgerNavSearch} mainItems={mainItems} utilityItems={utilityItems} />
      <RenderedContainer Logo={Logo} NavSearch={NavSearch} />
    </header>
  );
};
HeaderHamburger.propTypes = {
  /** An uninstantiated component which handles displaying the site logo. */
  Logo: propTypes.elementType,
  /** An uninstantiated component which handles search functionality. */
  NavSearch: propTypes.elementType,
  /** An uninstantiated component that displays the site logo and search on desktop. */
  Container: propTypes.elementType,
  /** An array of items used to create the menu. */
  mainItems: propTypes.arrayOf(propTypes.shape({
    href: propTypes.string,
    text: propTypes.string,
    subNav: propTypes.arrayOf(propTypes.shape({
      href: propTypes.string,
      text: propTypes.string
    }))
  })),
  /** An array of uninstantiated components to render within the utility navigation.  */
  utilityItems: propTypes.arrayOf(propTypes.elementType)
};

// For some reason, Header Hamburger has its own Nav Search...
// This appears to be the same version from HeaderMixed.
const HamburgerNavSearch = () => (
  <div className="ma__header__nav-search js-header__nav-search">
    <div className="ma__header-search">
      <form action="#" className="ma__form js-header-search-form" role="search">
        { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="nav-search" className="ma__header-search__label">Search terms</label>
        <input id="nav-search" className="ma__header-search__input" placeholder="Search Mass.gov" type="search" inputMode="search" />
        <ButtonWithIcon usage="secondary" icon={<IconSearch />} text="Search" />
      </form>
    </div>
  </div>
);

export default HeaderHamburger;
