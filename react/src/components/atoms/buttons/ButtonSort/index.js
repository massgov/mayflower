import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

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
