// @ts-nocheck
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
import classNames from 'classnames';
import ButtonToggle, { ButtonToggleProps } from 'MayflowerReactButtons/ButtonToggle';
import SelectBox, { SelectBoxProps } from 'MayflowerReactForms/SelectBox';
import Tags, { TagsProps } from 'MayflowerReactMolecules/Tags';

export interface ResultsHeadingProps {
  /** Custom class added to the root element. */
  className?: string
  /** The range of results being displayed, e.g. 1-10 */
  numResults?: string
  /** The total count of results */
  totalResults?: string
  /** The sort input type as ButtonToggle */
  buttonToggle?: ButtonToggleProps
  /** The sort input type as SelectBox */
  selectBox?: SelectBoxProps
  /** The array of tags and the tags callback functions */
  tags?: TagsProps
}

const ResultsHeading = (resultsHeading: ResultsHeadingProps) => {
  const classes = classNames(
    'ma__results-heading js-results-heading',
    resultsHeading.className
  );
  const resultsHeadingTotal = resultsHeading.totalResults ? ` of ${resultsHeading.totalResults} for: ` : '';
  const resultsHeadingTitle = `Showing results ${resultsHeading.numResults}${resultsHeadingTotal}`;
  const { tags } = resultsHeading;
  const selectBoxProps = resultsHeading.selectBox;
  const buttonToggleProps = resultsHeading.buttonToggle;
  return(
    <div className={classes}>
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

export default ResultsHeading;
