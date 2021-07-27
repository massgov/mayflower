import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import NavContainer from 'MayflowerReactMolecules/NavContainer';
import IconArrowbent from 'MayflowerReactBase/Icon/IconArrowbent';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import getFallbackComponent from 'MayflowerReactComponents/utilities/getFallbackComponent';
import { useHamburgerNavKeydown, useJumpToSearch, useMenuButtonEffects } from 'MayflowerReactMolecules/HamburgerNav/hooks';
import useWindowWidth from 'MayflowerReactComponents/hooks/use-window-width';

export const HamburgerContext = React.createContext();

const HamburgerNav = ({
  UtilityNav,
  UtilityItem,
  MainNav,
  NavItem,
  NavSearch,
  Logo,
  mainItems = [],
  utilityItems = []
}) => {
  const windowWidth = useWindowWidth();
  const isMobileWindow = windowWidth !== null && windowWidth < 840;
  const RenderedMainNav = getFallbackComponent(MainNav, HamburgerMainNav);
  let RenderedUtilityNav;
  let navSearch = null;
  let utilityNav = null;
  let mainNav = null;
  const RenderedNavSearch = getFallbackComponent(NavSearch, HamburgerNavSearch);
  if (isMobileWindow) {
    RenderedUtilityNav = getFallbackComponent(UtilityNav, HamburgerUtilityNav);
    mainNav = (RenderedMainNav !== null ? <RenderedMainNav NavItem={RenderedNavItem} items={mainItems} /> : null);
    utilityNav = (RenderedUtilityNav !== null ? <RenderedUtilityNav items={utilityItems} narrow UtilityItem={RenderedUtilityItem} /> : null);
    navSearch = (RenderedNavSearch !== null ? <RenderedNavSearch /> : null);
  } else {
    RenderedUtilityNav = getFallbackComponent(UtilityNav, HamburgerUtilityNav);
    utilityNav = (RenderedUtilityNav !== null ? <RenderedUtilityNav items={utilityItems} narrow UtilityItem={RenderedUtilityItem} /> : null);
    navSearch = (RenderedNavSearch !== null ? <RenderedNavSearch /> : null);
    mainNav = (RenderedMainNav !== null ? <RenderedMainNav NavItem={RenderedNavItem} items={mainItems} /> : null);
  }
  const RenderedLogo = getFallbackComponent(Logo, HamburgerSiteLogo);
  // If UtilityItem is undefined, UtilityNav will fallback to HamburgerUtilityItem.
  const RenderedUtilityItem = getFallbackComponent(UtilityItem, HamburgerUtilityItem);
  // If NavItem is undefined, HamburgerMainNav falls back to HamburgerNavItem.
  const RenderedNavItem = getFallbackComponent(NavItem, HamburgerNavItem);
  const logo = (RenderedLogo !== null ? <RenderedLogo /> : null);
  const menuButtonRef = React.useRef();
  const alertOffset = React.useRef();
  const openMenu = React.useCallback(() => {
    const menuButton = menuButtonRef.current;
    if (menuButton) {
      let heightAboveMenuContainer;
      let emergencyAlertsHeight;
      let alertOffsetAdjusted = 0;
      const body = document.querySelector('body');
      const feedbackButton = document.querySelector('.ma__fixed-feedback-button');
      const jumpToSearchButton = document.querySelector('.js-header-search-access-button');
      const menuOverlay = document.querySelector('.menu-overlay');
      const alertOverlay = document.querySelector('.alert-overlay');

      const lockPage = () => {
        const alertlOffsetPosition = alertOffset.current;
        if (document.querySelector('.ma__emergency-alerts')) {
          body.style.top = `-${alertlOffsetPosition}px`;
        } else {
          body.style.top = 0;
        }
        const hamburgerMenuContainer = document.querySelector('.ma__header__hamburger__nav-container');
        heightAboveMenuContainer = hamburgerMenuContainer.getBoundingClientRect().top;
      };
      if (document.querySelector('html.stickyTOC')) {
        document.querySelector('html.stickyTOC').classList.add('stickyTOCtmp');
        document.querySelector('html.stickyTOC').classList.remove('stickyTOC');
      }
      // Start open menu tasks.
      body.classList.add('show-menu');
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-label', 'Close the main menu for mass.gov');
      if (feedbackButton) {
        feedbackButton.classList.add('hide-button');
      }
      jumpToSearchButton && jumpToSearchButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-pressed', 'true');
      const alertsHeader = document.querySelector('.ma__emergency-alerts__header');
      body.style.position = 'fixed';
      if (alertsHeader !== null) {
        const emergencyAlerts = document.querySelector('.ma__emergency-alerts');
        emergencyAlertsHeight = emergencyAlerts.offsetHeight;
        alertOffsetAdjusted = alertsHeader.offsetHeight / 2;
        alertOffset.current = emergencyAlertsHeight - alertOffsetAdjusted;
        lockPage();
        const hamburgerNavOffset = document.querySelector('.ma__header__hamburger__nav').offsetHeight;
        const hamburgerMenuContainer = document.querySelector('.ma__header__hamburger__nav-container');
        heightAboveMenuContainer = alertOffsetAdjusted + hamburgerNavOffset;
        hamburgerMenuContainer.style.height = `calc(100vh - ${heightAboveMenuContainer}px)`;
      }
      if (menuOverlay) {
        let overlayOffset = heightAboveMenuContainer;
        const width = body.clientWidth;
        if (width > 840) {
          overlayOffset -= 1;
        }
        menuOverlay.style.top = `${overlayOffset}px`;
        menuOverlay.classList.add('overlay-open');
        menuOverlay.onclick = () => {
          closeMenu();
        };
      }
      if (alertOverlay) {
        if (document.querySelector('.ma__emergency-alerts')) {
          alertOverlay.classList.add('overlay-open');
          alertOverlay.style.height = `${alertOffsetAdjusted}px`;
        }
      }
    }
  }, [menuButtonRef, alertOffset]);

  const commonCloseMenuTasks = React.useCallback(() => {
    const menuButton = menuButtonRef.current;
    if (menuButton) {
      const body = document.querySelector('body');
      const hamburgerMenuContainer = document.querySelector('.ma__header__hamburger__nav-container');
      const searchInput = document.querySelector('.ma__header__hamburger__nav-container .ma__header-search__input');
      const feedbackButton = document.querySelector('.ma__fixed-feedback-button');
      const menuOverlay = document.querySelector('.menu-overlay');
      const alertOverlay = document.querySelector('.alert-overlay');
      const jumpToSearchButton = document.querySelector('.js-header-search-access-button');

      body.classList.remove('show-menu');
      if (document.querySelector('html.stickyTOCtmp')) {
        document.querySelector('html.stickyTOCtmp').classList.add('stickyTOC');
        document.querySelector('html.stickyTOCtmp').classList.remove('stickyTOCtmp');
      }
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open the main menu for mass.gov');
      if (hamburgerMenuContainer && hamburgerMenuContainer.hasAttribute('style')) {
        hamburgerMenuContainer.removeAttribute('style');
      }
      if (searchInput && searchInput.hasAttribute('autofocus')) {
        searchInput.removeAttribute('autofocus');
      }
      if (feedbackButton) {
        feedbackButton.classList.remove('hide-button');
      }
      jumpToSearchButton && jumpToSearchButton.setAttribute('aria-expanded', 'false');
      if (menuOverlay) {
        menuOverlay.classList.remove('overlay-open');
      }
      if (alertOverlay) {
        alertOverlay.classList.remove('overlay-open');
        alertOverlay.removeAttribute('style');
      }
    }
  }, [menuButtonRef]);
  const closeMenu = React.useCallback(() => {
    const menuButton = menuButtonRef.current;
    const body = document.querySelector('body');
    const alertlOffsetPosition = alertOffset.current;
    if (window && menuButton) {
      const width = body.clientWidth;
      commonCloseMenuTasks();
      menuButton.setAttribute('aria-pressed', 'false');

      // Set focus on the menu button.
      setTimeout(() => {
        menuButton.focus();
      }, 100);

      if ((width > 840)) {
        const directLink = document.querySelector('.js-utility-nav--wide .ma__utility-nav__item .direct-link');
        if (directLink && directLink.hasAttribute('tabindex')) {
          const googleTeMenuValue = document.querySelector('.js-utility-nav--wide .ma__utility-nav__item  .goog-te-menu-value');
          const jsUtilNavToggle = document.querySelector('.js-utility-nav--wide .ma__utility-nav__item  .js-util-nav-toggle');
          const searchAccessButton = document.querySelector('.js-header-search-access-button');
          if (googleTeMenuValue) {
            googleTeMenuValue.removeAttribute('tabindex');
          }
          if (directLink) {
            directLink.removeAttribute('tabindex');
          }
          if (jsUtilNavToggle) {
            jsUtilNavToggle.removeAttribute('tabindex');
          }
          if (searchAccessButton) {
            searchAccessButton.removeAttribute('tabindex');
          }
        }
      }

      if (body.style.position === 'fixed') {
        // At the same time, the alert needs to be scrolled up to the position again to retain the page elements position.
        body.removeAttribute('style');
        body.style.position = 'relative';
        window.scrollTo(0, alertlOffsetPosition);
      }
    }
  }, [menuButtonRef, alertOffset, commonCloseMenuTasks]);

  const toggleMenu = React.useCallback(() => {
    const body = document.querySelector('body');
    const hamburgerMenuContainer = document.querySelector('.ma__header__hamburger__nav-container');
    if (hamburgerMenuContainer) { // To prevent null in the original mobile main nav.
      if (body.classList.contains('show-menu')) {
        // This control the visibility of the dropdown to keyboard and screen reader users while maintaining the show/hide animation effect.
        // .toggleAttribute() doesn't work with ios11.
        hamburgerMenuContainer.setAttribute('aria-hidden', '');
        closeMenu();
        setTimeout(() => {
          document.querySelector('.js-header-menu-button').focus();
        }, 100);
      } else {
        hamburgerMenuContainer.removeAttribute('aria-hidden');
        openMenu();
        // Set buttons between menu button and hamburger menu unfocusable to set focus on the first focusable item in the menu at next tabbing.
        const googleTeMenuValue = document.querySelector('.js-utility-nav--wide .ma__utility-nav__item  .goog-te-menu-value');
        const directLink = document.querySelector('.js-utility-nav--wide .ma__utility-nav__item  .direct-link');
        const jsUtilNavToggle = document.querySelector('.js-utility-nav--wide .ma__utility-nav__item  .js-util-nav-toggle');
        if (googleTeMenuValue) {
          googleTeMenuValue.setAttribute('tabindex', '-1');
        }
        if (directLink) {
          directLink.setAttribute('tabindex', '-1');
        }
        if (jsUtilNavToggle) {
          jsUtilNavToggle.setAttribute('tabindex', '-1');
        }
      }
    }
  }, [openMenu, closeMenu]);

  // Enables menu open/close events.
  useMenuButtonEffects(menuButtonRef, toggleMenu);
  // Enables keyboard control of menu.
  useHamburgerNavKeydown(closeMenu);
  // Enables jump to search events.
  useJumpToSearch(openMenu);
  return(
    <HamburgerContext.Provider value={{
      openMenu,
      closeMenu,
      toggleMenu
    }}
    >
      <nav className="ma__header__hamburger__nav" aria-label="main navigation" id="hamburger-main-navigation" role="navigation">
        <div className="ma__header__hamburger-wrapper">
          <div className="ma__header__hamburger__button-container js-sticky-header">
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded="false"
              aria-label="Open the main menu for mass.gov"
              className="ma__header__hamburger__menu-button js-header-menu-button"
            >
              <span className="ma__header__hamburger__menu-icon" />
              <span className="ma__header__hamburger__menu-text js-header__menu-text" />
            </button>
            {
              navSearch && (
                <button
                  type="button"
                  aria-expanded="false"
                  className="ma__header__hamburger__search-access-button js-header-search-access-button"
                >
                  <span className="ma__visually-hidden">Access to search</span>
                  <IconSearch />
                </button>
              )
            }
          </div>
          {RenderedUtilityNav !== null && <RenderedUtilityNav items={utilityItems} UtilityItem={RenderedUtilityItem} narrow={false} />}
          <NavContainer logo={logo} mainNav={mainNav} utilityNav={utilityNav} navSearch={navSearch} className="ma__header__hamburger__nav-container" aria-hidden="true" />
        </div>
      </nav>
    </HamburgerContext.Provider>
  );
};

HamburgerNav.propTypes = {
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
  utilityItems: propTypes.arrayOf(propTypes.elementType),
  /** A string that represents the type of header this component is displayed in. This is needed for figuring out when to display using slim or not. Currently only supports hamburger and mixed. */
  headerType: propTypes.string
};

export const HamburgerMainNav = ({ NavItem, items = [] }) => {
  const RenderedNavItem = getFallbackComponent(NavItem, HamburgerNavItem);
  return(
    <div className="ma__main__hamburger-nav">
      <ul role="menubar" className="ma__main__hamburger-nav__items js-main-nav-hamburger">
        { items.map((item, itemIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <RenderedNavItem key={`hamburger-nav-navitem--${itemIndex}`} {...item} index={itemIndex} />
        ))}
      </ul>
    </div>
  );
};
HamburgerMainNav.propTypes = {
  /** An uninstantiated component which handles displaying individual menu items within the menu. */
  NavItem: propTypes.elementType,
  /** An array of items used to create the menu. */
  items: propTypes.arrayOf(propTypes.shape({
    href: propTypes.string,
    text: propTypes.string,
    active: propTypes.bool,
    subNav: propTypes.arrayOf(propTypes.shape({
      href: propTypes.string,
      text: propTypes.string
    }))
  }))
};

export const HamburgerNavItem = ({
  href,
  text,
  active,
  subNav = [],
  index
}) => {
  const hasSubNav = subNav && subNav.length > 0;
  const classes = classNames('ma__main__hamburger-nav__item js-main-nav-hamburger-toggle', {
    'has-subnav': hasSubNav,
    'is-active': active
  });
  const itemRef = React.useRef();
  const buttonRef = React.useRef();
  const contentRef = React.useRef();
  const ulRef = React.useRef();
  const { closeMenu } = React.useContext(HamburgerContext);
  // This is the same logic as twig for when covid background displays.
  const isCovid = text.toLowerCase().includes('covid');
  React.useEffect(() => {
    const item = itemRef.current;
    const itemButton = buttonRef.current;
    const subItems = ulRef.current;
    if (subItems) {
      subItems.style.opacity = '0';
    }
    const closeNarrowUtilContent = () => {
      const utilNarrowButton = document.querySelector('.ma__header__hamburger__utility-nav--narrow button.js-util-nav-toggle');
      const utilNarrowContent = utilNarrowButton ? utilNarrowButton.nextElementSibling : null;
      const utilNarrowContainer = utilNarrowContent ? utilNarrowContent.querySelector('.ma__utility-nav__container') : null;
      if (utilNarrowContent) {
        const thisNavContainer = utilNarrowButton.closest('.ma__utility-nav__item');
        utilNarrowButton.setAttribute('aria-expanded', 'false');
        utilNarrowContent.setAttribute('aria-hidden', 'true');
        thisNavContainer.style.pointerEvents = 'none';
        setTimeout(() => {
          thisNavContainer.removeAttribute('style');
        }, 700);
        utilNarrowContent.style.maxHeight = '0';
        utilNarrowContainer.style.opacity = '0';
        setTimeout(() => {
          utilNarrowContent.classList.add('is-closed');
        }, 500);
      }
    };
    const anotherCloseSubMenus = (menuItem) => {
      const menuItems = document.querySelectorAll('.js-main-nav-hamburger-toggle');
      menuItems.forEach((li) => {
        if (menuItem !== li && li.classList.contains('submenu-open')) {
          li.classList.remove('submenu-open');
          li.querySelector('.js-main-nav-hamburger__top-link').setAttribute('aria-expanded', 'false');
          // eslint-disable-next-line no-param-reassign
          li.style.pointerEvents = 'none';
          /** Slide up. */
          // eslint-disable-next-line no-param-reassign
          li.querySelector('.js-main-nav-hamburger-content').style.height = '0';
          // eslint-disable-next-line no-param-reassign
          li.querySelector('.js-main-nav-hamburger__container').style.opacity = '0';
          setTimeout(() => {
            li.removeAttribute('style');
            li.querySelector('.js-main-nav-hamburger-content').classList.add('is-closed');
          }, 500);
        }
      });
    };
    const itemButtonClick = () => {
      anotherCloseSubMenus(item);

      if (item.classList.contains('submenu-open')) {
        item.classList.remove('submenu-open');
        itemButton.setAttribute('aria-expanded', 'false');
        item.style.pointerEvents = 'none';

        setTimeout(() => {
          item.removeAttribute('style');
        }, 700);
      } else {
        item.classList.add('submenu-open');
        itemButton.setAttribute('aria-expanded', 'true');
        item.style.pointerEvents = 'none';
        setTimeout(() => {
          item.removeAttribute('style');
        }, 500);
      }

      if (item.querySelector('.js-main-nav-hamburger-content').classList.contains('is-closed')) {
        /** Show the subMenu. */

        item.querySelector('.js-main-nav-hamburger-content').classList.remove('is-closed');
        item.querySelector('.js-main-nav-hamburger-content').style.height = 'auto';

        /** Get the computed height of the subMenu. */
        const height = `${item.querySelector('.js-main-nav-hamburger-content').clientHeight}px`;
        /** Set the height of the submenu as 0px, */
        /** so we can trigger the slide down animation. */
        item.querySelector('.js-main-nav-hamburger-content').style.height = '0';

        setTimeout(() => {
          item.querySelector('.js-main-nav-hamburger-content').style.height = height;
          item.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
          if (subItems) {
            subItems.style.opacity = '1';
          }
        }, 500);

        /** Close Utility menu content when a sub menu is open. */
        const body = document.querySelector('body');

        const width = body.clientWidth;
        if (width < 840) {
          closeNarrowUtilContent();
        }
      } else {
        item.querySelector('.js-main-nav-hamburger-content').style.height = '0';
        if (subItems) {
          subItems.style.opacity = '0';
        }

        // Set a little bit of delay to run
        // The open/close submenu animation is CSS.
        // Unable to confirm the completion of the animation in JS.
        // Unable to use callback in this case.
        setTimeout(() => {
          item.querySelector('.js-main-nav-hamburger-content').classList.add('is-closed');
        }, 500);
      }
    };
    const itemButtonKeyDown = (e) => {
      if (e.code === 'ArrowDown' || e.key === 'ArrowDown') {
        if (subItems) {
          const first = subItems.getElementsByTagName('li')[0];
          first.querySelector('.js-main-nav-hamburger__link').focus();
        }
      }

      // 'e.key === "Esc"' is for IE11.
      if (e.code === 'Escape' || e.key === 'Escape' || e.key === 'Esc') {
        if (item.classList.contains('submenu-open')) {
          closeMenu();
        }
      }
    };
    if (itemButton) {
      itemButton.addEventListener('click', itemButtonClick);
      itemButton.addEventListener('keydown', itemButtonKeyDown);
    }
    return(() => {
      if (itemButton) {
        itemButton.removeEventListener('click', itemButtonClick);
        itemButton.removeEventListener('keydown', itemButtonKeyDown);
      }
    });
  }, [itemRef, buttonRef, contentRef, ulRef]);
  return(
    <li ref={itemRef} role="none" className={classes} tabIndex="-1">
      {isCovid ? (
        <a
          role="menuitem"
          href={href}
          className="ma__main__hamburger-nav__top-link cv-alternate-style"
          tabIndex="0"
        >
          {text}
        </a>
      ) : (
        <button ref={buttonRef} type="button" role="menuitem" id={`button${index}`} className="ma__main__hamburger-nav__top-link js-main-nav-hamburger__top-link" aria-haspopup="true" tabIndex="0">
          <span className="visually-hidden show-label">Show the sub topics of </span>
          {text}
          <span className="toggle-indicator" aria-hidden="true" />
        </button>
      )}
      {hasSubNav && (
        <div ref={contentRef} className="ma__main__hamburger-nav__subitems js-main-nav-hamburger-content is-closed">
          <ul ref={ulRef} id={`menu${index}`} role="menu" aria-labelledby={`button${index}`} className="ma__main__hamburger-nav__container js-main-nav-hamburger__container">
            { subNav.map((item, itemIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`hamburger-nav-subitem--${index}-${itemIndex}`} role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                <a role="menuitem" href={item.href} className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">{item.text}</a>
              </li>
            ))}
            { href && (
              <li role="none" className="ma__main__hamburger-nav__subitem--main js-main-nav-hamburger__subitem">
                <a role="menuitem" href={href} className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">
                  <IconArrowbent />
                  <span>
                    <span className="visually-hidden">See all topics under </span>
                    {text}
                  </span>
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </li>
  );
};
HamburgerNavItem.propTypes = {
  href: propTypes.string,
  text: propTypes.string,
  active: propTypes.bool,
  subNav: propTypes.arrayOf(propTypes.shape({
    href: propTypes.string,
    text: propTypes.string
  })),
  index: propTypes.oneOfType([propTypes.number, propTypes.string])
};

export const HamburgerUtilityItem = ({ children }) => (
  <li className="ma__utility-nav__item">
    {children}
  </li>
);

HamburgerUtilityItem.propTypes = {
  children: propTypes.node
};

export const HamburgerUtilityNav = ({
  UtilityItem,
  items = [],
  narrow = true
}) => {
  const RenderedUtilityItem = getFallbackComponent(UtilityItem, HamburgerUtilityItem);

  const wrapperClassName = classNames('ma__header__hamburger__utility-nav', {
    'ma__header__hamburger__utility-nav--narrow js-utility-nav--narrow': narrow,
    'ma__header__hamburger__utility-nav--wide js-utility-nav--wide': !narrow
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
HamburgerUtilityNav.propTypes = {
  /** An uninstantiated component which handles displaying individual items within the utility nav. */
  UtilityItem: propTypes.elementType,
  /** An array of uninstantiated components to render within the utility navigation.  */
  items: propTypes.arrayOf(propTypes.elementType),
  /** A boolean representing when the UtilityNav is being displayed within a narrow screen. */
  narrow: propTypes.bool
};

export const HamburgerNavSearch = () => (
  <div className="ma__header__hamburger__search ma__header__hamburger__search-bar js-header-search-menu">
    <div className="ma__header-search">
      <form action="#" className="ma__form js-header-search-form" role="search">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="nav-search" className="ma__header-search__label">
          Search terms
        </label>
        <input
          id="nav-search"
          className="ma__header-search__input"
          placeholder="Search Mass.gov"
          type="search"
          inputMode="search"
        />
        <ButtonWithIcon usage="secondary" icon={<IconSearch />} text="Search" />
      </form>
    </div>
  </div>
);
// eslint-disable-next-line react/prop-types
export const HamburgerLogoWrapper = ({ children }) => (<div className="ma__header__hamburger__logo">{children}</div>);

export const HamburgerSiteLogo = ({ Wrapper }) => {
  const DefaultWrapper = getFallbackComponent(Wrapper, HamburgerLogoWrapper);
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
    Wrapper: DefaultWrapper
  };
  return(
    <SiteLogo {...logoProps} />
  );
};
HamburgerSiteLogo.propTypes = {
  /** An uninstantiated component which handles displaying the wrapper around the site logo, if any. */
  Wrapper: propTypes.elementType
};

// eslint-disable-next-line react/prop-types
export const HamburgerMobileLogoWrapper = ({ children }) => (<div className="ma__header__hamburger__logo ma__header__hamburger__logo--mobile">{children}</div>);

export const HamburgerSkipNav = () => (
  <a className="ma__header__hamburger__skip-nav" href="#main-content">skip to main content</a>
);
export const HamburgerContainer = ({ Logo, NavSearch }) => {
  const RenderedLogo = (Logo !== null) ? Logo : null;
  const RenderedNavSearch = getFallbackComponent(NavSearch, HamburgerNavSearch);
  return(
    <div className="ma__header__container">
      {RenderedLogo !== null && <RenderedLogo />}
      {RenderedNavSearch !== null && <RenderedNavSearch />}
    </div>
  );
};

HamburgerContainer.propTypes = {
  /** An uninstantiated component which handles displaying the site logo. */
  Logo: propTypes.elementType,
  /** An uninstantiated component which handles search functionality. */
  NavSearch: propTypes.elementType
};

// For some reason, Header Hamburger has its own Nav Search...
// This appears to be the same version from HeaderMixed.
export const HamburgerMobileNavSearch = () => (
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
export default HamburgerNav;
