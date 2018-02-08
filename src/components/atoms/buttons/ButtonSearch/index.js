import React from 'react';
import PropTypes from 'prop-types';
import SvgSearch from '../../icons/SvgSearch';

const ButtonSearch = (buttonSearch) => (
  <button type="submit" className="ma__button-search">
    <span>{buttonSearch.text}</span>
    <SvgSearch />
  </button>
);

ButtonSearch.propTypes = {
  /** The text to display in the button */
  text: PropTypes.string.isRequired
};

ButtonSearch.defaultProps = {};

export default ButtonSearch;
