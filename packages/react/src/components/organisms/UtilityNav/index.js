/**
 * UtilityNav module.
 * @module @massds/mayflower-react/UtilityNav
 * @requires module:@massds/mayflower-assets/scss/03-organisms/utility-nav
 * @requires module:@massds/mayflower-assets/scss/03-organisms/utility-panel
 * @requires module:@massds/mayflower-assets/scss/01-atoms/decorative-link
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import UtilityPanel from 'MayflowerReactOrganisms/UtilityPanel';
// eslint-disable-next-line import/no-unresolved
import IconBuilding from 'MayflowerReactBase/Icon/IconBuilding';
// eslint-disable-next-line import/no-unresolved
import IconLogin from 'MayflowerReactBase/Icon/IconLogin';
// eslint-disable-next-line import/no-unresolved
import IconLatlonglobe from 'MayflowerReactBase/Icon/IconLatlonglobe';

class UtilityNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navSelected: -1,
      isOpen: this.props.isOpen
    };
    this.onClick = this.onClick.bind(this);
    this.ident = shortid.generate();
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps;
    this.setState({ isOpen, navSelected: -1 });
  }

  onClick(divId, e) {
    e.preventDefault();
    this.setState((state) => ({
      navSelected: (state.navSelected === -1) ? divId : -1,
      isOpen: true
    }));
  }

  render() {
    const { navSelected } = this.state;
    const { googleLanguages, items } = this.props;
    return((
      <div className="ma__utility-nav js-util-nav">
        <ul className="ma__utility-nav__items">
          {googleLanguages && <GoogleLanguages />}
          {items.map((item, itemIndex) => {
            const newItem = { ...item };
            newItem.navSelected = navSelected;
            // Use utility nav ident to make unique item ids.
            newItem.navIdent = this.ident;
            const { isOpen } = this.state;
            return(
              (item.panel)
                /* eslint-disable react/no-array-index-key */
                ? <NavItem handleClick={this.onClick} data={newItem} key={`navItem.${itemIndex}`} index={itemIndex} isOpen={isOpen} />
                : <NavItemLink key={`navItem.${itemIndex}`} data={item} />
            );
          })}
        </ul>
      </div>
    ));
  }
}

const GoogleLanguages = () => (
  <li key="li.googleLanguage" className="ma__utility-nav__item">
    <div className="ma__utility-nav__translate">
      <div id="google_translate_element" />
      <div className="ma__utility-nav__translate-icon">
        <IconLatlonglobe />
      </div>
    </div>
  </li>
);

const NavItem = (obj) => {
  const item = obj.data;
  const divId = `nav-content-${item.navIdent}-${obj.index}`;
  const oneIsOpen = obj.isOpen;
  const thisIsOpen = item.navSelected === divId;
  const isExpanded = (oneIsOpen && thisIsOpen) ? 'is-open' : 'is-closed';
  const divProps = {
    className: `ma__utility-nav__content js-util-nav-content ${isExpanded}`,
    'aria-hidden': isExpanded ? 'false' : 'true',
    id: divId
  };
  const iconProps = {
    ariaHidden: true
  };
  const IconComponent = item.icon === 'building' ? IconBuilding : IconLogin;
  return(
    <li className="ma__utility-nav__item js-util-nav-toggle">
      <button type="button" onClick={(e) => obj.handleClick(divId, e)} className={`ma__utility-nav__link ${isExpanded}`} href="#" aria-label={item.ariaLabelText || item.text}>
        <IconComponent {...iconProps} />
        <span>{item.text}</span>
      </button>
      <div {...divProps}>
        <div className="ma__utility-nav__container">
          <div className="ma__utility-nav__content-title">
            <button type="button" onClick={(e) => obj.handleClick(divId, e)} className="ma__utility-nav__close js-close-util-nav">
              <span>{item.closeText}</span>
              <span className="ma__utility-nav__close-icon" aria-hidden="true">+</span>
            </button>
            <IconComponent {...iconProps} />
            <span>{item.text}</span>
          </div>
          <div className="ma__utility-nav__content-body">
            <UtilityPanel {...item.panel} />
          </div>
        </div>
      </div>
    </li>
  );
};

const NavItemLink = (obj) => {
  const item = obj.data;
  const iconProps = {
    ariaHidden: true
  };
  const IconComponent = item.icon === 'building' ? IconBuilding : IconLogin;

  return(
    <li className="ma__utility-nav__item js-util-nav-toggle">
      <a className="ma__utility-nav__link" href={item.href} aria-label={item.ariaLabelText || item.text}>
        <IconComponent {...iconProps} />
        <span>{item.text}</span>
      </a>
    </li>
  );
};

UtilityNav.propTypes = {
  /** Boolean that controls when to show the google language dom. */
  googleLanguages: PropTypes.bool,
  /** An array of navigation items to display to the user: <ul>
   * `text:` The text to display for the main navigation item.<br />
   * `ariaLabelText:` Defines the label to use with aria-label.<br />
   * `icon:` The icon to display to the left of text.<br />
   * `href:` The href for the link if not a button.<br />
   * `closeText:` The text to use on the close link.<br />
   * `panel:` Displays an utility panel when text is clicked.
   * </ul>
  */
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    ariaLabelText: PropTypes.string,
    icon: PropTypes.oneOf([
      'building', 'login'
    ]),
    href: PropTypes.string,
    closeText: PropTypes.string,
    panel: PropTypes.shape(UtilityPanel.propTypes)
  })),
  /** Boolean that controls if any UtilityNav div should be should be open on mobile. */
  isOpen: PropTypes.bool
};

export default UtilityNav;
