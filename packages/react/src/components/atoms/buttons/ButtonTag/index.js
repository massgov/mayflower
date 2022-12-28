/**
 * ButtonTag module.
 * @module @massds/mayflower-react/ButtonTag
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-tag
 */
import React from 'react';
import PropTypes from 'prop-types';

const ButtonTag = ({
  type, value, text, description, handleClick
}) => (
  <button
    type="button"
    className="ma__button-tag js-results-heading-tag"
    data-ma-filter-type={type}
    data-ma-filter-value={value}
    onClick={handleClick}
  >
    {text}
    {!!description && (
      <span className="visually-hidden">
        {description}
      </span>
    )}
    <span className="ma__button-tag__icon" aria-hidden="true">
      +
    </span>
  </button>
);

ButtonTag.propTypes = {
  /** The label text of the sort button */
  type: PropTypes.string.isRequired,
  /** The label text of the sort button */
  value: PropTypes.string.isRequired,
  /** The content of the button */
  text: PropTypes.node.isRequired,
  /** The visually hidden description of the button */
  description: PropTypes.node,
  /** An array of sort button objects */
  handleClick: PropTypes.func.isRequired
};

export default ButtonTag;
