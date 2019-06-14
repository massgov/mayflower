import React from 'react';
import PropTypes from 'prop-types';
import classNamesBind from 'classnames/bind';
import styles from './style.module.css';

const classNames = classNamesBind.bind(styles);

const ButtonSort = (buttonSort) => {
  const buttonClasses = classNames({
    'ma__button-sort': true,
    'js-button-sort': true,
    [`ma__button-sort--${buttonSort.direction}`]: buttonSort.direction
  });

  return(
    <button type="button" className={buttonClasses}>{buttonSort.text}</button>
  );
};

ButtonSort.propTypes = {
  /** The label text of the sort button */
  text: PropTypes.string.isRequired,
  /** An array of sort button objects */
  direction: PropTypes.oneOf(['', 'asc', 'dsc'])
};

export default ButtonSort;
