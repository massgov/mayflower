import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import NavContainer from 'MayflowerReactMolecules/NavContainer';
import SiteLogo from 'MayflowerReactAtoms/media/SiteLogo';
import IconArrowbent from 'MayflowerReactBase/Icon/IconArrowbent';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';

const HeaderNav = ({
  UtilityNav = HeaderUtilityNav,
  UtilityItem,
  MainNav = null,
  NavItem,
  Logo = null,
  NavSearch = HeaderNavSearch,
  ButtonContainer = HeaderButtonContainer,
  mainItems = [],
  utilityItems = []
}) => {
  const RenderedMainNav = MainNav || HeaderMainNav;
  const RenderedNavSearch = NavSearch || HeaderNavSearch;
  const RenderedUtilityNav = UtilityNav || HeaderUtilityNav;
  const RenderedLogo = Logo || HeaderLogo;
  const utilityNav = (utilityItems.length > 0 && <RenderedUtilityNav UtilityItem={UtilityItem} items={utilityItems} narrow />);
  const mainNav = (mainItems.length > 0 && <RenderedMainNav NavItem={NavItem} items={mainItems} />);
  const logo = (Logo && RenderedLogo && <RenderedLogo />);
  const navSearch = (NavSearch && RenderedNavSearch && <RenderedNavSearch narrow />);
  const buttonContainer = (ButtonContainer && <ButtonContainer />);
  return(
    <nav className="ma__header__nav" aria-label="main navigation" id="main-navigation" role="navigation">
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
    const open = mainNav.querySelector('.' + openClass);
    if (open) {
      open.classList.remove(openClass);
    }

    if (windowWidth.current <= breakpoint) {
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
        const $openContent = mainNav.querySelector('.js-main-nav-content.' + openClass);
        if ($openContent) {
          hide($openContent);
        }

        document.querySelector('.ma__utility-nav__content').classList.add('is-closed');
        if (windowWidth && windowWidth.current < 841 && document.querySelector('.ma__header')) {
          toggleMobileMenu();
        }
      });
    }
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        const $openContent = mainNav.querySelector('.js-main-nav-content.' + openClass);
        if ($openContent) {
          hide($openContent);
        }
      });
    }
  }, [menuButtonRef, closeButtonRef]);
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
    title: 'Mass.gov homepage'
  };
  return(
    <div className="ma__header__logo">
      <div className="ma__site-logo">
        <SiteLogo {...logoProps} />
      </div>
    </div>
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
export const HeaderUtilityItem = ({ children }) => (
  <li className="ma__utility-nav__item">
    {children}
  </li>
);
HeaderUtilityItem.propTypes = {
  children: propTypes.node
};
export const HeaderUtilityNav = ({ UtilityItem = HeaderUtilityItem, items = [], narrow = true }) => {
  const classes = classNames('ma__header__utility-nav', {
    'ma__header__utility-nav--narrow': narrow,
    'ma__header__utility-nav--wide': !narrow
  });
  return(
    <div className={classes}>
      <div className="ma__utility-nav js-util-nav">
        <ul className="ma__utility-nav__items">
          {items.map((ItemComponent, index) => (
            <UtilityItem key={`header-utility-item-${index}`}><ItemComponent narrow={narrow} /></UtilityItem>
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
export const useWindowWidth = () => {
  const windowWidth = React.useRef(window ? window.innerWidth : null);
  const resizeFunction = React.useCallback(() => {
    windowWidth.current = window.innerWidth;
  }, [windowWidth]);
  React.useEffect(() => {
    if (window) {
      window.addEventListener('resize', resizeFunction);
    }
    return(() => {
      if (window) {
        window.removeEventListener('resize', resizeFunction);
      }
    });
  }, [windowWidth]);
  return windowWidth;
};

function mainNavReducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    case 'setButtonExpanded': {
      if (newState.items[action.index]) {
        newState.items[action.index] = {
          ...newState.items[action.index],
          buttonExpanded: action.status
        };
      }
      break;
    }
    case 'setIsOpen': {
      if (action.hasOwnProperty('status')) {
        newState.isOpen = action.status;
      }
      break;
    }
    case 'setIsItemOpen': {
      if (newState.items[action.index]) {
        newState.items[action.index] = {
          ...newState.items[action.index],
          isOpen: action.status
        };
      }
      break;
    }
    case 'hide': {
      newState.items = newState.items.map(() => {
        return{
          buttonExpanded: false,
          isOpen: false
        }
      });
      newState.isOpen = false;
      if (action.hasOwnProperty('index') && newState.items[action.index]) {
        newState.items[action.index] = { buttonExpanded: true, isOpen: true };
      }
      break;
    }
    case 'show': {
      if (action.hasOwnProperty('index') && state.items[action.index]) {
        newState.items[action.index] = {
          buttonExpanded: true,
          isOpen: true
        };
      }
      newState.isOpen = true;
      break;
    }
    default:
  }
  return newState;
}

export const HeaderMainNavContext = React.createContext();

const initMainNav = (items) => {
  const initialList = {
    isOpen: false,
    items: items.map(() => ({
      buttonExpanded: false,
      isOpen: false
    }))
  };
  return initialList;
};
export const useHeaderMainNav = (items) => {
  const windowWidthRef = useWindowWidth();
  const breakpoint = 840;
  const [state, dispatch] = React.useReducer(mainNavReducer, items, initMainNav);
  const { isOpen } = state;
  const setButtonExpanded = React.useCallback(({ index, status }) => {
    dispatch({ type: 'setButtonExpanded', index, status });
  }, []);
  const setIsOpen = React.useCallback(({ index, status}) => {
    dispatch({ type: 'setIsItemOpen', index, status });
  }, []);

  const hide = React.useCallback(() => {
    const windowWidth = windowWidthRef.current;
    if (windowWidth) {
      const body = document.querySelector('body');
      const submenuClass = 'show-submenu';
      body.classList.remove(submenuClass);
      if (isOpen) {
        dispatch({ type: 'hide', status: false });
      }

      if (windowWidth <= breakpoint) {
        //setButtonExpanded(false);
        //setIsOpen(false);
      } else {
        // @todo animate here!
        //setButtonExpanded(false);
        //setIsOpen(false);
      }
    }
  }, [windowWidthRef, isOpen]);

  const show = React.useCallback(({ index }) => {
    const windowWidth = windowWidthRef.current;
    const body = document.querySelector('body');
    const submenuClass = 'show-submenu';
    body.classList.add(submenuClass);
    dispatch({ type: 'show', index });

    if (windowWidthRef.current <= breakpoint) {
      //setButtonExpanded(true);
      //mainContext.dispatch({ type: 'show', index });
    } else {
      // @todo animate here!
      //mainContext.dispatch({ type: 'show', index });
    }
  }, [windowWidthRef]);
  // Restrict the available functionality for NavItem components to the following.
  return React.useMemo(() => ({
    ...state,
    setButtonExpanded,
    setIsOpen,
    hide,
    show
  }), [state, setButtonExpanded, setIsOpen, hide, show]);
};
export const HeaderMainNav = ({ NavItem = HeaderNavItem, items = [] }) => {
  const mainNavRef = React.useRef();
  // All items passed will become part of HeaderMainNav's context.
  const state = useHeaderMainNav(items);
  const headerMainContext = {
    ...state
  };

  return(
    <HeaderMainNavContext.Provider value={headerMainContext}>
      <div className="ma__header__main-nav">
        <div className="ma__main-nav">
          <ul ref={mainNavRef} role="menubar" className="ma__main-nav__items js-main-nav">
            { items.map((item, itemIndex) => (
              <NavItem key={`main-nav-navitem--${itemIndex}`} {...item} index={itemIndex} mainNav={mainNavRef} />
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
  mainNav
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
      if (windowWidth > breakpoint) {
        if (windowWidth <= breakpoint) {
          setButtonExpanded({ index, status: true });
          setIsOpen({ index, status: true });
        } else {
          setButtonExpanded({ index, status: true });
          setIsOpen({ index, status: true });
          // @todo animate insert delay here, then...
        }
      }
    }
  }, [buttonRef, windowWidthRef, contentRef, show, setIsOpen, setButtonExpanded]);

  const onMouseLeave = React.useCallback(() => {
    const button = buttonRef.current;
    const content = contentRef.current;
    const windowWidth = windowWidthRef.current;
    if (button && content && windowWidth) {
      hide();
      if (windowWidth > breakpoint) {
        setButtonExpanded({ index, status: false });
        setIsOpen({ index, status: false });
      } else {
        setButtonExpanded({ index, status: false });
        setIsOpen({ index, status: false });
        // @todo animate here
      }
    }
  }, [buttonRef, windowWidthRef, contentRef, hide, setButtonExpanded, setIsOpen]);

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
        if (isOpen) {
          hide(content);
        }
        setButtonExpanded({ index, status: false });

        if (!isOpen) {
          show({ index });
          setButtonExpanded({ index, status: true });
        }
      }
    }
  }, [windowWidthRef, contentRef, show, hide, isOpen, setIsOpen, setButtonExpanded, index]);

  const onKeyDown = React.useCallback((e) => {
    const item = itemRef.current;
    const windowWidth = windowWidthRef.current;
    const $parent = mainNav.current;
    if (item && windowWidth && $parent) {
      // Grab all the DOM info we need...
      const openClass = 'is-open';
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
        if (isOpen) {
          hide($parent);
        }
        $topLevelLink.setAttribute('aria-expanded', 'false');
        $link.classList.remove(hasFocus);
        return;
      }
      // Navigate into or within a submenu. This is needed on up/down actions
      // (unless the menu is flipped and closed) and when using the right arrow
      // while the menu is flipped and submenu is closed.
      if (((action.up || action.down) && !(menuFlipped && !isOpen))
          || (action.right && menuFlipped && !isOpen)) {
        // Open pull down menu if necessary.
        if (!isOpen && !$link.classList.contains(hasFocus)) {
          show({ index });
          $topLevelLink.setAttribute('aria-expanded', 'true');
          $link.classList.add(openClass);
        }
        // Adjust index of active menu item based on performed action.
        focusIndexInDropdown += (action.up ? -1 : 1);
        // If the menu is flipped, skip the last item in each submenu. Otherwise,
        // skip the first item. This is done by repeating the index adjustment.
        if (menuFlipped) {
          if (focusIndexInDropdown === dropdownLinksLength - 1) {
            focusIndexInDropdown += (action.up ? -1 : 1);
          }
        } else {
          if (focusIndexInDropdown === 0 || focusIndexInDropdown >= dropdownLinksLength) {
            focusIndexInDropdown += (action.up ? -1 : 1);
          }
        }
        // Wrap around if at the end of the submenu.
        focusIndexInDropdown = ((focusIndexInDropdown % dropdownLinksLength) + dropdownLinksLength) % dropdownLinksLength;
        $dropdownLinks[focusIndexInDropdown].focus();
      }
      // Close menu and return focus to menubar
      if (action.close || (menuFlipped && action.left)) {
        if (isOpen) {
          hide($parent);
        }
        $link.classList.remove(openClass);
        $link.classList.remove(hasFocus);
        $topLevelLink.focus();
        $topLevelLink.setAttribute('aria-expanded', 'false');
      }
      // Navigate between submenus. This is needed for left/right actions in
      // normal layout, or up/down actions in flipped layout (when nav is closed).
      if (((action.left || action.right) && !menuFlipped) ||
          ((action.up || action.down) && menuFlipped && !isOpen)) {
        let idx = Array.from($topLevelLinks).findIndex((link) => link === $topLevelLink);
        const prev = action.left || action.up;
        const linkCount = $topLevelLinks.length;
        // hide content
        // If menubar focus
        //  - Change menubar item
        //
        // If dropdown focus
        //  - Open previous pull down menu and select first item
        if (isOpen) {
          hide($parent);
        }
        $topLevelLink.setAttribute('aria-expanded', 'false');
        $link.classList.remove(hasFocus);
        // Get previous item if left arrow, next item if right arrow.
        idx += (prev ? -1 : 1);
        // Wrap around if at the end of the set of menus.
        idx = ((idx % linkCount) + linkCount) % linkCount;
        $topLevelLinks[idx].focus();
      }
    }
  }, [itemRef, windowWidthRef, mainNav, isOpen, hide, show]);
  return(
    <li ref={itemRef} onKeyDown={onKeyDown} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} role="none" className={classes} tabIndex="-1">
      <button ref={buttonRef} onClick={onButtonLinkClick} type="button" role="menuitem" id={`button${index}`} className="ma__main-nav__top-link" aria-haspopup="true" tabIndex="0" aria-expanded={buttonExpanded}>
        <span className="visually-hidden show-label">Show the sub topics of </span>
        {text}
      </button>
      {subNav && (
        <div ref={contentRef} className={contentClasses}>
          <ul id={`menu${index}`} role="menu" aria-labelledby={`button${index}`} className="ma__main-nav__container">
            { subNav.map((item, itemIndex) => (
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
  hide: propTypes.func,
  show: propTypes.func,
  text: propTypes.string,
  mainNav: propTypes.shape({
    current: propTypes.node
  }),
  subNav: propTypes.arrayOf(propTypes.shape({
    href: propTypes.string,
    text: propTypes.string
  })),
  index: propTypes.oneOfType([propTypes.number, propTypes.string])
};

export default HeaderNav;
