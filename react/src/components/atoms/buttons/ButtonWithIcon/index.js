import React from 'react';
import PropTypes from 'prop-types';
import SvgSearch from '../../icons/SvgSearch';
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
    let classNames = this.props.classes.join(' ');
    if (this.props.canExpand) {
      classNames += ' ma__button-icon--expandable';
      classNames += this.props.expanded ? ' ma__button-icon--expanded' : '';
    }
    if (this.props.capitalized) {
      classNames += ' ma__button-capitalized';
    }
    if (this.props.iconSize === 'small') {
      classNames += ' ma__icon-small';
    }
    if (this.props.iconColor === 'green') {
      classNames += ' ma__icon-green';
    }
    const buttonProps = {
      type: 'submit',
      className: `ma__button-icon ${classNames}`,
      onClick: this.handleClick,
      tabIndex: 0
    };
    return(
      <button {...buttonProps} ref={this.setButtonRef}>
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
  iconSize: PropTypes.oneOf(['', 'small']),
  iconColor: PropTypes.oneOf(['', 'green'])
};

ButtonWithIcon.defaultProps = {
  text: 'Search',
  classes: [],
  icon: <SvgSearch />,
  canExpand: false,
  capitalized: false,
  iconSize: 'small',
  iconColor: ''
};

export default ButtonWithIcon;
