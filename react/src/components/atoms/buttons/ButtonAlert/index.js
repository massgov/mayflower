import React from 'react';
import is from 'is';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.css';

const ButtonAlert = ({
  text, onClick, hideText, showText, classes, isOpen, type
}) => {
  const buttonClasses = classNames({
    'ma__button-alert': true,
    [`${classes}`]: (classes && classes.length > 0),
    'is-open': isOpen
  });
  const buttonProps = {
    className: buttonClasses,
    type
  };
  if (is.fn(onClick)) {
    buttonProps.onClick = onClick;
  }
  return(
    <button {...buttonProps}>
      <span className="ma__button-alert__hide">{hideText}</span>
      <span className="ma__button-alert__show">{showText}</span>
      {text}
    </button>
  );
};

ButtonAlert.propTypes = {
  /** The text that will display on the button alert. */
  text: PropTypes.string,
  /** Optional class(es) to pass to the button alert */
  classes: PropTypes.string,
  /** An optional onClick function */
  onClick: PropTypes.func,
  /** Text for showing alert */
  showText: PropTypes.string.isRequired,
  /** Text for hiding alert */
  hideText: PropTypes.string.isRequired,
  /** Adds is-open class to button if true. */
  isOpen: PropTypes.bool,
  /** HTML <button> 'type' attribute  */
  type: PropTypes.oneOf(['submit', 'reset', 'button', ''])
};

ButtonAlert.defaultProps = {
  isOpen: false,
  type: 'button'
};

export default ButtonAlert;
