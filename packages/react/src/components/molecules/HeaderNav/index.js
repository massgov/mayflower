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

const HeaderNav = ({
  UtilityNav: RenderedUtilityNav = UtilityNav,
  MainNav: RenderedMainNav = MainNav,
  Logo: RenderedLogo = Logo,
  NavSearch: RenderedNavSearch = NavSearch,
  mainItems = [],
  utilityItems = []
}) => {
  const utilityNav = (<RenderedUtilityNav items={utilityItems} />);
  const mainNav = (<RenderedMainNav items={mainItems} />);
  return(
    <nav className="ma__header__nav" aria-label="main navigation" id="main-navigation" role="navigation">
      <NavContainer NavSearch={RenderedNavSearch} Logo={RenderedLogo} mainNav={mainNav} utilityNav={utilityNav} className="ma__header__nav-container" />
    </nav>
  );
};

export const Logo = () => {
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

export const NavSearch = () => (
  <div className="ma__header__search js-header-search-menu">
    <div className="ma__header-search">
      <form action="#" className="ma__form js-header-search-form" role="search">
        <label for="header-search" className="ma__header-search__label">Search terms</label>
        <input id="header-search" className="ma__header-search__input" placeholder="Search Mass.gov" type="search" inputmode="search" />
        <button type="submit" className="ma__button-search--secondary">
          <span className="ma__button-search__label">Search</span>
        </button>
      </form>
    </div>
  </div>
);

export const UtilityNav = () => (
  <div className="ma__header__utility-nav ma__header__utility-nav--narrow">
    <div className="ma__utility-nav js-util-nav">
      <ul className="ma__utility-nav__items">
        <li className="ma__utility-nav__item">
          <div className="ma__utility-nav__translate">
            <GoogleTranslateElement />
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
          <div aria-hidden="true" className="ma__utility-nav__content js-util-nav-content is-closed">
            <div className="ma__utility-nav__container">
              <div className="ma__utility-nav__content-title">
                <button type="button" className="ma__utility-nav__close js-close-util-nav">
                  <span>Close</span>
                  <span className="ma__utility-nav__close-icon" aria-hidden="true">+</span>
                </button>
                <svg aria-hidden="true" focusable="false"><use xlinkHref="#5165fd979757da72f1a1a3a1b4595e1e.9" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" version="1.1" viewBox="0 0 20 16" id="5165fd979757da72f1a1a3a1b4595e1e.9"><path d="M1338.67 19.6L1338.67 16.400000000000002L1345.3300000000002 22L1338.67 27.6L1338.67 24.400000000000002L1332 24.400000000000002L1332 19.6ZM1340.33 14L1340.33 15.6L1350.33 15.6L1350.33 28.4L1340.33 28.4L1340.33 30L1352 30L1352 14Z " transform="matrix(1,0,0,1,-1332,-14)" /></symbol></svg>
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
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.432" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.432"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
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
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.433" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.433"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
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
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.434" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.434"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
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
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.435" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.435"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
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
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.436" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.436"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
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
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.437" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.437"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
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
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.438" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.438"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
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
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.439" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.439"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
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
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.440" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.440"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
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
                          <svg aria-hidden="true" focusable="false"><use xlinkHref="#7d83e994275beeb5601876202075c2b3.441" /></svg>
                          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}><symbol xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" version="1.1" viewBox="0 0 16 18" id="7d83e994275beeb5601876202075c2b3.441"><path d="M983.721 1887.28L983.721 1887.28L986.423 1890L986.423 1890L986.423 1890L983.721 1892.72L983.721 1892.72L978.318 1898.17L975.617 1895.45L979.115 1891.92L971.443 1891.92L971.443 1888.0700000000002L979.103 1888.0700000000002L975.617 1884.5500000000002L978.318 1881.8300000000002Z " transform="matrix(1,0,0,1,-971,-1881)" /></symbol></svg>
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
export const MainNav = ({ NavItem: RenderedNavItem = NavItem, items = [] }) => {
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
    <div className="ma__main-nav">
      <ul ref={mainNavRef} role="menubar" className="ma__main-nav__items js-main-nav">
        { items.map((item, itemIndex) => (
          <RenderedNavItem key={`main-nav-navitem--${itemIndex}`} {...item} hide={hide} show={show} index={itemIndex} mainNav={mainNavRef} />
        ))}
      </ul>
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
