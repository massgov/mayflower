import React from 'react';
import PropTypes from 'prop-types';
import keyIndex from 'react-key-index';
import ButtonSort from '../../atoms/buttons/ButtonSort';

const SortResults = (sortResults) => (
  <div className="ma__sort-results js-sort-results">
    {sortResults.label &&
        (<span className="ma__sort-results__label">{sortResults.label}</span>)
      }
    {sortResults.sortButtons.map((buttonSort, index) => {
      let buttonProps = buttonSort;
      buttonProps.unique = index;
      buttonProps = keyIndex([buttonProps], index)[0];
      buttonProps.key = buttonProps._uniqueId;
      return(<ButtonSort {...buttonProps} />);
    })}
  </div>
);

SortResults.propTypes = {
  /** The label text of the sort buttons */
  label: PropTypes.string,
  /** An array of sort button objects */
  sortButtons: PropTypes.arrayOf(PropTypes.instanceOf(ButtonSort)).isRequired
};

export default SortResults;
