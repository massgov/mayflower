import React from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';
import IconArrowbent from 'MayflowerReactBase/Icon/IconArrowbent';
import {
  useWindowWidth,
  useHeaderNavKeydown,
  useHeaderNavMouseEvents,
  useHeaderNavButtonEffects,
  useHeaderMainNav
} from 'MayflowerReactMolecules/HeaderNav/hooks';
import getFallbackComponent from 'MayflowerReactUtilities/getFallbackComponent';

export const HeaderMainNavContext = React.createContext();

export const HeaderMainNav = ({ NavItem, items = [] }) => {
  const RenderedNavItem = getFallbackComponent(NavItem, HeaderNavItem);
  const mainNavRef = React.useRef();
  // All items passed will become part of HeaderMainNav's context.
  const state = useHeaderMainNav(items);
  return(
    <HeaderMainNavContext.Provider value={state}>
      <div className="ma__header__main-nav">
        <div className="ma__main-nav">
          <ul ref={mainNavRef} role="menubar" className="ma__main-nav__items js-main-nav">
            { items.map((item, itemIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <RenderedNavItem key={`main-nav-navitem--${itemIndex}`} {...item} index={itemIndex} mainNav={mainNavRef} />
            ))}
          </ul>
        </div>
      </div>
    </HeaderMainNavContext.Provider>
  );
};
HeaderMainNav.propTypes = {
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

export const HeaderNavItem = React.memo(({
  text,
  subNav = [],
  index,
  mainNav,
  id
}) => {
  const mainContext = React.useContext(HeaderMainNavContext);
  const windowWidthRef = useWindowWidth();
  const itemRef = React.useRef();
  const buttonRef = React.useRef();
  const contentRef = React.useRef();
  const breakpoint = 840;
  const {
    isOpen,
    items,
    hide,
    show,
    setIsOpen,
    setButtonExpanded
  } = mainContext;
  const state = items[index];
  const { buttonExpanded, isOpen: isItemOpen } = state;
  const classes = classNames('ma__main-nav__item js-main-nav-toggle', {
    'has-subnav': subNav.length > 0
  });
  const contentClasses = classNames('ma__main-nav__subitems js-main-nav-content', {
    'is-open': isItemOpen,
    'is-closed': !isItemOpen
  });
  const onMouseEnter = React.useCallback(() => {
    const button = buttonRef.current;
    const content = contentRef.current;
    const windowWidth = windowWidthRef.current;
    if (button && content && windowWidth) {
      show({ index });
    }
  }, [buttonRef, index, windowWidthRef, contentRef]);

  const onMouseLeave = React.useCallback(() => {
    const button = buttonRef.current;
    const content = contentRef.current;
    const windowWidth = windowWidthRef.current;
    if (button && content && windowWidth) {
      hide();
    }
  }, [buttonRef, windowWidthRef, contentRef]);

  const onButtonLinkClick = React.useCallback((e) => {
    const content = contentRef.current;
    const windowWidth = windowWidthRef.current;
    if (content && windowWidth) {
      // mobile
      if (windowWidth <= breakpoint) {
        e.preventDefault();
        // add open class to this item
        setIsOpen({ index, status: true });
        show({ index });
        setButtonExpanded({ index, status: true });
      } else {
        if (isItemOpen) {
          hide({ index });
        }
        setButtonExpanded({ index, status: false });

        if (!isItemOpen) {
          show({ index });
          setButtonExpanded({ index, status: true });
        }
      }
    }
  }, [windowWidthRef, contentRef, isItemOpen, setIsOpen, setButtonExpanded, index]);

  const onKeyDown = React.useCallback((e) => {
    const item = itemRef.current;
    const windowWidth = windowWidthRef.current;
    const $parent = mainNav.current;
    if (item && windowWidth && $parent) {
      // Grab all the DOM info we need...
      const hasFocus = 'has-focus';
      const $link = item;
      const $topLevelLinks = $parent.querySelectorAll('.ma__main-nav__top-link');
      const $focusedElement = document.activeElement;
      const menuFlipped = (windowWidth.current < breakpoint);
      const $otherLinks = Array.from($parent.childNodes).filter((child) => item !== child);
      // relevant if open..
      const $topLevelItem = $focusedElement.closest('.ma__main-nav__item');
      const $topLevelLink = $topLevelItem.querySelector('.ma__main-nav__top-link');
      const $dropdownLinks = $link.querySelectorAll('.ma__main-nav__subitem .ma__main-nav__link');
      const dropdownLinksLength = $dropdownLinks.length;
      let focusIndexInDropdown = Array.from($dropdownLinks).findIndex((link) => link === $focusedElement);
      // Easy access to the key that was pressed.
      const keycode = e.keyCode;
      const action = {
        skip: keycode === 9, // tab
        close: keycode === 27, // esc
        left: keycode === 37, // left arrow
        right: keycode === 39, // right arrow
        up: keycode === 38, // up arrow
        down: keycode === 40, // down arrow
        space: keycode === 32, // space
        enter: keycode === 13 // enter
      };
        // Default behavior is prevented for all actions except 'skip'.
      if (action.close || action.left || action.right || action.up || action.down) {
        e.preventDefault();
      }
      if (action.enter || action.space) {
        $link.classList.add(hasFocus);
        $otherLinks.forEach((link) => link.classList.remove(hasFocus));
      }
      if (action.skip && dropdownLinksLength === (focusIndexInDropdown + 1)) {
        if (isItemOpen) {
          hide();
        }
        $topLevelLink.setAttribute('aria-expanded', 'false');
        $link.classList.remove(hasFocus);
        return;
      }
      // Navigate into or within a submenu. This is needed on up/down actions
      // (unless the menu is flipped and closed) and when using the right arrow
      // while the menu is flipped and submenu is closed.
      if (((action.up || action.down) && !(menuFlipped && !isItemOpen))
          || (action.right && menuFlipped && !isItemOpen)) {
        // Open pull down menu if necessary.
        if (!isItemOpen && !$link.classList.contains(hasFocus)) {
          show({ index });
        }
        // Adjust index of active menu item based on performed action.
        focusIndexInDropdown += (action.up ? -1 : 1);
        // If the menu is flipped, skip the last item in each submenu. Otherwise,
        // skip the first item. This is done by repeating the index adjustment.
        if (menuFlipped) {
          if (focusIndexInDropdown === dropdownLinksLength - 1) {
            focusIndexInDropdown += (action.up ? -1 : 1);
          }
        } else if (focusIndexInDropdown === 0 || focusIndexInDropdown >= dropdownLinksLength) {
          focusIndexInDropdown += (action.up ? -1 : 1);
        }

        // Wrap around if at the end of the submenu.
        focusIndexInDropdown = ((focusIndexInDropdown % dropdownLinksLength) + dropdownLinksLength) % dropdownLinksLength;
        $dropdownLinks[focusIndexInDropdown].focus();
      }
      // Close menu and return focus to menubar
      if (action.close || (menuFlipped && action.left)) {
        if (isOpen) {
          hide();
        }
        $link.classList.remove(hasFocus);
        $topLevelLink.focus();
      }
      // Navigate between submenus. This is needed for left/right actions in
      // normal layout, or up/down actions in flipped layout (when nav is closed).
      if (((action.left || action.right) && !menuFlipped)
      || ((action.up || action.down) && menuFlipped && !isItemOpen)) {
        let idx = Array.from($topLevelLinks).findIndex((link) => link === $topLevelLink);
        const prev = action.left || action.up;
        const linkCount = $topLevelLinks.length;
        // hide content
        // If menubar focus
        //  - Change menubar item
        //
        // If dropdown focus
        //  - Open previous pull down menu and select first item
        if (isItemOpen) {
          hide();
        }
        $link.classList.remove(hasFocus);
        // Get previous item if left arrow, next item if right arrow.
        idx += (prev ? -1 : 1);
        // Wrap around if at the end of the set of menus.
        idx = ((idx % linkCount) + linkCount) % linkCount;
        $topLevelLinks[idx].focus();
      }
    }
  }, [index, itemRef, windowWidthRef, mainNav, isItemOpen]);
  // Adds keyboard support.
  useHeaderNavKeydown(itemRef, onKeyDown);
  // Adds mouse events.
  useHeaderNavMouseEvents(itemRef, onMouseEnter, onMouseLeave);
  // Adds button events.
  useHeaderNavButtonEffects(buttonRef, onButtonLinkClick);

  return(
    <li ref={itemRef} role="none" className={classes} tabIndex="-1">
      <button ref={buttonRef} type="button" role="menuitem" id={`button${index}`} className="ma__main-nav__top-link" aria-haspopup="true" tabIndex="0" aria-expanded={buttonExpanded}>
        <span className="visually-hidden show-label">Show the sub topics of </span>
        {text}
      </button>
      {subNav && (
        <div ref={contentRef} className={contentClasses}>
          <ul id={id || `menu${index}`} role="menu" aria-labelledby={`button${index}`} className="ma__main-nav__container">
            { subNav.map((item, itemIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`main-nav-subitem--${index}-${itemIndex}`} role="none" className="ma__main-nav__subitem">
                <a aria-expanded={buttonExpanded} onClick={onButtonLinkClick} role="menuitem" href={item.href} className="ma__main-nav__link">{item.text}</a>
              </li>
            ))}
            <li role="none" className="ma__main-nav__subitem">
              <a aria-expanded={buttonExpanded} onClick={onButtonLinkClick} role="menuitem" href={subNav.[0].href} className="ma__main-nav__link">
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
});
HeaderNavItem.propTypes = {
  id: propTypes.string,
  hide: propTypes.func,
  show: propTypes.func,
  text: propTypes.string,
  mainNav: propTypes.shape({
    current: Element ? propTypes.instanceOf(Element) : propTypes.object
    // Element doesn't exist for SSR, so we check for it.
  }),
  subNav: propTypes.arrayOf(propTypes.shape({
    href: propTypes.string,
    text: propTypes.string
  })),
  index: propTypes.oneOfType([propTypes.number, propTypes.string])
};
