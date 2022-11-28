// @ts-nocheck
/**
 * ArrowButton module.
 * @module @massds/mayflower-react/ArrowButton
 * @requires module:@massds/mayflower-assets/scss/01-atoms/arrow-button
 */
import React from 'react';
import classNames from 'classnames';

export interface ArrowButtonProps {
  /** Custom click handler function. */
  onClick?(...args: unknown[]): unknown
  /** When populated with a url, this component renders a `<a>` vs a `<button>` */
  href?: string
  /** The text which renders in the standard browser tooltip on hover */
  info?: string
  /** Direction of the arrow. */
  direction?: "left" | "right"
}

const ArrowButton = (props: ArrowButtonProps) => {
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

ArrowButton.defaultProps = {
  href: '',
  info: '',
  direction: 'left'
};

export default ArrowButton;
