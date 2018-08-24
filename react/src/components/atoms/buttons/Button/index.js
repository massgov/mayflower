import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.css';

const Button = (button) => {
  const buttonClasses = classNames({
    ma__button: true,
    'ma__button--minor': button.outline,
    [`ma__button--${button.size}`]: button.size,
    [`ma__button--${button.theme}`]: button.theme
  });
  const Element = button.href ? 'a' : 'button';
  const onClickCallback = (e) => {
    if (typeof button.onClick === 'function') {
      e.preventDefault();
      button.onClick(e);
    }
  };

  return(
    <Element
      className={buttonClasses}
      type={button.type}
      href={button.href}
      title={button.info}
      aria-label={button.info}
      onClick={(e) => onClickCallback(e)}
    >
      {button.text}
    </Element>
  );
};

Button.propTypes = {
  /** Custom click handler function. */
  onClick: PropTypes.func,
  /** When populated with a url, this component renders a <a> vs a <button> */
  href: PropTypes.string,
  /** The text which renders in the standard browser tooltip on hover */
  info: PropTypes.string,
  /** Button or link text */
  text: PropTypes.string,
  /** HTML <button> 'type' attribute  */
  type: PropTypes.oneOf(['submit', 'reset', 'button', '']),
  /** Create a smaller button */
  size: PropTypes.oneOf(['', 'small', 'large']),
  /** Themes correspond to site color scheme i.e. sass variables */
  theme: PropTypes.oneOf(['', 'secondary', 'quaternary']),
  /** Whether or not to make a ghost button */
  outline: PropTypes.bool
};

// Only set defaults for the configuration variables which need to be opted in to activate.
Button.defaultProps = {
  href: '',
  type: '',
  size: '',
  theme: '',
  outline: false
};

export default Button;
