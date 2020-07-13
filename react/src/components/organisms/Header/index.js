/**
 * Header module.
 * @module @massds/mayflower-react/Header
 * @requires module:@massds/mayflower-assets/scss/03-organisms/header
 * @requires module:@massds/mayflower-assets/scss/03-organisms/utility-nav
 * @requires module:@massds/mayflower-assets/scss/03-organisms/utility-panel
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 * @requires module:@massds/mayflower-assets/scss/02-molecules/main-nav
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-typeahead
 * @requires module:@massds/mayflower-assets/scss/01-atoms/site-logo
 * @requires module:@massds/mayflower-assets/scss/01-atoms/image
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import classNames from 'classnames';
import UtilityNav from 'MayflowerReactOrganisms/UtilityNav';
import MainNav from 'MayflowerReactMolecules/MainNav';
import HeaderSearch from 'MayflowerReactMolecules/HeaderSearch';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      utilNavOpen: false,
      shouldNavigateTop: false,
      shouldNavigateBottom: true,
      navSelected: -1
    };
    this.searchInputTop = React.createRef();
    this.searchInputBottom = React.createRef();
    this.buttonRefTop = React.createRef();
    this.buttonRefBottom = React.createRef();
  }

  updateSubNav = ({ navSelected }) => {
    this.setState({
      navSelected
    });
  }

  menuButtonClicked = (afterButtonSearch = false) => {
    // eslint-disable-next-line no-undef
    const body = document.querySelector('body');
    let bodyClass;
    if (body.hasAttribute('class')) {
      bodyClass = body.getAttribute('class');
      if (bodyClass) {
        if (bodyClass.indexOf('show-menu') !== -1) {
          bodyClass = bodyClass.split(' ').filter((val) => val !== 'show-menu').join(' ');
        } else {
          bodyClass += ' show-menu';
        }
        body.setAttribute('class', bodyClass);
      } else {
        bodyClass = 'show-menu';
        body.setAttribute('class', 'show-menu');
      }
    } else {
      bodyClass = 'show-menu';
      body.setAttribute('class', 'show-menu');
    }
    const newState = (bodyClass) ? { utilNavOpen: false } : { utilNavOpen: true };
    if (afterButtonSearch) {
      this.setState(newState, this.afterButtonSearch);
    } else {
      this.setState(newState);
    }
    this.updateSubNav({
      navSelected: -1
    });
  };

  // Puts focus on the mobile search input after the menu is opened via the search button.
  afterButtonSearch = () => {
    document.getElementById('nav-search').focus();
    const { headerSearch } = this.props;
    if (is.fn(headerSearch.buttonSearch.onClick)) {
      headerSearch.buttonSearch.onClick();
    }
  };

  // On click action used for both top and bottom buttons.
  defaultButtonSearchOnClick = (e) => {
    e.preventDefault();
    const { searchRedirect } = this.props;
    const { shouldNavigateBottom, shouldNavigateTop } = this.state;
    if (e && e.currentTarget === this.buttonRefTop.current) {
      if (shouldNavigateTop) {
        const query = this.searchInputTop.current.value;
        if (query.length > 0) {
          const { baseUrl, searchTermParam, queryParams = {} } = searchRedirect;
          const searchQuery = new URLSearchParams({ [searchTermParam]: query, ...queryParams });
          // If in an iframe, change parent window location.
          if (window.location !== window.parent.location) {
            window.parent.location.assign(`${baseUrl}?${searchQuery.toString()}`);
          } else {
            window.location.assign(`${baseUrl}?${searchQuery.toString()}`);
          }
        }
      } else {
        // Only toggle the menu for the top input if it's hidden (on mobile).
        const computedStyle = getComputedStyle(this.searchInputTop.current, null);
        if (computedStyle.display === 'none') {
          this.menuButtonClicked(true);
        }
      }
    }
    if (e && e.currentTarget === this.buttonRefBottom.current) {
      if (shouldNavigateBottom) {
        const query = this.searchInputBottom.current.value;
        if (query.length > 0) {
          const { baseUrl, searchTermParam, queryParams = {} } = searchRedirect;
          const searchQuery = new URLSearchParams({ [searchTermParam]: query, ...queryParams });
          // If in an iframe, change parent window location.
          if (window.location !== window.parent.location) {
            window.parent.location.assign(`${baseUrl}?${searchQuery.toString()}`);
          } else {
            window.location.assign(`${baseUrl}?${searchQuery.toString()}`);
          }
        }
      } else {
        this.menuButtonClicked(false);
      }
    }
  }

  handleChangeSearchTop = () => {
    const shouldNavigateTop = (this.searchInputTop.current.value.length > 0);
    this.setState({ shouldNavigateTop });
  }

  handleChangeSearchBottom = () => {
    const shouldNavigateBottom = (this.searchInputBottom.current.value.length > 0);
    this.setState({ shouldNavigateBottom });
  }

  topHeaderSearch = () => {
    const { headerSearch } = this.props;
    const headerSearchProps = {
      ...headerSearch,
      buttonSearch: {
        ...headerSearch.buttonSearch,
        setButtonRef: this.buttonRefTop,
        onClick: this.defaultButtonSearchOnClick
      },
      inputRef: this.searchInputTop,
      onChange: this.handleChangeSearchTop
    };
    return(<HeaderSearch {...headerSearchProps} />);
  };

  bottomHeaderSearch = () => {
    const { headerSearch } = this.props;
    const headerSearchProps = {
      ...headerSearch,
      buttonSearch: {
        ...headerSearch.buttonSearch,
        setButtonRef: this.buttonRefBottom,
        onClick: this.defaultButtonSearchOnClick
      },
      inputRef: this.searchInputBottom,
      onChange: this.handleChangeSearchBottom,
      id: 'nav-search'
    };
    return(<HeaderSearch {...headerSearchProps} />);
  };

  render() {
    const {
      hideBackTo, siteLogo, hideHeaderSearch, headerSearch, mainNav, utilityNav
    } = this.props;
    const { navSelected, utilNavOpen } = this.state;
    const headerClasses = classNames({
      ma__header: true,
      'ma__header--slim': !utilityNav,
      'ma__header--slim-mobile': (hideHeaderSearch && !mainNav && !utilityNav)
    });
    return(
      <header className={headerClasses} id="header">
        {!hideBackTo && (
          <div className="ma__header__backto">
            <a href="http://www.mass.gov">Go to classic Mass.gov</a>
          </div>
        )}
        <a className="ma__header__skip-nav" href="#main-content">skip to main content</a>
        <div className="ma__header__utility-nav ma__header__utility-nav--wide">
          {utilityNav ? <UtilityNav {...utilityNav} isOpen={utilNavOpen} /> : <div className="ma__header__banner" />}
        </div>
        <div className="ma__header__container">
          <div className="ma__header__logo">
            {
              is.fn(siteLogo) ? siteLogo() : <SiteLogo {...siteLogo} />
            }
          </div>
          {!hideHeaderSearch
          && (
          <div className="ma__header__search js-header-search-menu">
            {is.fn(headerSearch) ? headerSearch() : this.topHeaderSearch()}
          </div>
          )}
        </div>
        <nav className="ma__header__nav" aria-labelledby="main_navigation" id="main-navigation">
          <h2 id="main_navigation" className="visually-hidden">Main Navigation</h2>
          {(!hideHeaderSearch || mainNav || utilityNav) ? (
            <div className="ma__header__button-container">
              {
                (navSelected !== -1) && (
                  <button
                    type="button"
                    onClick={() => {
                      this.updateSubNav({
                        navSelected: -1
                      });
                    }}
                    className="ma__header__back-button--react"
                  >
                    <span>
                      Back
                    </span>
                  </button>
                )
              }
              <button
                type="button"
                className="ma__header__menu-button js-header-menu-button"
                onClick={() => this.menuButtonClicked(false)}
              >
                <span>Menu</span>
                <span className="ma__header__menu-icon" />
              </button>
            </div>
          ) : <div className="ma__header__banner ma__header__banner--mobile" />}
          <div className="ma__header__nav-container">
            {!hideHeaderSearch
            && (
            <div className="ma__header__nav-search">
              {is.fn(headerSearch) ? headerSearch() : this.bottomHeaderSearch()}
            </div>
            )}
            { mainNav && (
              <div className="ma__header__main-nav">
                <MainNav
                  {...mainNav}
                  closeMobileMenu={() => this.menuButtonClicked(false)}
                  updateHeaderState={(state) => this.updateSubNav(state)}
                  navSelected={navSelected}
                />
              </div>
            )}
            <div className="ma__header__utility-nav ma__header__utility-nav--narrow">
              {utilityNav ? <UtilityNav {...utilityNav} isOpen={utilNavOpen} /> : <div className="ma__header__banner" />}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  /** imports the utilityNav component */
  utilityNav: PropTypes.shape(UtilityNav.propTypes),
  /** imports the headersearch component */
  headerSearch: PropTypes.oneOfType([PropTypes.shape(HeaderSearch.propTypes), PropTypes.func]).isRequired,
  searchRedirect: PropTypes.shape({
    /** The base url that the user is redirected to when submitting a non-empty search value. */
    baseUrl: PropTypes.string,
    /** The URL query parameter that will be set to the value of the search input element. */
    searchTermParam: PropTypes.string,
    /** Optional extra query parameters to add to the redirect baseUrl. */
    queryParams: PropTypes.object
  }),
  /** imports the mainnav component */
  mainNav: PropTypes.shape(MainNav.propTypes),
  /** Adds a prop to hide header search in the header */
  hideHeaderSearch: PropTypes.bool,
  /** Adds a prop to not display go back to classic.mass.gov */
  hideBackTo: PropTypes.bool,
  /** siteLogo can be either a render prop or the SiteLogo component */
  siteLogo: PropTypes.oneOfType([PropTypes.shape(SiteLogo.propTypes), PropTypes.func])
};

Header.defaultProps = {
  hideHeaderSearch: false,
  hideBackTo: true,
  siteLogo: {
    url: {
      domain: 'https://www.mass.gov/'
    },
    image: {
      width: 45,
      height: 45
    },
    siteName: 'Mass.gov',
    title: 'Mass.gov homepage'
  },
  searchRedirect: {
    baseUrl: 'https://search.mass.gov',
    searchTermParam: 'q'
  }
};

export default Header;
