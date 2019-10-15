import React from 'react';
import PropTypes from 'prop-types';

const ButtonTag = ({ type, value, text, handleClick }) => {
  return (
    <button
      type="button"
      className="ma__results-heading__tag js-results-heading-tag"
      data-ma-filter-type={type}
      data-ma-filter-value={value}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

ButtonTag.propTypes = {
  /** The label text of the sort button */
  type: PropTypes.string.isRequired,
  /** The label text of the sort button */
  value: PropTypes.string.isRequired,
  /** The label text of the sort button */
  text: PropTypes.string.isRequired,
  /** An array of sort button objects */
  handleClick: PropTypes.func.isRequired
};

export default ButtonTag;
