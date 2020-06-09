/**
 * ButtonSort module.
 * @module @massds/mayflower-react/ButtonSort
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-sort
 */
import React from 'react';
import PropTypes from 'prop-types';

const ButtonSort = (buttonSort) => {
  const buttonSortClass = buttonSort.direction ? ` ma__button-sort--${buttonSort.direction}` : '';
  const classNames = `ma__button-sort js-button-sort${buttonSortClass}`;

  return(
    <button type="button" className={classNames}>{buttonSort.text}</button>
  );
};

ButtonSort.propTypes = {
  /** The label text of the sort button */
  text: PropTypes.string.isRequired,
  /** An array of sort button objects */
  direction: PropTypes.oneOf(['', 'asc', 'dsc'])
};

export default ButtonSort;
