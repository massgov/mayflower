import React from 'react';
import PropTypes from 'prop-types';
import SvgSearch from '../../icons/SvgSearch';
import './style.css';

class ButtonWithIcon extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
  }
  handleMouseDown(e) {
    if (typeof this.props.onMouseDown === 'function') {
      this.props.onMouseDown(e);
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
      onClick: (e) => this.handleClick(e),
      onMouseDown: (e) => this.handleMouseDown(e),
      tabIndex: 0
    };
    return(
      <button {...buttonProps}>
        <span>{this.props.text}</span>
        {this.props.icon}
      </button>
    );
  }
}

ButtonWithIcon.propTypes = {
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  text: PropTypes.string,
  classes: PropTypes.arrayOf(PropTypes.string),
  icon: PropTypes.element,
  canExpand: PropTypes.bool,
  expanded: PropTypes.bool,
  capitalized: PropTypes.bool,
  iconSize: PropTypes.oneOf(['', 'small']),
  iconColor: PropTypes.oneOf(['', 'green'])
};

ButtonWithIcon.defaultProps = {
  onClick: () => {},
  onMouseDown: () => {},
  text: 'Search',
  classes: [],
  icon: <SvgSearch />,
  canExpand: false,
  capitalized: false,
  iconSize: 'small',
  iconColor: ''
};

export default ButtonWithIcon;
