import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import HeaderNav, {
  HeaderNavSearch
} from 'MayflowerReactMolecules/HeaderNav';
import { HeaderMainNav, HeaderNavItem } from 'MayflowerReactMolecules/HeaderNav/main-nav';
import HamburgerNav, {
  HamburgerNavItem,
  HamburgerUtilityItem,
  HamburgerMainNav,
  HamburgerUtilityNav,
  HamburgerSlimUtilityNav,
  HamburgerSkipNav,
  HamburgerNavSearch,
  HamburgerSiteLogo,
  HamburgerLogoWrapper,
  HamburgerMobileLogoWrapper
} from 'MayflowerReactMolecules/HamburgerNav';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';
import getFallbackComponent from 'MayflowerReactComponents/utilities/getFallbackComponent';
import useWindowWidth from 'MayflowerReactComponents/hooks/use-window-width';

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
  utilityItems = [],
  slim = false,
  mobileSlim = false
}) => {
  const windowWidth = useWindowWidth();
  const isMobileWindow = windowWidth !== null && windowWidth < 840;
  const RenderedContainer = getFallbackComponent(Container, MixedContainer);
  const FallbackMobileLogo = getFallbackComponent(MobileLogo, HamburgerSiteLogo);
  let RenderedMobileLogo = null;
  if (isMobileWindow && FallbackMobileLogo !== null) {
    if (mobileSlim === true) {
      RenderedMobileLogo = () => (<FallbackMobileLogo Wrapper={SlimLogoWrapper} />);
    } else {
      RenderedMobileLogo = () => (<FallbackMobileLogo Wrapper={HamburgerMobileLogoWrapper} />);
    }
  }
  const DefaultLogo = getFallbackComponent(Logo, HamburgerSiteLogo);
  let DesktopLogo = null;
  if (!isMobileWindow && DefaultLogo !== null) {
    if (slim === true) {
      DesktopLogo = () => (<DefaultLogo Wrapper={SlimLogoWrapper} />);
    } else {
      DesktopLogo = () => (<DefaultLogo Wrapper={HamburgerLogoWrapper} />);
    }
  }
  const RenderedSkipNav = getFallbackComponent(SkipNav, HamburgerSkipNav);

  const DesktopNavSearch = getFallbackComponent(NavSearch, HeaderNavSearch);
  const RenderedMobileNavSearch = getFallbackComponent(MobileNavSearch, MixedNavSearch);
  let RenderedUtilityNav;
  let RenderedUtilityItem;
  if (isMobileWindow) {
    RenderedUtilityNav = getFallbackComponent(MobileUtilityNav, (mobileSlim === true) ? HamburgerSlimUtilityNav : HamburgerUtilityNav);
    RenderedUtilityItem = getFallbackComponent(MobileUtilityItem, HamburgerUtilityItem);
  } else {
    RenderedUtilityNav = getFallbackComponent(UtilityNav, (slim === true) ? HamburgerSlimUtilityNav : HamburgerUtilityNav);
    RenderedUtilityItem = getFallbackComponent(UtilityItem, HamburgerUtilityItem);
  }
  const RenderedMobileMainNav = getFallbackComponent(MobileMainNav, HamburgerMainNav);
  const DesktopMainNav = getFallbackComponent(MainNav, HeaderMainNav);
  const DesktopNavItem = getFallbackComponent(NavItem, HeaderNavItem);
  const RenderedMobileNavItem = getFallbackComponent(MobileNavItem, HamburgerNavItem);
  // When there are no utility items passed, render using slim classes.
  const headerClasses = classNames('ma__header__mixed ma__header__hamburger', {
    ma__header_slim: (slim === true || mobileSlim === true),
    'ma__header__hamburger--slim': !isMobileWindow && (slim === true)
  });
  return(
    <header className={headerClasses} id="header">

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
        utilityItems={utilityItems}
        slim={slim}
        mobileSlim={mobileSlim}
      />

      <RenderedContainer slim={slim} mobileSlim={mobileSlim} Logo={DesktopLogo} NavSearch={DesktopNavSearch} />

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
        slim={slim}
        mobileSlim={mobileSlim}
      />
    </header>
  );
};
Header.propTypes = {
  slim: propTypes.bool,
  mobileSlim: propTypes.bool,
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

const MixedContainer = ({
  Logo,
  NavSearch,
  slim = false,
  mobileSlim = false
}) => {
  const windowWidth = useWindowWidth();
  const isMobileWindow = windowWidth !== null && windowWidth < 840;
  const FallbackLogo = getFallbackComponent(Logo, HamburgerSiteLogo);
  const RenderedLogo = () => (<FallbackLogo Wrapper={HamburgerLogoWrapper} />);
  const RenderedNavSearch = getFallbackComponent(NavSearch, HamburgerNavSearch);
  let containerClasses = '';
  if (isMobileWindow) {
    containerClasses = mobileSlim === true ? 'ma__header_slim__header-container ma__container' : 'ma__header__container';
  } else {
    containerClasses = slim === true ? 'ma__header_slim__header-container ma__container' : 'ma__header__container';
  }
  const containerStyles = {};
  if (isMobileWindow && mobileSlim === true) {
    containerStyles.display = 'none';
  }
  return(
    <div style={containerStyles} className={containerClasses}>
      { FallbackLogo !== null && <RenderedLogo />}
      { (RenderedNavSearch !== null) && <RenderedNavSearch />}
    </div>
  );
};
MixedContainer.propTypes = {
  /** An uninstantiated component which handles displaying the site logo. */
  Logo: propTypes.elementType,
  /** An uninstantiated component which handles search functionality. */
  NavSearch: propTypes.elementType
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

// Supports displaying the UtilityNav in slim format.
const SlimUtilityNav = ({
  UtilityItem,
  items = [],
  narrow = true
}) => {
  const RenderedUtilityItem = getFallbackComponent(UtilityItem, HamburgerUtilityItem);

  const wrapperClassName = classNames('ma__header__hamburger__utility-nav', {
    'ma__header__hamburger__utility-nav--narrow js-utility-nav--narrow': narrow,
    ma__header_slim__utility: items.length < 1 && !narrow
  });

  return(
    <div className={wrapperClassName}>
      { items.length > 0 && (
        <div className="ma__utility-nav js-util-nav">
          <ul className="ma__utility-nav__items">
            {items.map((ItemComponent, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <RenderedUtilityItem key={`header-hamburger-utility-item-${index}`}><ItemComponent narrow={narrow} /></RenderedUtilityItem>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

SlimUtilityNav.propTypes = {
  /** An uninstantiated component which handles displaying individual items within the utility nav. */
  UtilityItem: propTypes.elementType,
  /** An array of uninstantiated components to render within the utility navigation.  */
  items: propTypes.arrayOf(propTypes.elementType),
  /** A boolean representing when the UtilityNav is being displayed within a narrow screen. */
  narrow: propTypes.bool
};
// eslint-disable-next-line react/prop-types
export const SlimLogoWrapper = ({ children }) => (<div className="ma__header_slim__logo">{children}</div>);

export default Header;
