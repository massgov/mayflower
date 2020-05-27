import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ArrowButton from '../../atoms/buttons/ArrowButton';

const ArrowNav = (props) => {
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

ArrowNav.propTypes = {
  /** Top label information */
  label: PropTypes.string.isRequired,
  /** Title */
  title: PropTypes.string.isRequired,
  /** Link information */
  info: PropTypes.string,
  /** Arrow Direction */
  direction: PropTypes.oneOf(['left', 'right']),
  /** Link href */
  href: PropTypes.string,
  /** Function */
  onClick: PropTypes.func,
  /** Bottom Link text */
  text: PropTypes.string
};

ArrowNav.defaultProps = {
  info: '',
  href: '',
  onClick: '',
  text: '',
  direction: 'left'
};

export default ArrowNav;
