import React from 'react';
import propTypes from 'prop-types';
import GoogleTranslateElement from 'MayflowerReactButtons/GoogleTranslateElement';
import IconBuilding from 'MayflowerReactBase/Icon/IconBuilding';
import IconLogin from 'MayflowerReactBase/Icon/IconLogin';
import useWindowWidth from 'MayflowerReactComponents/hooks/use-window-width';

export const LoginItem = ({ narrow }) => {
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

          if (thisWideContent.classList.contains('is-closed')) {
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
        utilCloseButton.addEventListener('click', () => {
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
            const contentHeight = `${utilContent.querySelector('.ma__utility-nav__content-body').clientHeight}px`;

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
  }, [narrow, loginToggleRef, loginCloseRef, loginContentRef]);
  return(
    <React.Fragment>
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
    </React.Fragment>
  );
};
LoginItem.propTypes = {
  /** Represents when the component is being displayed on a narrow viewport. */
  narrow: propTypes.bool
};

export const TranslateItem = ({ narrow }) => {
  const windowWidth = useWindowWidth();
  return(
    <React.Fragment>
      { windowWidth && windowWidth > 840 && (
        <div className="ma__utility-nav__translate">
          <GoogleTranslateElement id="google-translate-id" />
        </div>
      )}
    </React.Fragment>
  );
};
TranslateItem.propTypes = {
  /** Represents when the component is being displayed on a narrow viewport. */
  narrow: propTypes.bool
};

export const StateItem = () => (
  <a className="ma__utility-nav__link direct-link" href="#">
    <IconBuilding />
    <span>State Organizations</span>
  </a>
);
