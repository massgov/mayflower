import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import NavContainer from 'MayflowerReactMolecules/NavContainer';
import IconArrowbent from 'MayflowerReactBase/Icon/IconArrowbent';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';
import SiteLogo from 'MayflowerReactAtoms/media/SiteLogo';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';

export const HamburgerContext = React.createContext();
export const useHamburgerNavKeydown = (closeMenu) => {
  // Define this using useCallback so this event listener
  // can be deleted when the parent component unmounts.
  const keyDown = React.useCallback((e) => {
    const utilNavWide = document.querySelector('.js-utility-nav--wide');
    const utilNarrowNav = document.querySelector('.ma__header__hamburger__utility-nav--narrow');
    const utilNarrowButton = document.querySelector('.ma__header__hamburger__utility-nav--narrow button.js-util-nav-toggle');
    const utilNarrowContent = utilNarrowButton ? utilNarrowButton.nextElementSibling : null;
    const utilNarrowContainer = utilNarrowContent ? utilNarrowContent.querySelector('.ma__utility-nav__container') : null;
    function closeUtilWideContent() {
      const utilWideContent = document.querySelector('.js-utility-nav--wide .js-util-nav-content');
      if (utilWideContent) {
        const utilWideCloseButton = document.querySelector('.js-utility-nav--wide .js-close-util-nav');

        const utilWideButton = document.querySelector('.js-utility-nav--wide .js-util-nav-toggle');

        // Content state
        utilWideContent.style.height = '0';
        utilWideContent.style.opacity = '0';
        utilWideContent.classList.add('is-closed');
        utilWideContent.setAttribute('aria-hidden', 'true');
        // Close button state
        utilWideCloseButton.setAttribute('aria-expanded', 'false');
        // Utility button state
        utilWideButton.setAttribute('aria-expanded', 'false');
        utilWideButton.setAttribute('aria-pressed', 'false');
        const parentHamburgerNav = utilWideButton.closest('.ma__header__hamburger__nav');
        if (parentHamburgerNav) {
          parentHamburgerNav.classList.toggle('util-nav-content-open');
        }
      }
    }
    function closeNarrowUtilContent() {
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
    }
    // ESC to close menus.
    // 'e.key === "Esc"' is necessary for IE11.
    if (e.key === 'Escape' || e.key === 'Esc' || e.code === 'Escape') {
      const utilNavWideContent = utilNavWide.querySelector('.js-util-nav-content');

      // Log in to... in Utility nav bar
      if (utilNavWideContent && utilNavWideContent.style.opacity === '1') {
        closeUtilWideContent();
        utilNavWide.querySelector('.js-util-nav-toggle').focus();
      }
      // Util nav menus in the hamburger menu
      if (utilNarrowNav) {
        if ((utilNarrowButton !== document.activeElement) && (utilNarrowContainer.style.opacity === '1')) {// Open Log in to... in Hamburger menu: To be consisitent with submenu, keep the content open and set focus on nav button.
          const utilNavContentLinks = utilNarrowNav.querySelectorAll('.js-clickable-link');
          for (let i = 0; i < utilNavContentLinks.length; i += 1) {
            if (utilNavContentLinks[i].innerText === document.activeElement.innerText) {
              utilNarrowButton.focus();
            }
          }
          closeNarrowUtilContent();
        } else {
          const narrowNavItems = utilNarrowNav.querySelectorAll('.ma__utility-nav__link');
          for (let i = 0; i < narrowNavItems.length; i += 1) {
            if (narrowNavItems[i].innerText === document.activeElement.innerText) {
              closeMenu();
            }
          }
        }
      }
      // Main nav elements
      const openSubmenu = document.querySelector('.submenu-open .js-main-nav-hamburger__top-link');
      if (openSubmenu !== document.activeElement) {
        // To prevent to set focus on another top menu button with open submenu.
        const menus = document.querySelectorAll('.ma__main__hamburger-nav__top-link');
        for (let i = 0; i < menus.length; i += 1) {
          if (menus[i] === document.activeElement) {
            closeMenu();
          }
        }
        // Set focus on its parent top menu button.
        const openSubmenuItems = document.querySelectorAll('.submenu-open .js-main-nav-hamburger-content:not(is-closed) .js-main-nav-hamburger__link');
        for (let i = 0; i < openSubmenuItems.length; i += 1) {
          if (openSubmenuItems[i] === document.activeElement) {
            openSubmenu.focus();
          }
        }
      } else {
        closeMenu();
      }
    }
  }, [closeMenu]);
  React.useEffect(() => {
    document.addEventListener('keydown', keyDown);
    return(() => {
      document.removeEventListener('keydown', keyDown);
    });
  }, [keyDown]);
};
export const useJumpToSearch = (openMenu) => {
  const jumpToSearch = React.useCallback((e) => {
    e.preventDefault();
    const body = document.querySelector('body');
    const hamburgerMenuContainer = document.querySelector('.ma__header__hamburger__nav-container');
    const searchInput = document.querySelector('.ma__header__hamburger__nav-container .ma__header-search__input');
    const jumpToSearchButton = document.querySelector('.js-header-search-access-button');

    if (body.classList.contains('show-menu')) {
      // This control the visibility of the dropdown to keyboard and screen reader users while maintaining the show/hide animation effect.
      hamburgerMenuContainer.setAttribute('aria-hidden', '');
      searchInput.focus();
    } else {
      hamburgerMenuContainer.removeAttribute('aria-hidden');
      openMenu();
      setTimeout(() => {
        jumpToSearchButton.setAttribute('aria-pressed', 'true');
        searchInput.setAttribute('autofocus', '');
        searchInput.focus();
      }, 200);
    }
  }, [openMenu]);
  React.useEffect(() => {
    const jumpToSearchButton = document.querySelector('.js-header-search-access-button');

    if (jumpToSearchButton !== null) {
      jumpToSearchButton.addEventListener('click', jumpToSearch);
    }
    return(() => {
      jumpToSearchButton.removeEventListener('click', jumpToSearch);
    });
  }, [jumpToSearch]);
};
export const useMenuButtonEffects = (menuButtonRef, toggleMenu) => {
  const onClick = React.useCallback((e) => {
    const menuButton = menuButtonRef.current;
    if (menuButton) {
      e.preventDefault();
      // For Safari, this ensures to move focus to the menu content.
      if (navigator.appVersion.includes('Safari')) {
        menuButton.focus();
      }
      toggleMenu();
    }
  }, [menuButtonRef, toggleMenu]);
  const onButtonKeyDown = React.useCallback((e) => {
    const width = document.querySelector('body').clientWidth;
    if (e.key === 'Tab' || e.code === 'Tab') {
      if (width < 621) {
        e.preventDefault();
        const hamburgerMenuContainer = document.querySelector('.ma__header__hamburger__nav-container');
        const focusable = hamburgerMenuContainer.querySelectorAll("button, [href], input, [tabindex]:not([tabindex='-1'])");  
        focusable[0].focus();
      }
    }
  }, []);

  const onLogoKeyDown = React.useCallback((e) => {
    if ((e.shiftKey && e.key === 'Tab') || (e.shiftKey && e.code === 'Tab')) {
      setTimeout(() => {
        document.querySelector('.js-header-menu-button').focus();
      }, 100);
    }
  }, []);
  React.useEffect(() => {
    const menuButton = menuButtonRef.current;
    if (menuButton) {
      menuButton.addEventListener('click', onClick);
      menuButton.addEventListener('keydown', onButtonKeyDown);
      const logoLink = document.querySelector('.ma__header__hamburger__nav-container .ma__header__hamburger__logo--mobile a');
      if (logoLink) {
        logoLink.addEventListener('keydown', onLogoKeyDown);
      }
    }
    return(() => {
      if (menuButton) {
        menuButton.removeEventListener('click', onClick);
        menuButton.removeEventListener('keydown', onButtonKeyDown);
        const logoLink = document.querySelector('.ma__header__hamburger__nav-container .ma__header__hamburger__logo--mobile a');
        if (logoLink) {
          logoLink.removeEventListener('keydown', onLogoKeyDown);
        }
      }
    });
  }, [menuButtonRef, toggleMenu]);
};
const HamburgerNav = ({
  UtilityNav = null,
  UtilityItem,
  MainNav = null,
  NavItem,
  NavSearch = null,
  Logo = null,
  mainItems = [],
  utilityItems = []
}) => {
  const RenderedMainNav = MainNav || HamburgerMainNav;
  const RenderedUtilityNav = UtilityNav || HamburgerUtilityNav;
  // If UtilityItem or NavItem is set to null by default, this will NOT work:
  // If UtilityItem is undefined, UtilityNav will fallback to HamburgerUtilityItem.
  const utilityNav = (utilityItems.length > 0 && <RenderedUtilityNav items={utilityItems} narrow UtilityItem={UtilityItem} />);
  // If NavItem is undefined, HamburgerMainNav falls back to HamburgerNavItem.
  const mainNav = (<RenderedMainNav NavItem={NavItem} items={mainItems} />);
  const logo = (Logo && <Logo />);
  const navSearch = (NavSearch && <NavSearch />);
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
      jumpToSearchButton.setAttribute('aria-expanded', 'true');
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
      if (hamburgerMenuContainer.hasAttribute('style')) {
        hamburgerMenuContainer.removeAttribute('style');
      }
      if (searchInput.hasAttribute('autofocus')) {
        searchInput.removeAttribute('autofocus');
      }
      if (feedbackButton) {
        feedbackButton.classList.remove('hide-button');
      }
      jumpToSearchButton.setAttribute('aria-expanded', 'false');
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
      <nav className="ma__header__hamburger__nav" aria-label="main navigation" id="main-navigation" role="navigation">
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
            <button
              type="button"
              aria-expanded="false"
              className="ma__header__hamburger__search-access-button js-header-search-access-button"
            >
              <span className="ma__visually-hidden">Access to search</span>
              <IconSearch />
            </button>
          </div>
          <RenderedUtilityNav items={utilityItems} UtilityItem={UtilityItem} narrow={false} />
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
    subNav: propTypes.arrayOf(propTypes.shape({
      href: propTypes.string,
      text: propTypes.string
    }))
  })),
  /** An array of uninstantiated components to render within the utility navigation.  */
  utilityItems: propTypes.arrayOf(propTypes.elementType)
};

export const HamburgerMainNav = ({ NavItem = HamburgerNavItem, items = [] }) => (
  <div className="ma__main__hamburger-nav">
    <ul role="menubar" className="ma__main__hamburger-nav__items js-main-nav-hamburger">
      { items.map((item, itemIndex) => (
        <NavItem key={`hamburger-nav-navitem--${itemIndex}`} {...item} index={itemIndex} />
      ))}
    </ul>
  </div>
);
HamburgerMainNav.propTypes = {
  /** An uninstantiated component which handles displaying individual menu items within the menu. */
  NavItem: propTypes.elementType,
  /** An array of items used to create the menu. */
  items: propTypes.arrayOf(propTypes.shape({
    href: propTypes.string,
    text: propTypes.string,
    subNav: propTypes.arrayOf(propTypes.shape({
      href: propTypes.string,
      text: propTypes.string
    }))
  }))
};

export const HamburgerNavItem = ({ text, subNav = [], index }) => {
  const classes = classNames('ma__main__hamburger-nav__item js-main-nav-hamburger-toggle', {
    'has-subnav': subNav.length > 0
  });
  const itemRef = React.useRef();
  const buttonRef = React.useRef();
  const contentRef = React.useRef();
  const ulRef = React.useRef();
  const { closeMenu } = React.useContext(HamburgerContext);
  React.useEffect(() => {
    const item = itemRef.current;
    const itemButton = buttonRef.current;
    const subMenu = contentRef.current;
    const subItems = ulRef.current;
    subItems.style.opacity = '0';
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
          li.style.pointerEvents = 'none';
          /** Slide up. */
          li.querySelector('.js-main-nav-hamburger-content').style.height = '0';
          li.querySelector('.js-main-nav-hamburger__container').style.opacity = '0';
          setTimeout(() => {
            li.removeAttribute('style');
            li.querySelector('.js-main-nav-hamburger-content').classList.add('is-closed');
          }, 500);
        }
      });
    };
    itemButton.addEventListener('click', (e) => {
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
        const height = item.querySelector('.js-main-nav-hamburger-content').clientHeight + 'px';
        /** Set the height of the submenu as 0px, */
        /** so we can trigger the slide down animation. */
        item.querySelector('.js-main-nav-hamburger-content').style.height = '0';

        setTimeout(() => {
          item.querySelector('.js-main-nav-hamburger-content').style.height = height;
          item.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });

          subItems.style.opacity = '1';
        }, 500);

        /** Close Utility menu content when a sub menu is open. */
        const body = document.querySelector('body');

        const width = body.clientWidth;
        if (width < 840) {
          closeNarrowUtilContent();
        }
      } else {
        item.querySelector('.js-main-nav-hamburger-content').style.height = '0';
        subItems.style.opacity = '0';

        // Set a little bit of delay to run
        // The open/close submenu animation is CSS.
        // Unable to confirm the completion of the animation in JS.
        // Unable to use callback in this case.
        setTimeout(() => {
          item.querySelector('.js-main-nav-hamburger-content').classList.add('is-closed');
        }, 500);
      }
    });

    itemButton.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowDown' || e.key === 'ArrowDown') {
        const first = subItems.getElementsByTagName('li')[0];
        first.querySelector('.js-main-nav-hamburger__link').focus();
      }

      // 'e.key === "Esc"' is for IE11.
      if (e.code === 'Escape' || e.key === 'Escape' || e.key === 'Esc') {
        if (item.classList.contains('submenu-open')) {
          closeMenu();
        }
      }
    });
  }, [itemRef, buttonRef, contentRef, ulRef]);
  return(
    <li ref={itemRef} role="none" className={classes} tabIndex="-1">
      <button ref={buttonRef} type="button" role="menuitem" id={`button${index}`} className="ma__main__hamburger-nav__top-link js-main-nav-hamburger__top-link" aria-haspopup="true" tabIndex="0">
        <span className="visually-hidden show-label">Show the sub topics of </span>
        {text}
        <span className="toggle-indicator" aria-hidden="true" />
      </button>
      {subNav && (
        <div ref={contentRef} className="ma__main__hamburger-nav__subitems js-main-nav-hamburger-content is-closed">
          <ul ref={ulRef} id={`menu${index}`} role="menu" aria-labelledby={`button${index}`} className="ma__main__hamburger-nav__container js-main-nav-hamburger__container">
            { subNav.map((item, itemIndex) => (
              <li key={`hamburger-nav-subitem--${index}-${itemIndex}`} role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
                <a role="menuitem" href={item.href} className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">{item.text}</a>
              </li>
            ))}
            <li role="none" className="ma__main__hamburger-nav__subitem js-main-nav-hamburger__subitem">
              <a role="menuitem" href={subNav.[0].href} className="ma__main__hamburger-nav__link js-main-nav-hamburger__link">
                <IconArrowbent />
                <span>
                  <span className="visually-hidden">See all topics under </span>
                  {subNav.[0].text}
                </span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
};
HamburgerNavItem.propTypes = {
  text: propTypes.string,
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
  UtilityItem = HamburgerUtilityItem,
  items = [],
  narrow = true
}) => {
  const wrapperClassName = classNames('ma__header__hamburger__utility-nav', {
    'ma__header__hamburger__utility-nav--narrow js-utility-nav--narrow': narrow,
    'ma__header__hamburger__utility-nav--wide js-utility-nav--wide': !narrow
  });

  return(
    <div className={wrapperClassName}>
      <div className="ma__utility-nav js-util-nav">
        <ul className="ma__utility-nav__items">
          {items.map((ItemComponent, index) => (
            <UtilityItem key={`header-hamburger-utility-item-${index}`}><ItemComponent narrow={narrow} /></UtilityItem>
          ))}
        </ul>
      </div>
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
        <label
          htmlFor="nav-search"
          className="ma__header-search__label"
        >
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

export const HamburgerLogo = ({ mobile = true }) => {
  const classes = classNames('ma__header__hamburger__logo', {
    'ma__header__hamburger__logo--mobile': mobile
  });
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
    <div className={classes}>
      <SiteLogo {...logoProps} />
    </div>
  );
};
HamburgerLogo.propTypes = {
  /** A prop that is true when the logo is displayed on a mobile device. */
  mobile: propTypes.bool
};

export const Container = ({ Logo = HamburgerLogo, NavSearch = HamburgerNavSearch }) => (
  <div className="ma__header__container">
    {Logo && <Logo mobile={false} />}
    {NavSearch && <NavSearch />}
  </div>
);

Container.propTypes = {
  /** An uninstantiated component which handles displaying the site logo. */
  Logo: propTypes.elementType,
  /** An uninstantiated component which handles search functionality. */
  NavSearch: propTypes.elementType
};
export default HamburgerNav;
