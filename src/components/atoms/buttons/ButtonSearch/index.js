import React from 'react';
import PropTypes from 'prop-types';
import SvgSearch from '../../icons/SvgSearch';

const ButtonSearch = (buttonSearch) => (
  <button
    type="submit"
    className={buttonSearch.classes.join(' ')}
    onClick={buttonSearch.onClick}
  >
    <span>{buttonSearch.text}</span>
    <SvgSearch />
  </button>
);

ButtonSearch.propTypes = {
  /** Custom click handler function. */
  onClick: PropTypes.func,
  /** The text to display in the button */
  text: PropTypes.string,
  /** Optional classes to apply to the button in place of the default */
  classes: PropTypes.arrayOf(PropTypes.string)
};

ButtonSearch.defaultProps = {
  text: 'Search',
  classes: ['ma__button-search']
};

export default ButtonSearch;
