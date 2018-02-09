import React from 'react';
import PropTypes from 'prop-types';
import ButtonSort from '../../atoms/buttons/ButtonSort';
import keyIndex from 'react-key-index';

const SortResults = (sortResults) => {
  this.listIndex = 1;
  const keyButtonSort = keyIndex(sortResults.sortButtons, 1);
  console.log(keyButtonSort)
  return (
    <div className="ma__sort-results js-sort-results">
    {sortResults.label &&
        (<span className="ma__sort-results__label">{sortResults.label}</span>)
      }
    {keyButtonSort.map((buttonSort) => (<ButtonSort {...buttonSort} />))}
  </div>
    )
};

SortResults.propTypes = {
  /** The label text of the sort buttons */
  label: PropTypes.string,
  /** An array of sort button objects */
  //sortButtons: PropTypes.shape(ButtonSort.propTypes).isRequired
  sortButtons: PropTypes.arrayOf(PropTypes.shape(ButtonSort.propTypes)).isRequired
};

export default SortResults;
