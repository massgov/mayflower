import React from 'react';
import propTypes from 'prop-types';
import HamburgerNav, {
  HamburgerMobileNavSearch,
  HamburgerNavItem,
  HamburgerUtilityItem,
  HamburgerMainNav,
  HamburgerUtilityNav,
  HamburgerLogo,
  HamburgerSkipNav,
  HamburgerNavSearch,
  HamburgerContainer
} from 'MayflowerReactMolecules/HamburgerNav';
import getFallbackComponent from 'MayflowerReactComponents/utilities/getFallbackComponent';

const HeaderHamburger = ({
  Logo,
  MobileLogo,
  NavSearch,
  MobileNavSearch,
  SkipNav,
  UtilityNav,
  UtilityItem,
  MainNav,
  NavItem,
  Container,
  mainItems,
  utilityItems
}) => {
  const RenderedContainer = getFallbackComponent(Container, HamburgerContainer);
  const RenderedSkipNav = getFallbackComponent(SkipNav, HamburgerSkipNav);
  const RenderedNavSearch = getFallbackComponent(NavSearch, HamburgerNavSearch);
  const RenderedMobileNavSearch = getFallbackComponent(MobileNavSearch, HamburgerMobileNavSearch);
  const RenderedLogo = getFallbackComponent(Logo, HamburgerLogo);
  const RenderedMobileLogo = getFallbackComponent(MobileLogo, HamburgerLogo);
  const RenderedUtilityNav = getFallbackComponent(UtilityNav, HamburgerUtilityNav);
  const RenderedMainNav = getFallbackComponent(MainNav, HamburgerMainNav);
  const RenderedUtilityItem = getFallbackComponent(UtilityItem, HamburgerUtilityItem);
  const RenderedNavItem = getFallbackComponent(NavItem, HamburgerNavItem);

  return(
    <header className="ma__header__hamburger" id="header">
      {RenderedSkipNav !== null ? <RenderedSkipNav /> : null}
      <HamburgerNav
        MainNav={RenderedMainNav}
        NavItem={RenderedNavItem}
        UtilityItem={RenderedUtilityItem}
        UtilityNav={RenderedUtilityNav}
        Logo={RenderedMobileLogo}
        NavSearch={RenderedMobileNavSearch}
        mainItems={mainItems}
        utilityItems={utilityItems}
      />
      <RenderedContainer Logo={RenderedLogo} NavSearch={RenderedNavSearch} />
    </header>
  );
};
HeaderHamburger.propTypes = {
  /** An uninstantiated component which handles displaying the site logo. */
  Logo: propTypes.elementType,
  /** An uninstantiated component which handles displaying the site logo on mobile. */
  MobileLogo: propTypes.elementType,
  /** An uninstantiated component which handles search functionality. */
  NavSearch: propTypes.elementType,
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
  /** An uninstantiated component which handles display of individual navigation items inside of the main navigation. */
  NavItem: propTypes.elementType,
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

export default HeaderHamburger;
