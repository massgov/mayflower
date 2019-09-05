import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ref } from 'airbnb-prop-types';
import Icon from '../../icons/Icon';
import './style.css';

class ButtonWithIcon extends React.Component {
  handleClick = (e) => {
    e.preventDefault();
    if (typeof this.props.onClick === 'function') {
      e.persist();
      this.props.onClick(e);
    }
  }
  render() {
    const {
      classes, expanded, capitalized, iconSize, iconColor, icon, type, usage, ariaLabel, theme
    } = this.props;
    const buttonClasses = classNames({
      'ma__button-icon': true,
      'ma__button-icon--expanded': expanded,
      'ma__button-icon--capitalized': capitalized,
      'ma__icon-small': iconSize === 'small' || icon.props.name === 'chevron',
      [`ma__icon--${iconColor}`]: iconColor,
      'ma__button-search': icon.props.name === 'search',
      'ma__button-search--secondary': icon.props.name === 'search' && usage === 'secondary',
      [`ma__button-icon--${theme}`]: theme,
      [`ma__button-icon--${usage}`]: usage,
      [classes.join(' ')]: classes
    });
    const buttonProps = {
      ...this.props,
      className: buttonClasses,
      onClick: this.handleClick,
      tabIndex: 0
    };
    return(
      <button {...buttonProps} ref={this.props.setButtonRef} aria-expanded={expanded}>
        <span>{this.props.text}</span>
        {this.props.icon}
      </button>
    );
  }
}

ButtonWithIcon.propTypes = {
  /** id for the button */
  id: PropTypes.string,
  // Function to run on click of the button.
  onClick: PropTypes.func,
  // Sets a reference to the button onto the passed node.
  setButtonRef: ref(),
  // Button text.
  text: PropTypes.string,
  /** HTML <button> 'type' attribute  */
  type: PropTypes.oneOf(['submit', 'reset', 'button', '']),
  // Button classes.
  classes: PropTypes.arrayOf(PropTypes.string),
  // Icon to display within the button.
  icon: PropTypes.element,
  // Adds expanded class to button if true.
  expanded: PropTypes.bool,
  // Adds capitalized class to button if true.
  capitalized: PropTypes.bool,
  // Defines the size, default size fits the most square icons and "small" setting is specific for the chevron icon.
  iconSize: PropTypes.oneOf(['', 'small']),
  // Defines the fill color of the svg, default color is $c-gray-light.
  iconColor: PropTypes.oneOf(['', 'c-primary','c-primary-alt', 'c-highlight', 'c-white']),
  /** The aria-label property is used to provide the label to any assistive
   * technologies. This is useful if the text value is not descriptive of the
   * button's functionality. */
  'aria-label': PropTypes.string,
  /** Themes correspond to site color scheme i.e. sass variables */
  theme: PropTypes.oneOf(['', 'c-primary', 'c-highlight', 'c-gray-dark']),
  /** Button usage */
  usage: PropTypes.oneOf(['', 'secondary', 'tertiary', 'quaternary', 'quaternary-simple']),
  /** Whether the button has a popup or not */
  'aria-haspopup': PropTypes.bool
};

ButtonWithIcon.defaultProps = {
  text: 'Search',
  type: 'submit',
  classes: [],
  icon: <Icon name="search" svgHeight={20} svgWidth={20} />,
  capitalized: false,
  iconSize: '',
  iconColor: '',
  'aria-label': '',
  usage: '',
  theme: '',
  'aria-haspopup': false
};

export default ButtonWithIcon;
