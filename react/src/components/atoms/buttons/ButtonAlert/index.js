import React from 'react';
import is from 'is';
import PropTypes from 'prop-types';
import './style.css';

const ButtonAlert = ({
  text, onClick, hideText, showText, classes
}) => {
  const buttonProps = {
    className: 'ma__button-alert'
  };

  if (classes && classes.length > 0) {
    buttonProps.className += ` ${classes}`;
  }

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
  /** An optional class to pass to the button alert */
  classes: PropTypes.string,
  /** An optional onClick function */
  onClick: PropTypes.func,
  /** Text for showing alert */
  showText: PropTypes.string.isRequired,
  /** Text for hiding alert */
  hideText: PropTypes.string.isRequired
};

export default ButtonAlert;
