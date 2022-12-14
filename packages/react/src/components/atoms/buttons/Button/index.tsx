/**
 * Button module.
 * @module @massds/mayflower-react/Button
 */
import React from 'react';
import classNames from 'classnames';

export interface ButtonProps {
  /** Custom click handler function. */
  onClick?(...args: unknown[]): unknown;
  /** When populated with a url, this component renders an `<a>` vs a `<button>` */
  href?: string;
  /** The text which renders in the standard browser tooltip on hover */
  info?: string;
  /** Aria-label of the button */
  label?: string;
  /** Button or link text */
  text?: string;
  /** HTML button 'type' attribute  */
  type?: "submit" | "reset" | "button" | "";
  /** Create a smaller button */
  size?: "" | "small" | "large";
  /** Themes correspond to site color scheme i.e. sass variables */
  theme?: "" | "c-primary-alt" | "c-highlight" | "c-gray-dark";
  /** Button usage */
  usage?: "" | "secondary" | "tertiary" | "quaternary";
  /** Set `<button>` to disabled */
  disabled?: boolean;
  /** Custom classnames appending to the button */
  classes?: string[];
  children?: React.ReactNode;
}

const Button = (button: ButtonProps) => {
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
      aria-label={button.label}
      onClick={(e) => onClickCallback(e)}
      disabled={button.disabled}
    >
      {button.children ? button.children : button.text}
    </Element>
  );
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
