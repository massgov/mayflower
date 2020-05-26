import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.scss';

const ArrowButton = (props) => {
  const buttonClasses = classNames({
    'ma__arrow-button': true,
    [`ma__arrow-button--${props.direction}`]: props.direction,
    'ma__arrow-button--left': !props.direction
  });
  const Element = props.href ? 'a' : 'button';
  const onClickCallback = (e) => {
    if (typeof props.onClick === 'function') {
      e.preventDefault();
      props.onClick(e);
    }
  };

  return(
    <Element
      className={buttonClasses}
      onClick={(e) => onClickCallback(e)}
      href={props.href}
      title={props.info}
      aria-label={props.info}
    />
  );
};

ArrowButton.propTypes = {
  /** Custom click handler function. */
  onClick: PropTypes.func,
  /** When populated with a url, this component renders a <a> vs a <button> */
  href: PropTypes.string,
  /** The text which renders in the standard browser tooltip on hover */
  info: PropTypes.string,
  /** Direction of the arrow. */
  direction: PropTypes.oneOf(['left', 'right'])
};

ArrowButton.defaultProps = {
  onClick: '',
  href: '',
  info: '',
  direction: 'left'
};

export default ArrowButton;
