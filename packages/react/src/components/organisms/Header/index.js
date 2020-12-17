import React from 'react';
import propTypes from 'prop-types';
import HeaderNav, {
  HeaderNavSearch,
  HeaderContainer,
  HeaderMobileNavSearch
} from 'MayflowerReactMolecules/HeaderNav';
import { HeaderMainNav, HeaderNavItem } from 'MayflowerReactMolecules/HeaderNav/main-nav';
import HamburgerNav, {
  HamburgerNavItem,
  HamburgerUtilityItem,
  HamburgerMainNav,
  HamburgerUtilityNav,
  HamburgerSkipNav,
  HamburgerSiteLogo,
  HamburgerMobileLogoWrapper
} from 'MayflowerReactMolecules/HamburgerNav';
import { LoginItem, TranslateItem, StateItem } from 'MayflowerReactOrganisms/Header/utility-items';
import getFallbackComponent from 'MayflowerReactComponents/utilities/getFallbackComponent';
import useWindowWidth from 'MayflowerReactComponents/hooks/use-window-width';

const DefaultMobileLogo = React.memo(() => (<HamburgerSiteLogo Wrapper={HamburgerMobileLogoWrapper} />));

const Header = ({
  Logo,
  MobileLogo,
  NavSearch,
  MobileNavSearch,
  SkipNav,
  UtilityNav,
  MobileUtilityNav,
  UtilityItem,
  MobileUtilityItem,
  MainNav,
  MobileMainNav,
  NavItem,
  MobileNavItem,
  Container,
  mainItems = [],
  utilityItems = []
}) => {
  const windowWidth = useWindowWidth();
  const isMobileWindow = windowWidth !== null && windowWidth < 840;
  const fallbackUtilityItems = React.useMemo(() => {
    if (utilityItems.length < 1) {
      const tempItems = [];
      // Only display google translate item on desktop.
      if (!isMobileWindow) {
        tempItems.push(TranslateItem);
      }
      tempItems.push(StateItem);
      tempItems.push(LoginItem);
      return tempItems;
    }
    return utilityItems;
  }, [utilityItems, isMobileWindow]);
  let RenderedUtilityNav;
  let RenderedUtilityItem;
  const RenderedContainer = getFallbackComponent(Container, HeaderContainer);
  const DesktopLogo = getFallbackComponent(Logo, HamburgerSiteLogo);
  const RenderedSkipNav = getFallbackComponent(SkipNav, HamburgerSkipNav);
  const DesktopNavSearch = getFallbackComponent(NavSearch, HeaderNavSearch);
  const RenderedMobileNavSearch = getFallbackComponent(MobileNavSearch, HeaderMobileNavSearch);
  const RenderedMobileMainNav = getFallbackComponent(MobileMainNav, HamburgerMainNav);
  const DesktopMainNav = getFallbackComponent(MainNav, HeaderMainNav);
  const DesktopNavItem = getFallbackComponent(NavItem, HeaderNavItem);
  const RenderedMobileNavItem = getFallbackComponent(MobileNavItem, HamburgerNavItem);
  if (!isMobileWindow) {
    RenderedUtilityNav = getFallbackComponent(UtilityNav, HamburgerUtilityNav);
    RenderedUtilityItem = getFallbackComponent(UtilityItem, HamburgerUtilityItem);
  } else {
    RenderedUtilityNav = getFallbackComponent(MobileUtilityNav, HamburgerUtilityNav);
    RenderedUtilityItem = getFallbackComponent(MobileUtilityItem, HamburgerUtilityItem);
  }
  const RenderedMobileLogo = getFallbackComponent(MobileLogo, DefaultMobileLogo);
  return(
    <header className="ma__header__mixed ma__header__hamburger" id="header">
      {RenderedSkipNav !== null ? <RenderedSkipNav /> : null}
      <HamburgerNav
        headerType="mixed"
        Logo={RenderedMobileLogo}
        UtilityNav={RenderedUtilityNav}
        UtiltyItem={RenderedUtilityItem}
        MainNav={RenderedMobileMainNav}
        NavItem={RenderedMobileNavItem}
        NavSearch={RenderedMobileNavSearch}
        mainItems={mainItems}
        utilityItems={fallbackUtilityItems}
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
        utilityItems={fallbackUtilityItems}
        mainItems={mainItems}
      />
    </header>
  );
};
Header.propTypes = {
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
  /** An uninstantiated component which handles displaying the utility navigation at the top of the header on mobile. */
  MobileUtilityNav: propTypes.elementType,
  /** An uninstantiated component which handles the display of individual utility items. */
  UtilityItem: propTypes.elementType,
  /** An uninstantiated component which handles the display of individual utility items on mobile. */
  MobileUtilityItem: propTypes.elementType,
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

export default Header;
