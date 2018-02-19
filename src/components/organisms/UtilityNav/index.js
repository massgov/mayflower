import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UtilityPanel from '../UtilityPanel';
import LatLonGlobe from '../../atoms/icons/LatLonGlobe/LatLonGlobe';
import SvgBuilding from '../../atoms/icons/SvgBuilding';
import SvgLogin from '../../atoms/icons/SvgLogin';

class UtilityNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navSelected: -1
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick(divId, e) {
    e.preventDefault();
    this.setState({
      navSelected: (this.state.navSelected === -1) ? divId : -1
    });
  }
  render() {
    const { navSelected } = this.state;
    const utilityNav = this.props;
    return((
      <section className="ma__utility-nav js-util-nav">
        <ul className="ma__utility-nav__items">
          {utilityNav.googleLanguages && <GoogleLanguages />}
          {utilityNav.items.map((item, itemIndex) => {
            const newItem = Object.assign({}, item);
            newItem.navSelected = navSelected;
            return(<NavItem handleClick={this.onClick} data={newItem} key={`navItem.${itemIndex}`} index={itemIndex} />);
          })}
        </ul>
      </section>
    ));
  }
}

const GoogleLanguages = () => (
  <li key="li.googleLanguage" className="ma__utility-nav__item">
    <div className="ma__utility-nav__translate">
      <div id="google_translate_element" />
      <div className="ma__utility-nav__translate-icon">
        <LatLonGlobe />
      </div>
    </div>
  </li>
);

const NavItem = (obj) => {
  const item = obj.data;
  const divId = `nav-content.${obj.index}`;
  const isExpanded = item.navSelected === divId;
  const isOpen = isExpanded ? 'is-open' : 'is-closed';
  const divProps = {
    className: `ma__utility-nav__content js-util-nav-content ${isOpen}`,
    'aria-hidden': isExpanded ? 'false' : 'true',
    id: divId
  };
  return((
    <li className="ma__utility-nav__item js-util-nav-toggle">
      <a onClick={(e) => obj.handleClick(divId, e)} className={`ma__utility-nav__link ${isOpen}`} href="#" aria-label={item.ariaLabelText || item.text}>
        {item.icon}
        <span>{item.text}</span>
      </a>
      <div {...divProps}>
        <div className="ma__utility-nav__container">
          <div className="ma__utility-nav__content-title">
            <button onClick={(e) => obj.handleClick(divId, e)} className="ma__utility-nav__close js-close-util-nav">
              <span>{ item.closeText }</span>
              <span className="ma__utility-nav__close-icon" aria-hidden="true">+</span>
            </button>
            {item.icon}
            <span>{ item.text }</span>
          </div>
          <div className="ma__utility-nav__content-body">
            <UtilityPanel {...item.panel} />
          </div>
        </div>
      </div>
    </li>
  ));
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
    icon: PropTypes.oneOfType([
      PropTypes.shape(SvgBuilding.propTypes),
      PropTypes.shape(SvgLogin.propTypes)
    ]),
    /** The text to use on the close link. */
    closeText: PropTypes.string.isRequired,
    /** Displays an utility panel when text is clicked. */
    panel: PropTypes.shape(UtilityPanel.propTypes)
  }))
};

export default UtilityNav;
