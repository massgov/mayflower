import React from 'react';
import propTypes from 'prop-types';
import HamburgerNav, {
  HamburgerMobileNavSearch,
  HamburgerNavItem,
  HamburgerUtilityItem,
  HamburgerMainNav,
  HamburgerUtilityNav,
  HamburgerSkipNav,
  HamburgerNavSearch,
  HamburgerContainer,
  HamburgerSiteLogo,
  HamburgerMobileLogoWrapper
} from 'MayflowerReactMolecules/HamburgerNav';
import { LoginItem, TranslateItem, StateItem } from 'MayflowerReactOrganisms/Header/utility-items';
import getFallbackComponent from 'MayflowerReactComponents/utilities/getFallbackComponent';
import useWindowWidth from 'MayflowerReactComponents/hooks/use-window-width';

const DefaultMobileLogo = React.memo(() => (<HamburgerSiteLogo Wrapper={HamburgerMobileLogoWrapper} />));
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
  const RenderedContainer = getFallbackComponent(Container, HamburgerContainer);
  const RenderedSkipNav = getFallbackComponent(SkipNav, HamburgerSkipNav);
  const RenderedNavSearch = getFallbackComponent(NavSearch, HamburgerNavSearch);
  const RenderedMobileNavSearch = getFallbackComponent(MobileNavSearch, HamburgerMobileNavSearch);
  const DesktopLogo = getFallbackComponent(Logo, HamburgerSiteLogo);
  const RenderedMobileLogo = getFallbackComponent(MobileLogo, DefaultMobileLogo);
  const RenderedUtilityNav = getFallbackComponent(UtilityNav, HamburgerUtilityNav);
  const RenderedMainNav = getFallbackComponent(MainNav, HamburgerMainNav);
  const RenderedUtilityItem = getFallbackComponent(UtilityItem, HamburgerUtilityItem);
  const RenderedNavItem = getFallbackComponent(NavItem, HamburgerNavItem);
  return(
    <>
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
        utilityItems={fallbackUtilityItems}
      />
      <RenderedContainer Logo={DesktopLogo} NavSearch={RenderedNavSearch} />
    </header>
    <div className="menu-overlay" />
    </>
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
    active: propTypes.bool,
    subNav: propTypes.arrayOf(propTypes.shape({
      href: propTypes.string,
      text: propTypes.string
    }))
  })),
  /** An array of uninstantiated components to render within the utility navigation.  */
  utilityItems: propTypes.arrayOf(propTypes.elementType)
};

export default HeaderHamburger;
