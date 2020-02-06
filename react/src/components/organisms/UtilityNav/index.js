import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import UtilityPanel from '../UtilityPanel';
import Icon from '../../atoms/Icon';
import './styles.css';

class UtilityNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navSelected: -1,
      isOpen: this.props.isOpen
    };
    this.onClick = this.onClick.bind(this);
    this.ident = shortid.generate();
  }
  componentWillReceiveProps(nextProps) {
    const { isOpen } = nextProps;
    this.setState({ isOpen, navSelected: -1 });
  }
  onClick(divId, e) {
    e.preventDefault();
    this.setState({
      navSelected: (this.state.navSelected === -1) ? divId : -1,
      isOpen: true
    });
  }
  render() {
    const { navSelected } = this.state;
    const { googleLanguages, items } = this.props;
    return((
      <div className="ma__utility-nav js-util-nav">
        <ul className="ma__utility-nav__items">
          {googleLanguages && <GoogleLanguages />}
          {items.map((item, itemIndex) => {
            const newItem = Object.assign({}, item);
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
        <Icon name="latlonglobe" />
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
    name: item.icon,
    ariaHidden: true
  };
  return(
    <li className="ma__utility-nav__item js-util-nav-toggle">
      <button onClick={(e) => obj.handleClick(divId, e)} className={`ma__utility-nav__link ${isExpanded}`} href="#" aria-label={item.ariaLabelText || item.text}>
        <Icon {...iconProps} />
        <span>{item.text}</span>
      </button>
      <div {...divProps}>
        <div className="ma__utility-nav__container">
          <div className="ma__utility-nav__content-title">
            <button onClick={(e) => obj.handleClick(divId, e)} className="ma__utility-nav__close js-close-util-nav">
              <span>{item.closeText}</span>
              <span className="ma__utility-nav__close-icon" aria-hidden="true">+</span>
            </button>
            <Icon {...iconProps} />
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
    name: item.icon,
    ariaHidden: true
  };
  return(
    <li className="ma__utility-nav__item js-util-nav-toggle">
      <a className="ma__utility-nav__link" href={item.href} aria-label={item.ariaLabelText || item.text}>
        <Icon {...iconProps} />
        <span>{item.text}</span>
      </a>
    </li>
  );
};

UtilityNav.propTypes = {
  /** Boolean that controls when to show the google language dom. */
  googleLanguages: PropTypes.bool,
  /** An array of navigation items to display to the user. */
  items: PropTypes.arrayOf(PropTypes.shape({
    /** The text to display for the main navigation item. */
    text: PropTypes.string.isRequired,
    /** Defines the label to use with aria-label. */
    ariaLabelText: PropTypes.string,
    /** The icon to display to the left of text. */
    icon: PropTypes.oneOf([
      'building', 'login'
    ]),
    /** The href for the link if not a button. */
    href: PropTypes.string,
    /** The text to use on the close link. */
    closeText: PropTypes.string,
    /** Displays an utility panel when text is clicked. */
    panel: PropTypes.shape(UtilityPanel.propTypes)
  })),
  /** Boolean that controls if any UtilityNav div should be should be open on mobile. */
  isOpen: PropTypes.bool
};

export default UtilityNav;
