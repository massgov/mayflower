import React from 'react';
import PropTypes from 'prop-types';
import SvgSearch from '../../icons/SvgSearch';
import './style.css';

class ButtonWithIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    if (this.props.canExpand) {
      this.setState((prevState) => ({ expanded: !prevState.expanded }));
    }
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
  }

  render() {
    let classNames = this.props.classes.join(' ');

    if (this.props.canExpand) {
      classNames += ' ma__button-expandable';
      classNames += this.state.expanded ? ' ma__button-expanded' : '';
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

    return(
      <button
        type="submit"
        className={`ma__button-icon ${classNames}`}
        onClick={this.handleClick}
      >
        <span>{this.props.text}</span>
        {this.props.icon}
      </button>
    );
  }
}

ButtonWithIcon.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  classes: PropTypes.arrayOf(PropTypes.string),
  icon: PropTypes.element,
  canExpand: PropTypes.bool,
  capitalized: PropTypes.bool,
  iconSize: PropTypes.oneOf(['', 'small']),
  iconColor: PropTypes.oneOf(['', 'green'])
};

ButtonWithIcon.defaultProps = {
  onClick: () => {},
  text: 'Search',
  classes: [],
  icon: <SvgSearch />,
  canExpand: false,
  capitalized: false,
  iconSize: 'small',
  iconColor: ''
};

export default ButtonWithIcon;
