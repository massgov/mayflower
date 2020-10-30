import React from 'react';
import HeaderSearch from 'MayflowerReactMolecules/HeaderSearch';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';
import UtilityNav from 'MayflowerReactOrganisms/UtilityNav';
import MainNav from 'MayflowerReactMolecules/MainNavHamburger';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import classNames from 'classnames';

const HeaderHamburger = ({
  hideBackTo = true,
  hideHeaderSearch = false,
  backTo = null,
  utilityNav = null,
  siteLogo = null,
  headerSearch = null,
  mainNav = null,
}) => {
  const [open, setOpen] = React.useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const openMenuAndFocusSearch = () => {
    setOpen(true);
    setTimeout(() => {
      document.getElementById('nav-search').focus();
    }, 200);
  };
  React.useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    const alertsHeader = document.querySelector('.ma__emergency-alerts__header');
    const hamburgerMenuContainer = document.querySelector('.ma__header__hamburger__nav-container');

    if (open) {
      body.classList.add('show-menu');
      body.style.position = 'fixed';
      if (alertsHeader !== null) {
        const emergencyAlerts = document.querySelector('.ma__emergency-alerts');
        const emergencyAlertsHeight = emergencyAlerts.offsetHeight;
        const alertOffsetAdjusted = alertsHeader.offsetHeight/2;
        const hamburgerNavOffset = document.querySelector('.ma__header__hamburger__nav').offsetHeight;
        const heightAboveMenuContainer = alertOffsetAdjusted + hamburgerNavOffset;
        hamburgerMenuContainer.style.height = `calc(100vh - ${heightAboveMenuContainer}px)`;
      }
    } else {
      body.classList.remove('show-menu');
      body.style.position = 'relative';
    }
  }, [open]);
  return(
    <header className="ma__header__hamburger" id="header">
      {!hideBackTo && (
        <div className="ma__header__hamburger__backto">
          <a href={backTo?.url ? backTo.url : 'https://www.mass.gov'}>
            {backTo?.text ? backTo.text : 'Go to classic Mass.gov'}
          </a>
        </div>
      )}
      <a className="ma__header__hamburger__skip-nav" href="#main-content">
        skip to main content
      </a>
      <nav className="ma__header__hamburger__nav" aria-label="main navigation" id="main-navigation" role="navigation">
        <div className="ma__header__hamburger-wrapper">
          <div className="ma__header__hamburger__button-container js-sticky-header">
            <button
              type="button"
              aria-expanded="false"
              aria-label="Open the main menu for mass.gov"
              className="ma__header__hamburger__menu-button js-header-menu-button"
              onClick={toggleMenu}
            >
              <span className="ma__header__hamburger__menu-icon"></span>
              {/*# Visible menu label is managed with CSS.  The button has aria-label and the button label via aria-label is visible to screen reader users. #*/}
              <span className="ma__header__hamburger__menu-text js-header__menu-text"></span>
            </button>
            {/*# Skip button to search. #*/}
            <button
              type="button"
              aria-expanded="false"
              className="ma__header__hamburger__search-access-button js-header-search-access-button"
              onClick={openMenuAndFocusSearch}
            >
              <span className="ma__visually-hidden">Access to search</span>
              <IconSearch />
            </button>
          </div>{/*# .ma__header__hamburger__button-container #*/}

          <div className="ma__header__hamburger__utility-nav ma__header__hamburger__utility-nav--wide js-utility-nav--wide">
            {utilityNav && <UtilityNav {...utilityNav} />}
          </div>

          <div className="ma__header__hamburger__nav-container" aria-hidden="true">
            <div className="ma__header__hamburger__logo ma__header__hamburger__logo--mobile">
              {siteLogo && <SiteLogo {...siteLogo} />}
            </div>{/*# .ma__header__hamburger__logo #*/}

            {!hideHeaderSearch &&
              <div className="ma__header__nav-search js-header__nav-search" >
                {headerSearch && <HeaderSearch {...headerSearch} id="nav-search" />}
              </div>
            }
            <div className="ma__header__hamburger__main-nav">
              {mainNav && <MainNav {...mainNav} />}
            </div>{/*# .ma__header__hamburger__main-nav #*/}

            <div className="ma__header__hamburger__utility-nav ma__header__hamburger__utility-nav--narrow js-utility-nav--narrow">
              {utilityNav && <UtilityNav {...utilityNav} />}
            </div>{/*</nav># .ma__header__hamburger__utility-nav #*/}
          </div>{/*# .ma__header__hamburger__nav-container #*/}

        </div>{/*# . ma__header__hamburger-wrapper #*/}
      </nav>
      <div className="ma__header__container">
        <div className="ma__header__hamburger__logo" tabIndex="-1">
          {siteLogo && <SiteLogo {...siteLogo} />}
        </div>
        {!hideHeaderSearch &&
          <div className="ma__header__hamburger__search ma__header__hamburger__search-bar js-header-search-menu">
            {headerSearch && <HeaderSearch {...headerSearch} />}
          </div>
        }
      </div>
    </header>
  );
};

export default HeaderHamburger;