/**
 * SortResults module.
 * @module @massds/mayflower-react/SortResults
 * @requires module:@massds/mayflower-assets/scss/02-molecules/sort-results
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-sort
 */
import React from 'react';
import PropTypes from 'prop-types';
import ButtonSort from 'MayflowerReactButtons/ButtonSort';

const SortResults = (sortResults) => (
  <div className="ma__sort-results js-sort-results">
    {sortResults.label
        && (<span className="ma__sort-results__label">{sortResults.label}</span>)}
    {sortResults.sortButtons.map((buttonSort, index) => {
      const buttonProps = buttonSort;
      buttonProps.key = `ButtonSort.${index}`;
      return(<ButtonSort {...buttonProps} />);
    })}
  </div>
);

SortResults.propTypes = {
  /** The label text of the sort buttons */
  label: PropTypes.string,
  /** An array of sort button objects */
  sortButtons: PropTypes.arrayOf(PropTypes.shape(ButtonSort.propTypes)).isRequired
};

export default SortResults;
