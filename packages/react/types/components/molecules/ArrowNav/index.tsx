// @ts-nocheck
/**
 * ArrowNav module.
 * @module @massds/mayflower-react/ArrowNav
 * @requires module:@massds/mayflower-assets/scss/02-molecules/arrow-nav
 * @requires module:@massds/mayflower-assets/scss/01-atoms/arrow-button
 */
import React from 'react';
import classNames from 'classnames';
import ArrowButton from 'MayflowerReactButtons/ArrowButton';

export interface ArrowNavProps {
  /** Top label information */
  label: string
  /** Title */
  title: string
  /** Link information */
  info?: string
  /** Arrow Direction */
  direction?: "left" | "right"
  /** Link href */
  href?: string
  /** Function */
  onClick?(...args: unknown[]): unknown
  /** Bottom Link text */
  text?: string
}

const ArrowNav = (props: ArrowNavProps) => {
  const sectionClasses = classNames({
    'js-clickable-link': true,
    'ma__arrow-nav': true,
    [`ma__arrow-nav--${props.direction}`]: props.direction
  });
  const Element = props.href ? 'a' : 'section';
  const onClickCallback = (e) => {
    if (typeof props.onClick === 'function') {
      e.preventDefault();
      props.onClick(e);
    }
  };
  return(
    <Element
      className={sectionClasses}
      onClick={(e) => onClickCallback(e)}
      href={props.href}
      title={props.info}
    >
      <ArrowButton direction={props.direction} />
      <h2 className="ma__arrow-nav__title" data-label={props.label}>
        <span>{props.title}</span>
      </h2>
      <div className="ma__arrow-nav__text">
        {props.text}
      </div>
    </Element>
  );
};

ArrowNav.defaultProps = {
  info: '',
  href: '',
  onClick: '',
  text: '',
  direction: 'left'
};

export default ArrowNav;
