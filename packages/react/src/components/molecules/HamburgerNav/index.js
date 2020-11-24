import React from 'react';
import classNames from 'classnames';
import NavContainer from 'MayflowerReactMolecules/NavContainer';
import IconArrowbent from 'MayflowerReactBase/Icon/IconArrowbent';
// eslint-disable-next-line import/no-unresolved
import GoogleTranslateElement from 'MayflowerReactButtons/GoogleTranslateElement';
// eslint-disable-next-line import/no-unresolved
import IconBuilding from 'MayflowerReactBase/Icon/IconBuilding';
// eslint-disable-next-line import/no-unresolved
import IconLogin from 'MayflowerReactBase/Icon/IconLogin';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';
import SiteLogo from 'MayflowerReactAtoms/media/SiteLogo';

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
        utilWideButton.closest('.ma__header__hamburger__nav').classList.toggle('util-nav-content-open');
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
      // Log in to... in Utility nav bar
      if (utilNavWide.querySelector('.js-util-nav-content').style.opacity === '1') {
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
  UtilityNav: RenderedUtilityNav = UtilityNav,
  MainNav: RenderedMainNav = MainNav,
  NavSearch: RenderedNavSearch = NavSearch,
  Logo: RenderedLogo = Logo,
  mainItems = [],
  utilityItems = []
}) => {
  const utilityNav = (<RenderedUtilityNav items={utilityItems} narrow />);
  const mainNav = (<RenderedMainNav items={mainItems} />);
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

      if ((width > 840) && document.querySelector('.js-utility-nav--wide .ma__utility-nav__item .direct-link').hasAttribute('tabindex')) {
        document.querySelector('.js-utility-nav--wide .ma__utility-nav__item .goog-te-menu-value').removeAttribute('tabindex');
        document.querySelector('.js-utility-nav--wide .ma__utility-nav__item .direct-link').removeAttribute('tabindex');
        document.querySelector('.js-utility-nav--wide .ma__utility-nav__item .js-util-nav-toggle').removeAttribute('tabindex');
        document.querySelector('.js-header-search-access-button').removeAttribute('tabindex');
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
        document.querySelector('.js-utility-nav--wide .ma__utility-nav__item  .goog-te-menu-value').setAttribute('tabindex', '-1');
        document.querySelector('.js-utility-nav--wide .ma__utility-nav__item  .direct-link').setAttribute('tabindex', '-1');
        document.querySelector('.js-utility-nav--wide .ma__utility-nav__item  .js-util-nav-toggle').setAttribute('tabindex', '-1');
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
          <RenderedUtilityNav items={utilityItems} translateId="google_translate_element_hamburger_2" narrow={false} />
          <NavContainer Logo={RenderedLogo} mainNav={mainNav} utilityNav={utilityNav} NavSearch={RenderedNavSearch} className="ma__header__hamburger__nav-container" aria-hidden="true" />
        </div>
      </nav>
    </HamburgerContext.Provider>
  );
};

export const MainNav = ({ NavItem: RenderedNavItem = NavItem, items = [] }) => (
  <div className="ma__main__hamburger-nav">
    <ul role="menubar" className="ma__main__hamburger-nav__items js-main-nav-hamburger">
      { items.map((item, itemIndex) => (
          <RenderedNavItem key={`hamburger-nav-navitem--${itemIndex}`} {...item} index={itemIndex} />
        ))}
    </ul>
  </div>
);

export const NavItem = ({ text, subNav = [], index }) => {
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

export const UtilityNav = ({ translateId = '', narrow = true }) => {
  const wrapperClassName = classNames('ma__header__hamburger__utility-nav', {
    'ma__header__hamburger__utility-nav--narrow js-utility-nav--narrow': narrow,
    'ma__header__hamburger__utility-nav--wide js-utility-nav--wide': !narrow
  });
  const loginToggleRef = React.useRef();
  const loginContentRef = React.useRef();
  const loginCloseRef = React.useRef();
  React.useEffect(() => {
    const utilButton = loginToggleRef.current;
    const utilCloseButton = loginCloseRef.current;
    const utilContent = loginContentRef.current;
    const utilContainer = utilContent ? utilContent.querySelector('.ma__utility-nav__container') : null;
    if (utilButton && utilCloseButton && utilContent) {
      // Open
      if (!narrow) {
        const closeUtilWideContent = () => {
          // Content state
          utilContent.style.height = '0';
          utilContent.style.opacity = '0';
          utilContent.classList.add('is-closed');
          utilContent.setAttribute('aria-hidden', 'true');
          // Close button state
          utilCloseButton.setAttribute('aria-expanded', 'false');
          // Utility button state
          utilButton.setAttribute('aria-expanded', 'false');
          utilButton.setAttribute('aria-pressed', 'false');
          utilButton.closest('.ma__header__hamburger__nav').classList.toggle('util-nav-content-open');
        };
        utilButton.addEventListener('click', (e) => {
          const thisWideButton = e.target.closest('.js-util-nav-toggle');
          const thisWideContent = thisWideButton.nextElementSibling;

          if (thisWideContent.classList.contains('is-closed')) {//  To open
            thisWideButton.closest('.ma__header__hamburger__nav').classList.add('util-nav-content-open');

            thisWideContent.classList.remove('is-closed');
            thisWideContent.removeAttribute('aria-hidden');
            thisWideContent.removeAttribute('style');
            thisWideContent.style.height = 'auto';
            thisWideContent.style.opacity = '1';

            // Button State
            thisWideButton.setAttribute('aria-expanded', 'true');
            thisWideButton.setAttribute('aria-pressed', 'true');
          }

          thisWideButton.setAttribute('aria-expanded', 'true');
          thisWideButton.setAttribute('aria-pressed', 'true');
        });
        utilCloseButton.addEventListener('click', (e) => {
          closeUtilWideContent();
        });
      } else {
        const closeNarrowUtilContent = () => {
          const thisNavContainer = utilButton.closest('.ma__utility-nav__item');
          utilButton.setAttribute('aria-expanded', 'false');
          utilContent.setAttribute('aria-hidden', 'true');
          thisNavContainer.style.pointerEvents = 'none';
          setTimeout(() => {
            thisNavContainer.removeAttribute('style');
          }, 700);
          utilContent.style.maxHeight = '0';
          utilContainer.style.opacity = '0';
          setTimeout(() => {
            utilContent.classList.add('is-closed');
          }, 500);
        };
        utilContent.style.maxHeight = '0';
        utilContainer.style.opacity = '0';

        utilButton.addEventListener('click', (e) => {
          const thisButton = e.target.closest('.js-util-nav-toggle');
          const thisNavContainer = e.target.closest('.ma__utility-nav__item');
          const utilNarrowContent = thisButton.nextElementSibling;

          if (utilNarrowContent.classList.contains('is-closed')) {
            // TO OPEN

            closeSubMenu();

            thisButton.setAttribute('aria-expanded', 'true');
            utilNarrowContent.removeAttribute('aria-hidden');
            thisNavContainer.style.pointerEvents = 'none';
            /** Slide down. */
            thisNavContainer.removeAttribute('style');

            /** Show the content. */
            utilNarrowContent.classList.remove('is-closed');
            utilNarrowContent.style.maxHeight = 'auto';

            /** Get the computed height of the content. */
            const contentHeight = utilContent.querySelector('.ma__utility-nav__content-body').clientHeight + 'px';

            /** Set the height of the submenu as 0px, */
            /** so we can trigger the slide down animation. */
            utilContent.style.maxHeight = '0';
            utilContent.style.Height = '0';

            // These height settings display the bottom border of the parent li at the correct spot.
            utilContent.style.height = contentHeight;
            utilContainer.style.height = contentHeight;

            utilContent.style.maxHeight = contentHeight;
            utilContainer.style.opacity = '1';
          } else {
            closeNarrowUtilContent();
          }
        });
      }
    }
    
    function closeSubMenu() {
      const openSubMenu = document.querySelector('.submenu-open');

      if (openSubMenu) {
        const openSubMenuButton = openSubMenu.querySelector('.js-main-nav-hamburger__top-link');
        const openSubMenuContent = openSubMenu.querySelector('.js-main-nav-hamburger-content');
        const openSubMenuContainer = openSubMenu.querySelector('.js-main-nav-hamburger__container');

        openSubMenuButton.setAttribute('aria-expanded', 'false');
        openSubMenuContent.style.height = '0';
        openSubMenuContainer.style.opacity = '0';

        openSubMenuContent.classList.add('is-closed');

        openSubMenu.removeAttribute('style');
        openSubMenu.classList.remove('submenu-open');
      }
    }
  }, [loginToggleRef, loginCloseRef, loginContentRef]);
  return(
    <div className={wrapperClassName}>
      <div className="ma__utility-nav js-util-nav">
        <ul className="ma__utility-nav__items">
          <li className="ma__utility-nav__item">
            <div className="ma__utility-nav__translate">
              {translateId && <GoogleTranslateElement id={translateId} />}
            </div>
          </li>
          <li className="ma__utility-nav__item">
            <a className="ma__utility-nav__link direct-link" href="#">
              <IconBuilding />
              <span>State Organizations</span>
            </a>
          </li>
          <li className="ma__utility-nav__item">
            <button
              ref={loginToggleRef}
              type="button"
              className="ma__utility-nav__link js-util-nav-toggle"
              aria-haspopup="true"
              aria-label="Log in links for this page"
              aria-expanded="false"
            >
              <IconLogin />
              <span>
                Log in to...
              </span>
              <span className="toggle-indicator" aria-hidden="true" />
            </button>
            <div ref={loginContentRef} aria-hidden="true" className="ma__utility-nav__content js-util-nav-content is-closed">
              <div className="ma__utility-nav__container">
                <div className="ma__utility-nav__content-title">
                  <button ref={loginCloseRef} type="button" className="ma__utility-nav__close js-close-util-nav">
                    <span>Close</span>
                    <span className="ma__utility-nav__close-icon" aria-hidden="true">+</span>
                  </button>
                  <svg aria-hidden="true" focusable="false"><use xlinkHref="#5165fd979757da72f1a1a3a1b4595e1e.7" /></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 16" id="5165fd979757da72f1a1a3a1b4595e1e.7"><path d="M1338.67 19.6L1338.67 16.400000000000002L1345.3300000000002 22L1338.67 27.6L1338.67 24.400000000000002L1332 24.400000000000002L1332 19.6ZM1340.33 14L1340.33 15.6L1350.33 15.6L1350.33 28.4L1340.33 28.4L1340.33 30L1352 30L1352 14Z " transform="matrix(1,0,0,1,-1332,-14)" /></symbol></svg>
                  <h2>Log in to...</h2>
                </div>
                <div className="ma__utility-nav__content-body">

                  <div className="ma__utility-panel">
                    <div className="ma__utility-panel__description ma__utility-panel__description--full">

                      <div className="ma__rich-text ">
                        <p>Login links for this page</p>
                      </div>
                    </div>

                    <ul className="ma__utility-panel__items">
                      <li className="ma__utility-panel__item js-clickable">
                        <span className="ma__decorative-link">
                          <a
                            href="#"
                            className="js-clickable-link"
                          >
                            Contextual Login 1&nbsp;
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.422" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.422"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                          </a>
                        </span>
                      </li>
                      <li className="ma__utility-panel__item js-clickable">
                        <span className="ma__decorative-link">
                          <a
                            href=""
                            className="js-clickable-link"
                          >
                            Contextual Login 2&nbsp;
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.423" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.423"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                          </a>
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="ma__utility-panel">
                    <div className="ma__utility-panel__description ma__utility-panel__description--full">

                      <div className="ma__rich-text ">
                        <p>These are the top requested sites you can log in to access state provided services</p>
                      </div>
                    </div>

                    <ul className="ma__utility-panel__items">
                      <li className="ma__utility-panel__item js-clickable">
                        <span className="ma__decorative-link">
                          <a
                            href="https://uionline.detma.org/Claimant/Core/Login.ASPX"
                            className="js-clickable-link"
                          >
                            Unemployment Online&nbsp;
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.424" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.424"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                          </a>
                        </span>
                      </li>
                      <li className="ma__utility-panel__item js-clickable">
                        <span className="ma__decorative-link">
                          <a
                            href="https://sso.hhs.state.ma.us/oam/server/obrareq.cgi?encquery%3DA2%2Fmo5AkZreDycpyP0JZAEOYGvW2hviyNhH9Sht2xPp0V1%2BBtWfHnmRGr6zNHOqOlcjphPk7p6bpHHRyNzzk9IYQ%2FcN%2B%2FIcqL2ThnI217OsIKZepptTpGBx83SI0NWjsE7vDi72caItXWlelbGQT7ePanlrVUUy2%2Fj1UEUaXi5G7m47KO9djBnoetZRCtp9G2ZTNFf6zvCGU7Cs02AXYUj2JMH4aqol%2Bh3OK6uhJNNkFvwQ1MFRUa4gR1az4iaW9u83ExKb2a9eDv8ZIUqhlq3%2BNVGTqZHAsHX4KOONSGQRBwCtLNPWwruacjdd9CaEqeIJ2tnP45KrM93edZ6zU1yoWGbAp%2BUWWMqk4HyrtuA8%3D%20agentid%3Dwebgate1%20ver%3D1%20crmethod%3D2"
                            className="js-clickable-link"
                          >
                            Virtual Gateway (SNAP)&nbsp;
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.425" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.425"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                          </a>
                        </span>
                      </li>
                      <li className="ma__utility-panel__item js-clickable">
                        <span className="ma__decorative-link">
                          <a
                            href="https://ecse.cse.state.ma.us/ECSE/Login/login.asp"
                            className="js-clickable-link"
                          >
                            Child Support Enforcement&nbsp;
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.426" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.426"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                          </a>
                        </span>
                      </li>
                      <li className="ma__utility-panel__item js-clickable">
                        <span className="ma__decorative-link">
                          <a
                            href="https://mtc.dor.state.ma.us/mtc/_/"
                            className="js-clickable-link"
                          >
                            MassTaxConnect&nbsp;
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.427" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.427"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                          </a>
                        </span>
                      </li>
                      <li className="ma__utility-panel__item js-clickable">
                        <span className="ma__decorative-link">
                          <a
                            href="https://atlas-myrmv.massdot.state.ma.us/myrmv/"
                            className="js-clickable-link"
                          >
                            myRmv&nbsp;
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.428" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.428"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                          </a>
                        </span>
                      </li>
                      <li className="ma__utility-panel__item js-clickable">
                        <span className="ma__decorative-link">
                          <a
                            href="https://www.mahealthconnector.org/"
                            className="js-clickable-link"
                          >
                            Massachusetts Health Connector&nbsp;
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.429" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.429"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                          </a>
                        </span>
                      </li>
                      <li className="ma__utility-panel__item js-clickable">
                        <span className="ma__decorative-link">
                          <a
                            href="https://juryduty.majury.gov/ojcweb/public/start.aspx"
                            className="js-clickable-link"
                          >
                            Massachusetts Juror Service Website&nbsp;
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.430" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.430"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                          </a>
                        </span>
                      </li>
                      <li className="ma__utility-panel__item js-clickable">
                        <span className="ma__decorative-link">
                          <a
                            href="https://massanf.taleo.net/careersection/ex/jobsearch.ftl"
                            className="js-clickable-link"
                          >
                            Find a Commonwealth Job&nbsp;
                            <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.431" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.431"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
                          </a>
                        </span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export const NavSearch = () => (
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
        <button type="submit" className="ma__button-search--secondary">
          <span className="ma__button-search__label">Search</span>
          <svg aria-hidden="true" focusable="false"><use xlinkHref="#ca4a8fa24c4f86ebb9d78a0f427445d0.12" /></svg>
          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 20" id="ca4a8fa24c4f86ebb9d78a0f427445d0.12"><path d="M1424.99 107.4L1419.66 102.105C1420.44 100.884 1420.89 99.4383 1420.89 97.8892C1420.89 93.54 1417.3300000000002 90 1412.95 90C1408.57 90 1405.01 93.54 1405.01 97.89C1405.01 102.241 1408.57 105.781 1412.95 105.781C1414.43 105.781 1415.82 105.375 1417.01 104.67L1422.3799999999999 110ZM1407.97 97.89C1407.97 95.1625 1410.2 92.9416 1412.95 92.9416C1415.7 92.9416 1417.93 95.1617 1417.93 97.89C1417.93 100.619 1415.7 102.839 1412.95 102.839C1410.2 102.839 1407.97 100.619 1407.97 97.89Z " transform="matrix(1,0,0,1,-1405,-90)" /></symbol></svg>
        </button>
      </form>
    </div>
  </div>
);

export const Logo = ({ mobile = true }) => {
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

export const Container = ({ Logo: RenderedLogo = Logo, NavSearch: RenderedNavSearch = NavSearch }) => (
  <div className="ma__header__container">
    <RenderedLogo mobile={false} />
    <RenderedNavSearch />
  </div>
);

export default HamburgerNav;
