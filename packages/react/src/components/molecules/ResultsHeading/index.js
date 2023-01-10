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
import classNames from 'classnames';
import ButtonToggle from 'MayflowerReactButtons/ButtonToggle';
import SelectBox from 'MayflowerReactForms/SelectBox';
import Tags from 'MayflowerReactMolecules/Tags';

function getTitle(resultsHeading) {
  // Check for `undefined` specifically to let the caller hide the title completely with an empty string.
  if (resultsHeading.title !== undefined) {
    return resultsHeading.title;
  }

  const resultsHeadingTotal = resultsHeading.totalResults ? ` of ${resultsHeading.totalResults} for: ` : '';
  return`Showing results ${resultsHeading.numResults}${resultsHeadingTotal}`;
}

const ResultsHeading = (resultsHeading) => {
  const classes = classNames(
    'ma__results-heading js-results-heading',
    resultsHeading.className
  );
  const title = getTitle(resultsHeading);
  const { tags } = resultsHeading;
  const selectBoxProps = resultsHeading.selectBox;
  const buttonToggleProps = resultsHeading.buttonToggle;
  return(
    <div className={classes}>
      <div className="ma__results-heading__container">
        { title && (
          <div className="ma__results-heading__title">
            {title}
          </div>
        )}
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
  /** Custom class added to the root element. */
  className: PropTypes.string,
  /** The range of results being displayed, e.g. 1-10 */
  numResults: PropTypes.string,
  /** The total count of results */
  totalResults: PropTypes.string,
  /** The title to display instead the auto-generated one. Pass empty string to hide the title element completely. */
  title: PropTypes.string,
  /** The sort input type as ButtonToggle */
  buttonToggle: PropTypes.shape(ButtonToggle.propTypes),
  /** The sort input type as SelectBox */
  selectBox: PropTypes.shape(SelectBox.propTypes),
  /** The array of tags and the tags callback functions */
  tags: PropTypes.shape(Tags.propTypes)
};

export default ResultsHeading;
