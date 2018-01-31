import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const button = props;
  const buttonSize = button.size ? ` ma__button--${button.size}` : '';
  const buttonStyle = button.outline ? ' ma__button--minor' : '';
  const buttonTheme = button.theme ? ` ma__button--${button.theme}` : '';
  const classNames = `ma__button${buttonSize}${buttonStyle}${buttonTheme}`;
  const Element = button.href ? 'a' : 'button';

  return(
    <Element
      className={classNames}
      type={button.type}
      href={button.href}
      title={button.info}
      aria-label={button.info}
      onClick={button.onClick}
    >
      {button.text}
    </Element>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  href: PropTypes.string,
  info: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.oneOf(['submit', 'reset', 'button', '']),
  size: PropTypes.oneOf(['', 'small']),
  theme: PropTypes.oneOf(['', 'secondary', 'quaternary']),
  outline: PropTypes.bool
};

Button.defaultProps = {
  href: '',
  info: '',
  type: 'button',
  text: 'Button',
  size: '',
  theme: '',
  outline: false
};

export default Button;
