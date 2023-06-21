import React from 'react';
import focusTrapping from 'MayflowerReactComponents/utilities/focusTrapping';

export const useHamburgerNavKeydown = (closeMenu, topLevelItems) => {
  // Define this using useCallback so this event listener
  // can be deleted when the parent component unmounts.
  const keyDown = React.useCallback((e) => {
    // check if menu open
    const menuOpenClass = 'show-menu';
    const body = document.querySelector('body');
    const menuOpen = body.classList.value.indexOf(menuOpenClass) > 0 || body.classList.value === menuOpenClass;
    const focusedElement = document.activeElement;
    const topLevelItemsArray = topLevelItems && Array.from(topLevelItems);

    const { key } = e;
    const action = {
      left: key === 'Left' || key === 'ArrowLeft', // left arrow
      right: key === 'Right' || key === 'ArrowRight', // right arrow
      esc: key === 'Esc' || key === 'Escape' // esc
    };

    if (menuOpen) {
      // trap focus only when menu is open
      focusTrapping({
        focusableSelectors: '[role="menuitem"], .ma__utility-nav__link > a, .ma__utility-nav__item > button, .ma__utility-panel__item > span > a',
        closeButtonSelector: '.ma__header__hamburger__menu-button',
        modalSelector: '.ma__header__hamburger__nav-container',
        keyEvent: e
      });

      if ((action.left || action.right) && topLevelItems) {
        const topLevelItemsCount = topLevelItems.length;
        let focusIndex = topLevelItemsArray.findIndex((el) => el === focusedElement);
        focusIndex += (action.left ? -1 : 1);
        // Wrap around if at the end of the set of menus.
        focusIndex = (focusIndex + topLevelItemsCount) % topLevelItemsCount;
        topLevelItems[focusIndex].focus();
      }

      if (action.esc) {
        // If no submenu is expanded and if the focus in on the top level items, escape key closes the hamburger menu tray.
        const { target } = e;
        const focusIsOnTopLevel = topLevelItemsArray.includes(target);
        const targetExpandContainer = target.nextElementSibling;
        const targetExpanded = targetExpandContainer && targetExpandContainer.classList.contains('is-closed');
        if ((targetExpanded || targetExpanded === null) && focusIsOnTopLevel) {
          closeMenu();
        }
      }
    }
  }, [closeMenu, topLevelItems]);
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

  React.useEffect(() => {
    const menuButton = menuButtonRef.current;
    if (menuButton) {
      menuButton.addEventListener('click', onClick);
    }
    return(() => {
      if (menuButton) {
        menuButton.removeEventListener('click', onClick);
      }
    });
  }, [menuButtonRef, toggleMenu]);
};
