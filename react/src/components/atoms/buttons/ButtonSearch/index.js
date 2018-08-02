import React from 'react';
import PropTypes from 'prop-types';
import SvgSearch from '../../icons/SvgSearch';

const ButtonSearch = (buttonSearch) => {
  console.log('ButtonSearch props: ', buttonSearch);
  const onButtonClick = Object.prototype.hasOwnProperty.call(buttonSearch, 'onClick');
  return((
    <button
      type="submit"
      aria-label={buttonSearch.ariaLabel}
      className={buttonSearch.classes.join(' ')}
      onClick={(e) => { if (onButtonClick) buttonSearch.onClick(e); }}
    >
      <span>{buttonSearch.text}</span>
      <SvgSearch />
    </button>
  ));
};

ButtonSearch.propTypes = {
  /** Custom click handler function. */
  onClick: PropTypes.func,
  /** The text to display in the button */
  text: PropTypes.string,
  /** The aria-label property is used to provide the label to any assistive
   * technologies. This is useful if the text value is not descriptive of the
   * button's functionality. */
  ariaLabel: PropTypes.string.isRequired,
  /** Optional classes to apply to the button in place of the default */
  classes: PropTypes.arrayOf(PropTypes.string)
};

ButtonSearch.defaultProps = {
  text: 'Search',
  classes: ['ma__button-search']
};

export default ButtonSearch;
