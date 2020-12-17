import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import NavContainer from 'MayflowerReactMolecules/NavContainer';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';
import { HeaderMainNav, HeaderNavItem } from 'MayflowerReactMolecules/HeaderNav/main-nav';
import { HamburgerNavSearch } from 'MayflowerReactMolecules/HamburgerNav';
import useWindowWidth from 'MayflowerReactComponents/hooks/use-window-width';
import getFallbackComponent from 'MayflowerReactComponents/utilities/getFallbackComponent';

const HeaderNav = ({
  UtilityNav,
  UtilityItem,
  MainNav,
  NavItem,
  Logo,
  NavSearch,
  ButtonContainer,
  mainItems = [],
  utilityItems = []
}) => {
  const RenderedMainNav = getFallbackComponent(MainNav, HeaderMainNav);
  const RenderedNavSearch = getFallbackComponent(NavSearch, HeaderNavSearch);
  const RenderedUtilityNav = getFallbackComponent(UtilityNav, HeaderUtilityNav);
  const RenderedUtilityItem = getFallbackComponent(UtilityItem, HeaderUtilityItem);
  const RenderedNavItem = getFallbackComponent(NavItem, HeaderNavItem);
  const RenderedLogo = getFallbackComponent(Logo, HeaderLogo);
  const RenderedButtonContainer = getFallbackComponent(ButtonContainer, HeaderButtonContainer);
  const utilityNav = (RenderedUtilityNav !== null && utilityItems.length > 0 ? <RenderedUtilityNav UtilityItem={RenderedUtilityItem} items={utilityItems} narrow /> : null);
  const mainNav = (RenderedMainNav !== null && mainItems.length > 0 ? <RenderedMainNav NavItem={RenderedNavItem} items={mainItems} /> : null);
  const logo = (RenderedLogo !== null ? <RenderedLogo /> : null);
  const navSearch = (RenderedNavSearch !== null ? <RenderedNavSearch narrow /> : null);
  const buttonContainer = (RenderedButtonContainer !== null ? <RenderedButtonContainer /> : null);
  return(
    <nav className="ma__header__nav" aria-label="main navigation" id="header-main-navigation" role="navigation">
      {buttonContainer}
      <NavContainer navSearch={navSearch} logo={logo} mainNav={mainNav} utilityNav={utilityNav} className="ma__header__nav-container" />
    </nav>
  );
};
HeaderNav.propTypes = {
  /** An uninstantiated component which handles displaying the utility nav. */
  UtilityNav: propTypes.elementType,
  /** An uninstantiated component which handles displaying individual items within the utility nav. */
  UtilityItem: propTypes.elementType,
  /** An uninstantiated component which handles displaying menu portion of the header. */
  MainNav: propTypes.elementType,
  /** An uninstantiated component which handles displaying individual menu items within the menu. */
  NavItem: propTypes.elementType,
  /** An uninstantiated component which handles displaying the site logo. */
  Logo: propTypes.elementType,
  /** An uninstantiated component which handles search functionality. */
  NavSearch: propTypes.elementType,
  /** An uninstantiated component which handles displaying the menu button on mobile. */
  ButtonContainer: propTypes.elementType,
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

export const HeaderButtonContainer = () => {
  const menuButtonRef = React.useRef();
  const closeButtonRef = React.useRef();
  const windowWidth = useWindowWidth();
  const hide = React.useCallback(($content) => {
    const body = document.querySelector('body');
    const mainNav = document.querySelector('.ma__main-nav__items');
    const submenuClass = 'show-submenu';
    const openClass = 'is-open';
    const closeClass = 'is-closed';
    const breakpoint = 840;
    body.classList.remove(submenuClass);
    const open = mainNav.querySelector(`.${openClass}`);
    if (open) {
      open.classList.remove(openClass);
    }

    if (windowWidth <= breakpoint) {
      $content.classList.add(closeClass);
    } else {
      // @todo animate here!
      $content.classList.add(closeClass);
    }
  }, [windowWidth]);
  React.useEffect(() => {
    const menuButton = menuButtonRef.current;
    const closeButton = closeButtonRef.current;
    const openClass = 'is-open';
    const mainNav = document.querySelector('.ma__main-nav__items');
    const toggleMobileMenu = () => {
      const body = document.querySelector('body');
      if (body.classList.contains('show-menu')) {
        body.classList.remove('show-menu');
      } else {
        body.classList.add('show-menu');
      }
    };
    if (menuButton) {
      menuButton.addEventListener('click', () => {
        const $openContent = mainNav.querySelector(`.js-main-nav-content.${openClass}`);
        if ($openContent) {
          hide($openContent);
        }

        document.querySelector('.ma__utility-nav__content').classList.add('is-closed');
        if (windowWidth < 841 && document.querySelector('.ma__header')) {
          toggleMobileMenu();
        }
      });
    }
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        const $openContent = mainNav.querySelector(`.js-main-nav-content.${openClass}`);
        if ($openContent) {
          hide($openContent);
        }
      });
    }
  }, [windowWidth, menuButtonRef, closeButtonRef]);
  return(
    <div className="ma__header__button-container js-sticky-header">
      <button type="button" ref={closeButtonRef} className="ma__header__back-button js-close-sub-nav"><span>Back</span></button>
      <button type="button" ref={menuButtonRef} className="ma__header__menu-button js-header-menu-button">
        <span>Menu</span>
        <span className="ma__header__menu-icon" />
      </button>
    </div>
  );
};
export const HeaderLogo = () => {
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
    title: 'Mass.gov homepage',
    Wrapper: ({ children }) => (<div className="ma__header__logo">{children}</div>)
  };
  return(
    <SiteLogo {...logoProps} />
  );
};

export const HeaderNavSearch = ({ narrow = false }) => {
  const classes = classNames({
    'ma__header__nav-search': narrow,
    'ma__header__search js-header-search-menu': !narrow
  });
  return(
    <div className={classes}>
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
};
// For whatever reason, Header has a different nav search for mobile.
export const HeaderMobileNavSearch = () => (
  <div className="ma__header__nav-search js-header__nav-search">
    <div className="ma__header-search">
      <form action="#" className="ma__form js-header-search-form" role="search">
        { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="header-mobile-search" className="ma__header-search__label">Search terms</label>
        <input id="header-mobile-search" className="ma__header-search__input" placeholder="Search Mass.gov" type="search" inputMode="search" />
        <ButtonWithIcon usage="secondary" icon={<IconSearch />}>Search</ButtonWithIcon>
      </form>
    </div>
  </div>
);
export const HeaderUtilityItem = ({ children }) => (
  <li className="ma__utility-nav__item">
    {children}
  </li>
);
HeaderUtilityItem.propTypes = {
  children: propTypes.node
};
export const HeaderUtilityNav = ({ UtilityItem, items = [], narrow = true }) => {
  const RenderedUtilityItem = getFallbackComponent(UtilityItem, HeaderUtilityItem);
  const classes = classNames('ma__header__utility-nav', {
    'ma__header__utility-nav--narrow': narrow,
    'ma__header__utility-nav--wide': !narrow
  });
  return(
    <div className={classes}>
      <div className="ma__utility-nav js-util-nav">
        <ul className="ma__utility-nav__items">
          {items.map((ItemComponent, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <RenderedUtilityItem key={`header-utility-item-${index}`}><ItemComponent narrow={narrow} /></RenderedUtilityItem>
          ))}
        </ul>
      </div>
    </div>
  );
};
HeaderUtilityNav.propTypes = {
  /** An uninstantiated component which handles displaying individual items within the utility nav. */
  UtilityItem: propTypes.elementType,
  /** An array of uninstantiated components to render within the utility navigation.  */
  items: propTypes.arrayOf(propTypes.elementType),
  /** A boolean representing when the UtilityNav is being displayed within a narrow screen. */
  narrow: propTypes.bool
};

export const HeaderContainer = ({
  Logo,
  NavSearch
}) => {
  const RenderedLogo = (Logo !== null) ? Logo : null;
  const RenderedNavSearch = getFallbackComponent(NavSearch, HamburgerNavSearch);
  return(
    <div className="ma__header__container">
      { RenderedLogo !== null && <RenderedLogo />}
      { RenderedNavSearch !== null && <RenderedNavSearch />}
    </div>
  );
};
HeaderContainer.propTypes = {
  /** An uninstantiated component which handles displaying the site logo. */
  Logo: propTypes.elementType,
  /** An uninstantiated component which handles search functionality. */
  NavSearch: propTypes.elementType
};

export default HeaderNav;
