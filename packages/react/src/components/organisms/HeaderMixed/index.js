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
  HamburgerLogo,
  HamburgerMobileLogo,
  HamburgerSkipNav,
  HamburgerNavSearch
} from 'MayflowerReactMolecules/HamburgerNav';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';
import getFallbackComponent from 'MayflowerReactComponents/utilities/getFallbackComponent';
import useWindowWidth from 'MayflowerReactComponents/hooks/use-window-width';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';

const MixedContainer = ({
  Logo,
  NavSearch
}) => {
  const RenderedLogo = getFallbackComponent(Logo, HamburgerLogo);
  const RenderedNavSearch = getFallbackComponent(NavSearch, HamburgerNavSearch);
  return(
    <div className="ma__header__container">
      { RenderedLogo !== null && <RenderedLogo />}
      { RenderedNavSearch !== null && <RenderedNavSearch />}
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
  mainItems = [],
  utilityItems = []
}) => {
  const windowWidth = useWindowWidth();
  const isMobileWindow = windowWidth !== null && windowWidth < 840;
  const RenderedContainer = getFallbackComponent(Container, MixedContainer);
  let RenderedMobileLogo;
  if (utilityItems.length > 0) {
    RenderedMobileLogo = getFallbackComponent(MobileLogo, HamburgerMobileLogo);
  } else {
    RenderedMobileLogo = getFallbackComponent(MobileLogo, mainItems.length > 0 ? HamburgerMobileLogo : MixedLogo);
  }
  const DesktopLogo = getFallbackComponent(Logo, HamburgerLogo);

  const RenderedSkipNav = getFallbackComponent(SkipNav, HamburgerSkipNav);

  const DesktopNavSearch = getFallbackComponent(NavSearch, HeaderNavSearch);
  const RenderedMobileNavSearch = getFallbackComponent(MobileNavSearch, MixedNavSearch);

  const RenderedUtilityNav = getFallbackComponent(UtilityNav, isMobileWindow && (utilityItems.length < 1) ? SlimUtilityNav : HamburgerUtilityNav);
  const RenderedUtilityItem = getFallbackComponent(UtilityItem, HamburgerUtilityItem);
  const RenderedMobileMainNav = getFallbackComponent(MobileMainNav, HamburgerMainNav);
  const DesktopMainNav = getFallbackComponent(MainNav, HeaderMainNav);
  const DesktopNavItem = getFallbackComponent(NavItem, HeaderNavItem);
  const RenderedMobileNavItem = getFallbackComponent(MobileNavItem, HamburgerNavItem);
  // When there are no utility items passed, render using slim classes.
  const headerClasses = classNames('ma__header__mixed ma__header__hamburger', {
    ma__header_slim: isMobileWindow && utilityItems.length < 1,
    'ma__header__hamburger--slim': !isMobileWindow && utilityItems.length < 1
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

// Supports displaying the UtilityNav in slim format.
export const SlimUtilityNav = ({
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

export const MixedLogo = () => {
  const logoProps = {
    url: {
      domain: 'https://www.mass.gov/'
    },
    image: {
      src: 'https://unpkg.com/@massds/mayflower-assets/static/images/logo/stateseal.png',
      alt: 'Massachusetts state seal',
      width: 45,
      height: 45
    },
    siteName: 'Mass.gov',
    title: 'Mass.gov homepage'
  };
  return(
    <div className="ma__header_slim__logo">
      <SiteLogo {...logoProps} />
    </div>
  );
};

export default HeaderMixed;
