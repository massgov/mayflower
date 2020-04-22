import React from 'react';
import PropTypes from 'prop-types';
import ButtonSort from '../../atoms/buttons/ButtonSort';

import './style.css';

const SortResults = (sortResults) => (
  <div className="ma__sort-results js-sort-results">
    {sortResults.label &&
        (<span className="ma__sort-results__label">{sortResults.label}</span>)
      }
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
