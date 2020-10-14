/**
 * Button module.
 * @module @massds/mayflower-react/dist/Button
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = (button) => {
  const buttonClasses = classNames({
    ma__button: true,
    [`ma__button--${button.usage}`]: button.usage,
    [`ma__button--${button.size}`]: button.size,
    [`ma__button--${button.theme}`]: button.theme,
    'ma__button--disabled': button.disabled,
    [button.classes.join(' ')]: button.classes
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
      disabled={button.disabled}
    >
      {button.children ? button.children : button.text}
    </Element>
  );
};

Button.propTypes = {
  /** Custom click handler function. */
  onClick: PropTypes.func,
  /** When populated with a url, this component renders an `<a>` vs a `<button>` */
  href: PropTypes.string,
  /** The text which renders in the standard browser tooltip on hover */
  info: PropTypes.string,
  /** Button or link text */
  text: PropTypes.string,
  /** HTML button 'type' attribute  */
  type: PropTypes.oneOf(['submit', 'reset', 'button', '']),
  /** Create a smaller button */
  size: PropTypes.oneOf(['', 'small', 'large']),
  /** Themes correspond to site color scheme i.e. sass variables */
  theme: PropTypes.oneOf(['', 'c-primary-alt', 'c-highlight', 'c-gray-dark']),
  /** Button usage */
  usage: PropTypes.oneOf(['', 'secondary', 'tertiary', 'quaternary']),
  /** Set `<button>` to disabled */
  disabled: PropTypes.bool,
  /** Custom classnames appending to the button */
  classes: PropTypes.arrayOf(PropTypes.string)
};

// Only set defaults for the configuration variables which need to be opted in to activate.
Button.defaultProps = {
  href: '',
  type: '',
  size: '',
  theme: '',
  usage: '',
  disabled: false,
  classes: ['']
};

export default Button;
