/**
 * ResultsHeading module.
 * @module @massds/mayflower-react/ResultsHeading
 * @requires module:@massds/mayflower-assets/scss/02-molecules/results-heading
 * @requires module:@massds/mayflower-assets/scss/01-atoms/select-box
 * @requires module:@massds/mayflower-assets/scss/01-atoms/label
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-toggle
 * @requires module:@massds/mayflower-assets/scss/01-atoms/select-box
 * @requires module:@massds/mayflower-assets/scss/01-atoms/helper-text
 * @requires module:@massds/mayflower-assets/scss/02-molecules/tags
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-tag
 */
import React from 'react';
import PropTypes from 'prop-types';
import ButtonToggle from 'MayflowerReactButtons/ButtonToggle';
import SelectBox from 'MayflowerReactForms/SelectBox';
import Tags from 'MayflowerReactMolecules/Tags';

const ResultsHeading = (resultsHeading) => {
  const resultsHeadingTotal = resultsHeading.totalResults ? ` of ${resultsHeading.totalResults} for: ` : '';
  const resultsHeadingTitle = `Showing results ${resultsHeading.numResults}${resultsHeadingTotal}`;
  const { tags } = resultsHeading;
  const selectBoxProps = resultsHeading.selectBox;
  const buttonToggleProps = resultsHeading.buttonToggle;
  return(
    <div className="ma__results-heading js-results-heading">
      <div className="ma__results-heading__container">
        <div className="ma__results-heading__title">
          {resultsHeadingTitle}
        </div>
        {tags && (
          <Tags {...tags} />
        )}
        { selectBoxProps && (
          <div className="ma__results-heading__sort ma__results-heading__sort-selecBox">
            <SelectBox {...selectBoxProps} />
          </div>
        )}
        { buttonToggleProps && (
          <div className="ma__results-heading__sort">
            <ButtonToggle {...buttonToggleProps} />
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
  /** The sort input type as ButtonToggle */
  buttonToggle: PropTypes.shape(ButtonToggle.props),
  /** The sort input type as SelectBox */
  selectBox: PropTypes.shape(SelectBox.props),
  /** The array of tags and the tags callback functions */
  tags: PropTypes.shape(Tags.propTypes)
};

export default ResultsHeading;
