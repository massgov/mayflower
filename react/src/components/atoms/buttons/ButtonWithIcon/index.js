import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../icons/Icon';
import './style.css';

class ButtonWithIcon extends React.Component {
  constructor(props) {
    super(props);
    this.setButtonRef = this.setButtonRef.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  setButtonRef(node) {
    if (typeof this.props.setButtonRef === 'function') {
      this.props.setButtonRef(node);
    }
  }
  handleClick(e) {
    e.preventDefault();
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
  }
  render() {
    const {
      classes, canExpand, expanded, capitalized, iconSize, iconColor, icon, type
    } = this.props;
    let classNames = classes.join(' ');
    if (canExpand) {
      classNames += ' ma__button-icon--expandable';
      if (expanded) {
        classNames += ' ma__button-icon--expanded';
      }
    }
    if (capitalized) {
      classNames += ' ma__button-capitalized';
    }
    if (iconSize === 'small' || icon.props.name === 'chevron') {
      classNames += ' ma__icon-small';
    }
    if (iconColor === 'green') {
      classNames += ' ma__icon-green';
    }
    if (icon.props.name === 'search') {
      classNames += ' ma__button-search';
    }
    const buttonProps = {
      type,
      className: `ma__button-icon ${classNames}`,
      onClick: this.handleClick,
      tabIndex: 0
    };
    return(
      <button {...buttonProps} aria-label={this.props.ariaLabel} ref={this.setButtonRef}>
        <span>{this.props.text}</span>
        {this.props.icon}
      </button>
    );
  }
}

ButtonWithIcon.propTypes = {
  // Function to run on click of the button.
  onClick: PropTypes.func,
  // Sets a reference to the button onto the passed node.
  setButtonRef: PropTypes.func,
  // Button text.
  text: PropTypes.string,
  /** HTML <button> 'type' attribute  */
  type: PropTypes.oneOf(['submit', 'reset', 'button', '']),
  // Button classes.
  classes: PropTypes.arrayOf(PropTypes.string),
  // Icon to display within the button.
  icon: PropTypes.element,
  // If true, button can expand and add expandable class.
  canExpand: PropTypes.bool,
  // Adds expanded class to button if true.
  expanded: PropTypes.bool,
  // Adds capitalized class to button if true.
  capitalized: PropTypes.bool,
  // Defines the size, default size fits the most square icons and "small" setting is specific for the chevron icon.
  iconSize: PropTypes.oneOf(['', 'small']),
  // Defines the fill color of the svg, default color is $c-gray-light.
  iconColor: PropTypes.oneOf(['', 'green']),
  /** The aria-label property is used to provide the label to any assistive
   * technologies. This is useful if the text value is not descriptive of the
   * button's functionality. */
  ariaLabel: PropTypes.string
};

ButtonWithIcon.defaultProps = {
  text: 'Search',
  type: 'submit',
  classes: [],
  icon: <Icon name="search" svgHeight={20} svgWidth={20} />,
  canExpand: false,
  capitalized: false,
  iconSize: '',
  iconColor: '',
  ariaLabel: 'search'
};

export default ButtonWithIcon;
