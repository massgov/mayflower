import React from 'react';
import propTypes from 'prop-types';
import HeaderNav, {
  HeaderUtilityNav,
  HeaderUtilityItem,
  HeaderNavSearch
} from 'MayflowerReactMolecules/HeaderNav';
import { HeaderMainNav, HeaderNavItem } from 'MayflowerReactMolecules/HeaderNav/main-nav';
import HamburgerNav, {
  HamburgerNavItem,
  HamburgerUtilityItem,
  HamburgerMainNav,
  HamburgerUtilityNav,
  HamburgerLogo,
  HamburgerMobileLogo,
  HamburgerSkipNav,
  HamburgerNavSearch
} from 'MayflowerReactMolecules/HamburgerNav';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';
import getFallbackComponent from 'MayflowerReactComponents/utilities/getFallbackComponent';

const MixedContainer = ({
  Logo,
  NavSearch
}) => {
  const RenderedLogo = getFallbackComponent(Logo, HamburgerLogo);
  const RenderedNavSearch = getFallbackComponent(NavSearch, HamburgerNavSearch);
  return(
    <div className="ma__header__container">
      <RenderedLogo />
      <RenderedNavSearch />
    </div>
  );
};
MixedContainer.propTypes = {
  /** An uninstantiated component which handles displaying the site logo. */
  Logo: propTypes.elementType,
  /** An uninstantiated component which handles search functionality. */
  NavSearch: propTypes.elementType
};

const HeaderMixed = ({
  Logo,
  MobileLogo,
  NavSearch,
  MobileNavSearch,
  SkipNav,
  UtilityNav,
  UtilityItem,
  MainNav,
  MobileMainNav,
  NavItem,
  MobileNavItem,
  Container,
  mainItems,
  utilityItems
}) => {
  const RenderedContainer = getFallbackComponent(Container, MixedContainer);
  const RenderedMobileLogo = getFallbackComponent(MobileLogo, HamburgerMobileLogo);
  const DesktopLogo = getFallbackComponent(Logo, HamburgerLogo);

  const RenderedSkipNav = getFallbackComponent(SkipNav, HamburgerSkipNav);

  const DesktopNavSearch = getFallbackComponent(NavSearch, HeaderNavSearch);
  const RenderedMobileNavSearch = getFallbackComponent(MobileNavSearch, MixedNavSearch);

  const RenderedUtilityNav = getFallbackComponent(UtilityNav, HamburgerUtilityNav);
  const RenderedUtilityItem = getFallbackComponent(UtilityItem, HamburgerUtilityItem);
  const RenderedMobileMainNav = getFallbackComponent(MobileMainNav, HamburgerMainNav);
  const DesktopMainNav = getFallbackComponent(MainNav, HeaderMainNav);
  const DesktopNavItem = getFallbackComponent(NavItem, HeaderNavItem);
  const RenderedMobileNavItem = getFallbackComponent(MobileNavItem, HamburgerNavItem);

  return(
    <header className="ma__header__hamburger ma__header__mixed" id="header">

      {RenderedSkipNav !== null ? <RenderedSkipNav /> : null}

      <HamburgerNav
        Logo={RenderedMobileLogo}
        UtilityNav={RenderedUtilityNav}
        UtiltyItem={RenderedUtilityItem}
        MainNav={RenderedMobileMainNav}
        NavItem={RenderedMobileNavItem}
        NavSearch={RenderedMobileNavSearch}
        mainItems={mainItems}
        utilityItems={utilityItems}
      />

      <RenderedContainer Logo={DesktopLogo} NavSearch={DesktopNavSearch} />

      <HeaderNav
        ButtonContainer={null}
        Logo={null}
        MainNav={DesktopMainNav}
        NavItem={DesktopNavItem}
        NavSearch={null}
        UtilityNav={null}
        UtiltyItem={null}
        utilityItems={utilityItems}
        mainItems={mainItems}
      />
    </header>
  );
};
HeaderMixed.propTypes = {
  /** An uninstantiated component which handles displaying the site logo. */
  Logo: propTypes.elementType,
  /** An uninstantiated component which handles displaying the site logo on mobile. */
  MobileLogo: propTypes.elementType,
  /** An uninstantiated component which handles search functionality. */
  NavSearch: propTypes.elementType,
  /** An uninstantiated component that displays the site logo and search on desktop. */
  Container: propTypes.elementType,
  /** An uninstantiated component which handles search functionality on mobile. */
  MobileNavSearch: propTypes.elementType,
  /** An uninstantiated component which handles the display of a skip navigation link. */
  SkipNav: propTypes.elementType,
  /** An uninstantiated component which handles displaying the utility navigation at the top of the header. */
  UtilityNav: propTypes.elementType,
  /** An uninstantiated component which handles the display of individual utility items. */
  UtilityItem: propTypes.elementType,
  /** An uninstantiated component which handles the display of the main navigation and its links. */
  MainNav: propTypes.elementType,
  /** An uninstantiated component which handles the display of the main navigation and its links on mobile. */
  MobileMainNav: propTypes.elementType,
  /** An uninstantiated component which handles display of individual navigation items inside of the main navigation. */
  NavItem: propTypes.elementType,
  /** An uninstantiated component which handles display of individual navigation items inside of the main navigation on mobile. */
  MobileNavItem: propTypes.elementType,
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

// For whatever reason, HeaderMixed has its own nav search for header hamburger...
const MixedNavSearch = () => (
  <div className="ma__header__nav-search js-header__nav-search">
    <div className="ma__header-search">
      <form action="#" className="ma__form js-header-search-form" role="search">
        { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="header-search" className="ma__header-search__label">Search terms</label>
        <input id="header-search" className="ma__header-search__input" placeholder="Search Mass.gov" type="search" inputMode="search" />
        <ButtonWithIcon usage="secondary" icon={<IconSearch />}>Search</ButtonWithIcon>
      </form>
    </div>
  </div>
);

export default HeaderMixed;
