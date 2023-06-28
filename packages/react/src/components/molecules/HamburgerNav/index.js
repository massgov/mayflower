import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import NavContainer from 'MayflowerReactMolecules/NavContainer';
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
  siteName = 'Mass.gov',
  mainItems = [],
  utilityItems = [],
  headerType
}) => {
  const windowWidth = useWindowWidth();
  const isMobileWindow = windowWidth !== null && windowWidth < 840; // desktop breakpoint
  const isSmallMobileWindow = windowWidth !== null && windowWidth < 621; // css breakpoint $bp-small-max
  const RenderedMainNav = getFallbackComponent(MainNav, HamburgerMainNav);
  let RenderedUtilityNav;
  let navSearch = null;
  let utilityNav = null;
  let mainNav = null;
  const RenderedNavSearch = getFallbackComponent(NavSearch, HamburgerNavSearch);
  const RenderedLogo = getFallbackComponent(Logo, HamburgerSiteLogo);
  // If UtilityItem is undefined, UtilityNav will fallback to HamburgerUtilityItem.
  const RenderedUtilityItem = getFallbackComponent(UtilityItem, HamburgerUtilityItem);
  // If NavItem is undefined, HamburgerMainNav falls back to HamburgerNavItem.
  const RenderedNavItem = getFallbackComponent(NavItem, HamburgerNavItem);
  const logo = (RenderedLogo !== null ? <RenderedLogo /> : null);
  const menuButtonRef = React.useRef();
  const alertOffset = React.useRef();
  const [menuOpen, setMenuOpen] = React.useState(false);

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
      setMenuOpen(false);
      if (document.querySelector('html.stickyTOCtmp')) {
        document.querySelector('html.stickyTOCtmp').classList.add('stickyTOC');
        document.querySelector('html.stickyTOCtmp').classList.remove('stickyTOCtmp');
      }
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'main menu for mass.gov');
      if (hamburgerMenuContainer && hamburgerMenuContainer.hasAttribute('style')) {
        hamburgerMenuContainer.removeAttribute('style');
      }
      if (searchInput && searchInput.hasAttribute('autofocus')) {
        searchInput.removeAttribute('autofocus');
      }
      if (feedbackButton) {
        feedbackButton.classList.remove('hide-button');
      }
      if (jumpToSearchButton) {
        jumpToSearchButton.setAttribute('aria-expanded', 'false');
      }
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

  if (isMobileWindow) {
    RenderedUtilityNav = getFallbackComponent(UtilityNav, HamburgerUtilityNav);
    mainNav = (RenderedMainNav !== null ? <RenderedMainNav NavItem={RenderedNavItem} items={mainItems} onCloseMenu={closeMenu} /> : null);
    utilityNav = (RenderedUtilityNav !== null ? <RenderedUtilityNav items={utilityItems} narrow UtilityItem={RenderedUtilityItem} /> : null);
    navSearch = (RenderedNavSearch !== null ? <RenderedNavSearch /> : null);
  } else {
    RenderedUtilityNav = getFallbackComponent(UtilityNav, HamburgerUtilityNav);
    utilityNav = (RenderedUtilityNav !== null ? <RenderedUtilityNav items={utilityItems} narrow UtilityItem={RenderedUtilityItem} /> : null);
    navSearch = (RenderedNavSearch !== null ? <RenderedNavSearch /> : null);
    mainNav = (RenderedMainNav !== null ? <RenderedMainNav NavItem={RenderedNavItem} items={mainItems} /> : null);
  }
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
      setMenuOpen(true);
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-label', 'main menu for mass.gov');
      if (feedbackButton) {
        feedbackButton.classList.add('hide-button');
      }
      if (jumpToSearchButton) {
        jumpToSearchButton.setAttribute('aria-expanded', 'true');
        jumpToSearchButton.setAttribute('tabIndex', -1);
      }
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
        menuOverlay.classList.add('overlay-open');
        menuOverlay.onclick = () => {
          closeMenu();
        };
      }
      if (alertOverlay) {
        if (document.querySelector('.ma__emergency-alerts')) {
          alertOverlay.classList.add('overlay-open');
        }
      }
    }
  }, [menuButtonRef, alertOffset]);

  const toggleMenu = React.useCallback(() => {
    const body = document.querySelector('body');
    const isMenuOpen = body.classList.contains('show-menu');
    const hamburgerMenuContainer = document.querySelector('.ma__header__hamburger__nav-container');

    if (hamburgerMenuContainer) { // To prevent null in the original mobile main nav.
      if (isMenuOpen) {
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
  if (typeof document !== 'undefined') { // check document for SSR
    const hamburgerNavContainer = document.querySelector('.ma__header__hamburger__nav-container');
    let topLevelSelectors = '';
    if (isSmallMobileWindow) {
      topLevelSelectors = '#header-mobile-search, #header-mobile-search + button, .ma__main__hamburger-nav__top-link, .goog-te-gadget a, .ma__header__hamburger__utility-nav .ma__utility-nav__link';
    } else {
      // Header search input and search button that are not displayed inside the main nav mobile tray when the window width is greater than 620px.
      topLevelSelectors = '.ma__main__hamburger-nav__top-link, .goog-te-gadget a, .ma__header__hamburger__utility-nav .ma__utility-nav__link';
    }
    const topLevelLinks = hamburgerNavContainer && hamburgerNavContainer.querySelectorAll(topLevelSelectors);
    useHamburgerNavKeydown(closeMenu, topLevelLinks);
  }
  // Enables jump to search events.
  useJumpToSearch(openMenu);

  return(
    <>
      <HamburgerContext.Provider value={{
        openMenu,
        closeMenu,
        toggleMenu
      }}
      >
        <nav className="ma__header__hamburger__nav" aria-label={(headerType === 'mixed' && !isMobileWindow) ? 'utility options' : 'main navigation'} id="hamburger-main-navigation">
          <div className="ma__header__hamburger-wrapper">
            <div className="ma__header__hamburger__button-container js-sticky-header">
              <button
                ref={menuButtonRef}
                type="button"
                aria-expanded="false"
                aria-label={`Open the main menu for ${siteName}`}
                className="ma__header__hamburger__menu-button js-header-menu-button"
              >
                <span className="ma__header__hamburger__menu-icon" />
                <span className={`ma__header__hamburger__menu-text--mobile js-header__menu-text--mobile ${menuOpen ? '' : 'show'}`}>
                  {siteName}
                </span>
                <span className={`ma__header__hamburger__menu-text js-header__menu-text ${menuOpen ? '' : 'show'}`}>
                  Menu
                </span>
                <span className={`ma__header__hamburger__menu-text--close js-header__menu-text--close ${menuOpen ? 'show' : ''}`}>
                  Close
                </span>
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
            {(headerType !== 'mixed' || (headerType === 'mixed' && isMobileWindow)) && (
            <NavContainer
              logo={logo}
              mainNav={mainNav}
              utilityNav={utilityNav}
              navSearch={navSearch}
              className="ma__header__hamburger__nav-container"
            />
            )}
          </div>
        </nav>
      </HamburgerContext.Provider>
      <div className="menu-overlay" />
    </>
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
  /** Override default siteName rendered as the hamburger menu toggle button text and aria-label on mobile */
  siteName: propTypes.string,
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

export const HamburgerMainNav = ({ NavItem, items = [], onCloseMenu }) => {
  const RenderedNavItem = getFallbackComponent(NavItem, HamburgerNavItem);
  return(
    <div className="ma__main__hamburger-nav">
      <ul role="menubar" className="ma__main__hamburger-nav__items js-main-nav-hamburger">
        { items.map((item, itemIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <RenderedNavItem key={`hamburger-nav-navitem--${itemIndex}`} {...item} index={itemIndex} onCloseMenu={onCloseMenu} />
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
  })),
  /** Function to close the hamburger menu, passed down from the HamburgerNav . */
  onCloseMenu: propTypes.func
};

export const HamburgerNavItem = ({
  href,
  text,
  active,
  subNav = [],
  index,
  onCloseMenu
}) => {
  const hasSubNav = subNav && subNav.length > 0;
  const classes = classNames('ma__main__hamburger-nav__item js-main-nav-hamburger-toggle', {
    'has-subnav': hasSubNav,
    'is-active': active
  });
  // This is the same logic as twig for when covid background displays.
  const isCovid = text.toLowerCase().includes('covid');
  const topNavLinkclasses = classNames('ma__main__hamburger-nav__top-link', {
    ' cv-alternate-style': isCovid
  });
  const itemRef = React.useRef();
  const buttonRef = React.useRef();
  const contentRef = React.useRef();
  const ulRef = React.useRef();

  React.useEffect(() => {
    const item = itemRef.current;
    const itemButton = buttonRef.current;
    const contentDiv = contentRef.current;
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

    const openThisSubMenu = () => {
      // If submenu is closed, open the submenu
      item.classList.add('submenu-open');
      itemButton.setAttribute('aria-expanded', 'true');
      item.style.pointerEvents = 'none';
      /** Show the subMenu content. */

      contentDiv.classList.remove('is-closed');
      contentDiv.style.height = 'auto';

      /** Get the computed height of the subMenu. */
      const height = `${contentDiv.clientHeight}px`;
      /** Set the height of the submenu as 0px, */
      /** so we can trigger the slide down animation. */
      contentDiv.style.height = '0';

      setTimeout(() => {
        item.removeAttribute('style');
        contentDiv.style.height = height;
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
    };

    const itemButtonClick = () => {
      // close all other submenus
      anotherCloseSubMenus(item);

      // toggle the selected submenu
      if (item.classList.contains('submenu-open')) {
      // If submenu is already open, close the submenu
        item.classList.remove('submenu-open');
        itemButton.setAttribute('aria-expanded', 'false');
        item.style.pointerEvents = 'none';
        contentDiv.style.height = '0';
        if (subItems) {
          subItems.style.opacity = '0';
        }

        // Set a little bit of delay to run
        // The open/close submenu animation is CSS.
        // Unable to confirm the completion of the animation in JS.
        // Unable to use callback in this case.
        setTimeout(() => {
          item.removeAttribute('style');
          item.querySelector('.js-main-nav-hamburger-content').classList.add('is-closed');
        }, 500);
      } else {
      // If submenu is closed, open the submenu
        openThisSubMenu();
      }
    };
    const itemButtonKeyDown = (e) => {
      // Easy access to the key that was pressed.
      const { key, code } = e;
      const action = {
        tab: key === 'Tab', // tab
        esc: key === 'Esc' || key === 'Escape', // esc
        left: key === 'Left' || key === 'ArrowLeft', // left arrow
        right: key === 'Right' || key === 'ArrowRight', // right arrow
        up: key === 'Up' || key === 'ArrowUp', // up arrow
        down: key === 'Down' || key === 'ArrowDown', // down arrow
        space: key === ' ' || code === 'Space', // space
        enter: key === 'Enter' // enter
      };
      const focusedElement = document.activeElement;

      // Navigate into or within a submenu using the up/down arrow keys.
      if ((action.up || action.down) && subItems) {
        const dropdownLinks = subItems.querySelectorAll('.js-main-nav-hamburger__subitem .js-main-nav-hamburger__link');
        const dropdownLinksLength = dropdownLinks.length;
        let focusIndexInDropdown = Array.from(dropdownLinks).findIndex((link) => link === focusedElement);

        if (item.classList.contains('submenu-open')) {
          // ArrowUp focus on the previous submenu item
          // ArrowDown focus on the next submenu item
          focusIndexInDropdown += (action.up ? -1 : 1);
          // Wrap around if at the end of the submenu.
          focusIndexInDropdown = ((focusIndexInDropdown % dropdownLinksLength) + dropdownLinksLength) % dropdownLinksLength;
          dropdownLinks[focusIndexInDropdown].focus();
        } else {
          // Close all other submenus and open the selected submenu if it's not open already.
          anotherCloseSubMenus();
          openThisSubMenu();
          if (action.up) {
            // arrowUp set focus to the last item
            focusIndexInDropdown = dropdownLinksLength - 1;
          } else {
            // arrowDown set focus to the first item
            focusIndexInDropdown = 0;
          }
          dropdownLinks[focusIndexInDropdown].focus();
        }
      }

      if (action.esc) {
        // If the main nav item is open, escape key closes the accordion and sets focus on the main nav toggle button
        if (item.classList.contains('submenu-open')) {
          anotherCloseSubMenus();
          itemButton.focus();
        }
        // Hamburger menu escape is handled in useHamburgerNavKeydown hook
      }
    };
    if (itemButton) {
      itemButton.addEventListener('click', itemButtonClick);
      item.addEventListener('keydown', itemButtonKeyDown);
    }
    return(() => {
      if (itemButton) {
        itemButton.removeEventListener('click', itemButtonClick);
        item.removeEventListener('keydown', itemButtonKeyDown);
      }
    });
  }, [itemRef, buttonRef, contentRef, ulRef]);
  return(
    <li ref={itemRef} role="menuitem" className={classes} tabIndex="-1">
      {hasSubNav ? (
        <>
          <button ref={buttonRef} type="button" id={`button-mobile-${index}`} className="ma__main__hamburger-nav__top-link js-main-nav-hamburger__top-link" aria-haspopup="true" tabIndex="0">
            <span className="visually-hidden show-label">Show the sub topics of </span>
            {text}
            <span className="toggle-indicator" aria-hidden="true" />
          </button>
          <div ref={contentRef} className="ma__main__hamburger-nav__subitems js-main-nav-hamburger-content is-closed">
            <ul ref={ulRef} id={`menu-mobile-${index}`} role="menu" aria-labelledby={`button-mobile-${index}`} className="ma__main__hamburger-nav__container js-main-nav-hamburger__container">
              { subNav.map((item, itemIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={`hamburger-nav-subitem--${index}-${itemIndex}`} role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                  <a
                    href={item.href}
                    role="menuitem"
                    className="ma__main__hamburger-nav__link js-main-nav-hamburger__link"
                    onClick={onCloseMenu}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <a
          href={href}
          className={topNavLinkclasses}
          tabIndex="0"
          onClick={onCloseMenu}
        >
          {text}
        </a>
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
  index: propTypes.oneOfType([propTypes.number, propTypes.string]),
  /** Function to close the hamburger menu, passed down from the HamburgerNav. */
  onCloseMenu: propTypes.func
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
