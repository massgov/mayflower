import React from 'react';
import PropTypes from 'prop-types';
import SortResults from '../SortResults'



const ResultsHeading = (resultsHeading) => {
  const resultsHeadingTotal = resultsHeading.totalResults && (` of ${resultsHeading.totalResults}` );
  const resultsHeadingTags = resultsHeading.tags && (` for: ` );
  const resultsHeadingTitle = `Showing ${resultsHeading.numResults}${resultsHeadingTotal}${resultsHeadingTags}`;
  return(
    <div className="ma__results-heading js-results-heading">
      <div className="ma__results-heading__container">
        <div className="ma__results-heading__title">
          {resultsHeadingTitle}
        </div>
        {resultsHeading.tags && (
          <div className="ma__results-heading__tags">
            { resultsHeading.tags.map((tag) => (
                <button
                  type="button"
                  className="ma__results-heading__tag js-results-heading-tag"
                  data-ma-filter-type={tag.type}
                  data-ma-filter-value={tag.value}>
                  {tag.text}
                </button>
           ))}
          <button type="button" className="ma__results-heading__clear js-results-heading-clear">Clear all</button>
        </div>)}
        {resultsHeading.sortResults && (
      <div className="ma__results-heading__sort">
        <SortResults {...resultsHeading.sortResults}/>
      </div>
    )}
  </div>
</div>
  );
};

ResultsHeading.propTypes = {
  /** The range of results being displayed, e.g. 1-10 */
  numResults: PropTypes.string,
  /** The total count of results */
  totalResults: PropTypes.string,
  /** The sort options available*/
  sortResults: PropTypes.instanceOf(SortResults),
  /** The tags applied to the search list
        type: The type of tag
        text: The text displayed by the tag (required)
        value: The value of the tag  */
  tags: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    value: PropTypes.string
  }))
};

export default ResultsHeading;
