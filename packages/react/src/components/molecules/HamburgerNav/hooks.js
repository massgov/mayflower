import React from 'react';
import focusTrapping from 'MayflowerReactComponents/utilities/focusTrapping';

export const useHamburgerNavKeydown = (closeMenu) => {
  // Define this using useCallback so this event listener
  // can be deleted when the parent component unmounts.
  const keyDown = React.useCallback((e) => {
    focusTrapping({
      focusableSelectors: '[role="menuitem"],.ma__utility-nav__link > a, .ma__utility-nav__item > button, .ma__utility-panel__item > span > a',
      modalSelector: '.ma__header__hamburger__nav-container',
      keyEvent: e
    });

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
        // Open Log in to... in Hamburger menu: To be consisitent with submenu, keep the content open and set focus on nav button.
        if ((utilNarrowButton !== document.activeElement) && (utilNarrowContainer.style.opacity === '1')) {
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
      if (searchInput) {
        searchInput.focus();
      }
    } else {
      hamburgerMenuContainer.removeAttribute('aria-hidden');
      openMenu();
      setTimeout(() => {
        if (jumpToSearchButton) {
          jumpToSearchButton.setAttribute('aria-pressed', 'true');
        }
        if (searchInput) {
          searchInput.setAttribute('autofocus', '');
          searchInput.focus();
        }
      }, 200);
    }
  }, [openMenu]);
  React.useEffect(() => {
    const jumpToSearchButton = document.querySelector('.js-header-search-access-button');

    if (jumpToSearchButton) {
      jumpToSearchButton.addEventListener('click', jumpToSearch);
    }
    return(() => {
      if (jumpToSearchButton) {
        jumpToSearchButton.removeEventListener('click', jumpToSearch);
      }
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
