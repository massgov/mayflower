import React, { Component } from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import rfdc from 'rfdc';
import UtilityNav from '../UtilityNav';
import MainNav from '../../molecules/MainNav';
import HeaderSearch from '../../molecules/HeaderSearch';
import SiteLogo from '../../atoms/media/SiteLogo';
import logo from '../../../assets/images/stateseal.png';
import './styles.css';

const clone = rfdc();
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      utilNavOpen: false,
      shouldNavigateTop: false,
      shouldNavigateBottom: true
    };
    this.searchInputTop = React.createRef();
    this.searchInputBottom = React.createRef();
    this.buttonRefTop = React.createRef();
    this.buttonRefBottom = React.createRef();
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
  };
  // Puts focus on the mobile search input after the menu is opened via the search button.
  afterButtonSearch = () => {
    document.getElementById('nav-search').focus();
    if (is.fn(this.props.headerSearch.buttonSearch.onClick)) {
      this.props.headerSearch.buttonSearch.onClick();
    }
  };
  // On click action used for both top and bottom buttons.
  defaultButtonSearchOnClick = (e) => {
    if (e && e.currentTarget === this.buttonRefTop.current) {
      if (this.state.shouldNavigateTop) {
        const query = this.searchInputTop.current.value;
        if (query.length > 0) {
          window.location.href = `https://search.mass.gov/?q=${query}`;
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
      if (this.state.shouldNavigateBottom) {
        const query = this.searchInputBottom.current.value;
        if (query.length > 0) {
          // @todo - this does not work in iFrame tags. Change this to something that does.
          window.location.href = `https://search.mass.gov/?q=${query}`;
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
    const headerSearchProps = clone(this.props.headerSearch);
    headerSearchProps.buttonSearch.setButtonRef = this.buttonRefTop;
    headerSearchProps.buttonSearch.onClick = this.defaultButtonSearchOnClick;
    headerSearchProps.inputRef = this.searchInputTop;
    headerSearchProps.onChange = this.handleChangeSearchTop;
    return(<HeaderSearch {...headerSearchProps} />);
  };
  bottomHeaderSearch = () => {
    const headerSearchProps = clone(this.props.headerSearch);
    headerSearchProps.buttonSearch.setButtonRef = this.buttonRefBottom;
    headerSearchProps.buttonSearch.onClick = this.defaultButtonSearchOnClick;
    headerSearchProps.inputRef = this.searchInputBottom;
    headerSearchProps.onChange = this.handleChangeSearchBottom;
    headerSearchProps.id = 'nav-search';
    return(<HeaderSearch {...headerSearchProps} />);
  };
  render() {
    const header = this.props;
    const HeaderUtilityNav = <UtilityNav {...this.props.utilityNav} isOpen={this.state.utilNavOpen} />;
    return(
      <header className="ma__header" id="header">
        {!header.hideBackTo && (
          <div className="ma__header__backto">
            <a href="http://www.mass.gov">Go to classic Mass.gov</a>
          </div>)}
        <a className="ma__header__skip-nav" href="#main-content">skip to main content</a>
        <div className="ma__header__utility-nav ma__header__utility-nav--wide">
          {HeaderUtilityNav}
        </div>
        <div className="ma__header__container">
          <div className="ma__header__logo">
            <SiteLogo {...header.siteLogo} />
          </div>
          {!header.hideHeaderSearch &&
          <div className="ma__header__search js-header-search-menu">
            {is.fn(header.headerSearch) ? header.headerSearch() : this.topHeaderSearch()}
          </div>
          }
        </div>
        <nav className="ma__header__nav" aria-labelledby="main_navigation" id="main-navigation">
          <h2 id="main_navigation" className="visually-hidden">Main Navigation</h2>
          <div className="ma__header__button-container js-sticky-header">
            <button className="ma__header__back-button js-close-sub-nav">
              <span>Back</span>
            </button>
            <button
              className="ma__header__menu-button js-header-menu-button"
              onClick={() => this.menuButtonClicked(false)}
            >
              <span>Menu</span><span className="ma__header__menu-icon" />
            </button>
          </div>
          <div className="ma__header__nav-container">
            {!header.hideHeaderSearch &&
            <div className="ma__header__nav-search">
              {!header.hideHeaderSearch && (is.fn(header.headerSearch) ? header.headerSearch() : this.bottomHeaderSearch())}
            </div>
            }
            <div className="ma__header__main-nav">
              <MainNav {...header.mainNav} />
            </div>
            <div className="ma__header__utility-nav ma__header__utility-nav--narrow">
              {HeaderUtilityNav}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  /** imports the utilityNav component */
  utilityNav: PropTypes.shape(UtilityNav.propTypes).isRequired,
  /** imports the headersearch component */
  headerSearch: PropTypes.oneOfType([PropTypes.shape(HeaderSearch.propTypes), PropTypes.func]).isRequired,
  /** imports the mainnav component */
  mainNav: PropTypes.shape(MainNav.propTypes).isRequired,
  /** Adds a prop to hide header search in the header */
  hideHeaderSearch: PropTypes.bool,
  /** Adds a prop to not display go back to classic.mass.gov */
  hideBackTo: PropTypes.bool,
  /** imports the SiteLogo component */
  siteLogo: PropTypes.shape(SiteLogo.propTypes)
};

Header.defaultProps = {
  hideHeaderSearch: false,
  hideBackTo: true,
  siteLogo: {
    url: {
      domain: 'https://www.mass.gov/'
    },
    image: {
      src: logo,
      alt: 'Massachusetts state seal',
      width: 45,
      height: 45
    },
    siteName: 'Mass.gov',
    title: 'Mass.gov homepage'
  }
};

export default Header;
