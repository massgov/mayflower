import React from 'react';
import classNames from 'classnames';
import NavContainer from 'MayflowerReactMolecules/NavContainer';
import SiteLogo from 'MayflowerReactAtoms/media/SiteLogo';
import IconArrowbent from 'MayflowerReactBase/Icon/IconArrowbent';
// eslint-disable-next-line import/no-unresolved
import GoogleTranslateElement from 'MayflowerReactButtons/GoogleTranslateElement';
// eslint-disable-next-line import/no-unresolved
import IconBuilding from 'MayflowerReactBase/Icon/IconBuilding';
// eslint-disable-next-line import/no-unresolved
import IconLogin from 'MayflowerReactBase/Icon/IconLogin';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';


const HeaderNav = ({
  UtilityNav = HeaderUtilityNav,
  UtilityItem,
  MainNav = null,
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
  const mainNav = (mainItems.length > 0 && <RenderedMainNav items={mainItems} />);
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
      <button ref={closeButtonRef} className="ma__header__back-button js-close-sub-nav"><span>Back</span></button>
      <button ref={menuButtonRef} className="ma__header__menu-button js-header-menu-button">
        <span>Menu</span><span className="ma__header__menu-icon"></span>
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
          <label htmlFor="header-search" className="ma__header-search__label">Search terms</label>
          <input id="header-search" className="ma__header-search__input" placeholder="Search Mass.gov" type="search" inputmode="search" />
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
export const HeaderMainNav = ({ NavItem: RenderedNavItem = NavItem, items = [] }) => {
  const mainNavRef = React.useRef();
  const windowWidth = useWindowWidth();
  const hide = React.useCallback(($content) => {
    if (mainNavRef) {
      const body = document.querySelector('body');
      const submenuClass = 'show-submenu';
      const openClass = 'is-open';
      const closeClass = 'is-closed';
      const breakpoint = 840;
      body.classList.remove(submenuClass);
      const open = mainNavRef.current.querySelector('.' + openClass);
      if (open) {
        open.classList.remove(openClass);
      }

      if (windowWidth.current <= breakpoint) {
        $content.classList.add(closeClass);
      } else {
        // @todo animate here!
        $content.classList.add(closeClass);
      }
    }
  }, [windowWidth, mainNavRef]);
  const show = React.useCallback(($content) => {
    const body = document.querySelector('body');
    const submenuClass = 'show-submenu';
    const openClass = 'is-open';
    const closeClass = 'is-closed';
    body.classList.add(submenuClass);
    const breakpoint = 840;
    if (windowWidth.current <= breakpoint) {
      $content.classList.add(openClass);
      $content.classList.remove(closeClass);
    } else {
      // @todo animate here!!
      $content.classList.add(openClass);
      $content.classList.remove(closeClass);
    }
  }, [windowWidth, mainNavRef]);
  return(
    <div className="ma__header__main-nav">
      <div className="ma__main-nav">
        <ul ref={mainNavRef} role="menubar" className="ma__main-nav__items js-main-nav">
          { items.map((item, itemIndex) => (
            <RenderedNavItem key={`main-nav-navitem--${itemIndex}`} {...item} hide={hide} show={show} index={itemIndex} mainNav={mainNavRef} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export const NavItem = ({ hide, show, text, subNav = [], index, mainNav }) => {
  const classes = classNames('ma__main-nav__item js-main-nav-toggle', {
    'has-subnav': subNav.length > 0
  });
  const itemRef = React.useRef();
  const buttonRef = React.useRef();
  const contentRef = React.useRef();

  const windowWidth = useWindowWidth();

  React.useEffect(() => {
    const item = itemRef.current;
    const button = buttonRef.current;
    const breakpoint = 840;
    const openClass = 'is-open';
    if (item && button && mainNav && contentRef.current) {
      button.setAttribute('aria-expanded', 'false');
      item.addEventListener('mouseenter', () => {
        button.setAttribute('aria-expanded', 'true');

        if (windowWidth.current > breakpoint) {
          if (windowWidth <= breakpoint) {
            contentRef.current.classList.add('is-open');
            contentRef.current.classList.remove('is-closed');
          } else {
            contentRef.current.classList.add('is-open');
            // @todo animate insert delay here, then...
            contentRef.current.classList.remove('is-closed');
          }
        }
      });
      item.addEventListener('mouseleave', () => {
        button.setAttribute('aria-expanded', 'false');
        if (windowWidth > breakpoint) {
          contentRef.current.classList.remove('is-open');
          contentRef.current.classList.add('is-closed');
        } else {
          // @todo animate here
          contentRef.current.classList.remove('is-open');
          contentRef.current.classList.add('is-closed');
        }
      });
      item.querySelectorAll('button, a').forEach((element) => element.addEventListener('click', (e) => {
        const $el = element;
        const $elParent = element.parentNode;
        const $content = $elParent.querySelector('.js-main-nav-content');
        const $openContent = mainNav.current.querySelector('.js-main-nav-content.' + openClass);
        const isOpen = $content.classList.contains(openClass);
        // mobile
        if (windowWidth <= breakpoint) {
          e.preventDefault();
          // add open class to this item
          $elParent.classList.add(openClass);
          show($content);
          $el.setAttribute('aria-expanded', 'true');
        } else {
          if ($openContent) {
            hide($openContent);
          }
          $el.setAttribute('aria-expanded', 'false');
          if (!isOpen) {
            show($content);
            $el.setAttribute('aria-expanded', 'true');
          }
        }
      }));
    }
  }, [itemRef, buttonRef, contentRef, mainNav, windowWidth]);
  React.useEffect(() => {
    const item = itemRef.current;

    if (item) {
      item.addEventListener('keydown', (e) => {
        // Grab all the DOM info we need...
        const $parent = mainNav.current;
        const openClass = 'is-open';
        const hasFocus = 'has-focus';
        const closeClass = 'is-closed';
        const submenuClass = 'show-submenu';
        const breakpoint = 840; 
        const $mainNavItem = item;
        const $link = item;
        const $topLevelLinks = $parent.querySelectorAll('.ma__main-nav__top-link');
        const open = $link.classList.contains(openClass);
        const $openContent = $parent.querySelector('.js-main-nav-content.' + openClass);
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
          'skip': keycode === 9, // tab
          'close': keycode === 27, // esc
          'left': keycode === 37, // left arrow
          'right': keycode === 39, // right arrow
          'up': keycode === 38, // up arrow
          'down': keycode === 40, // down arrow
          'space': keycode === 32, //space
          'enter': keycode === 13 // enter
        };
        // Default behavior is prevented for all actions except 'skip'.
        if (action.close || action.left || action.right || action.up || action.down) {
          e.preventDefault();
        }
  
        if (action.enter || action.space) {
          $link.classList.add(hasFocus);
          $otherLinks.forEach(link => link.classList.remove(hasFocus));
        }
  
        if (action.skip && dropdownLinksLength === (focusIndexInDropdown + 1)) {
          if ($openContent) {
            hide($openContent);
          }
          $topLevelLink.setAttribute('aria-expanded', 'false');
          $link.classList.remove(hasFocus);
          return;
        }
  
        // if (action.skip && focusIndexInDropdown === -1) {
        //   console.log('back');
        // }
  
        // Navigate into or within a submenu. This is needed on up/down actions
        // (unless the menu is flipped and closed) and when using the right arrow
        // while the menu is flipped and submenu is closed.
        if (((action.up || action.down) && !(menuFlipped && !open))
          || (action.right && menuFlipped && !open)) {
          // Open pull down menu if necessary.
          if (!open && !$link.classList.contains(hasFocus)) {
            show($topLevelItem.querySelector('.js-main-nav-content'));
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
          if ($openContent) {
            hide($openContent);
          }
          $link.classList.remove(openClass);
          $link.classList.remove(hasFocus);
          $topLevelLink.focus();
          $topLevelLink.setAttribute('aria-expanded', 'false');
        }
  
        // Navigate between submenus. This is needed for left/right actions in
        // normal layout, or up/down actions in flipped layout (when nav is closed).
        if (((action.left || action.right) && !menuFlipped) ||
          ((action.up || action.down) && menuFlipped && !open)) {
          let idx = Array.from($topLevelLinks).findIndex((link) => link === $topLevelLink);
          const prev = action.left || action.up;
          const linkCount = $topLevelLinks.length;
  
          // hide content
          // If menubar focus
          //  - Change menubar item
          //
          // If dropdown focus
          //  - Open previous pull down menu and select first item
          if ($openContent) {
            hide($openContent);
          }
          $topLevelLink.setAttribute('aria-expanded', 'false');
          $link.classList.remove(hasFocus);
          // Get previous item if left arrow, next item if right arrow.
          idx += (prev ? -1 : 1);
          // Wrap around if at the end of the set of menus.
          idx = ((idx % linkCount) + linkCount) % linkCount;
          $topLevelLinks[idx].focus();
        }
      });
    }
  }, [itemRef, windowWidth, mainNav]);
  return(
    <li ref={itemRef} role="none" className={classes} tabIndex="-1">
      <button ref={buttonRef} type="button" role="menuitem" id={`button${index}`} className="ma__main-nav__top-link" aria-haspopup="true" tabIndex="0">
        <span className="visually-hidden show-label">Show the sub topics of </span>
        {text}
      </button>
      {subNav && (
        <div ref={contentRef} className="ma__main-nav__subitems js-main-nav-content is-closed">
          <ul id={`menu${index}`} role="menu" aria-labelledby={`button${index}`} className="ma__main-nav__container">
            { subNav.map((item, itemIndex) => (
              <li key={`main-nav-subitem--${index}-${itemIndex}`} role="none" className="ma__main-nav__subitem">
                <a role="menuitem" href={item.href} className="ma__main-nav__link">{item.text}</a>
              </li>
            ))}
            <li role="none" className="ma__main-nav__subitem">
              <a role="menuitem" href={subNav.[0].href} className="ma__main-nav__link">
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

export default HeaderNav;
