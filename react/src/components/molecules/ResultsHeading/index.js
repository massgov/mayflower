import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withContext from 'react-context-consumer-hoc';
import ButtonToggle from '../../atoms/buttons/ButtonToggle';
import SelectBox from '../../atoms/forms/SelectBox';
import ResultsHeadingContext, { withResultsHeading } from './context';

import './style.css';

class Tags extends Component {
  constructor(props) {
    super(props);
    const tags = props.resultsHeading ? props.resultsHeading.tagsProps.tags || props.tags : this.props.tags || null;
    this.state = {
      tags
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ tags: nextProps.tags });
  }
  handleClearAll() {
    if (typeof this.props.onClearCallback === 'function') {
      this.props.onClearCallback();
    }
    this.setState({ tags: null });
  }
  handleClearThis(event) {
    if (typeof this.props.onClearThisCallback === 'function') {
      this.props.onClearThisCallback(event.target);
    }
  }
  render() {
    const { tags } = this.state;
    return(
      tags && (
      <div className="ma__results-heading__tags">
        { tags.map((tag, tagIndex) => (
          <button
            type="button"
            className="ma__results-heading__tag js-results-heading-tag"
            data-ma-filter-type={tag.type}
            data-ma-filter-value={tag.value}
            key={`resultsHeading.tag.${tagIndex}`}
            onClick={(e) => this.handleClearThis(e)}
          >
            {tag.text}
          </button>
           ))}
        { tags.length > 1 && (
        <button type="button" className="ma__results-heading__clear js-results-heading-clear" onClick={() => this.handleClearAll()}>Clear all</button>
          )}
      </div>)
    );
  }
}

const ResultsHeading = (resultsHeading) => {
  const resultsHeadingTotal = resultsHeading.totalResults ? ` of ${resultsHeading.totalResults} for: ` : '';
  const resultsHeadingTitle = `Showing results ${resultsHeading.numResults}${resultsHeadingTotal}`;
  const { tags } = resultsHeading;
  const selectBoxProps = resultsHeading.selectBox;
  const buttonToggleProps = resultsHeading.buttonToggle;
  const contextProps = {
    tagsProps: tags,
    selectBoxProps
  };
  const ResultsHeadingTag = withResultsHeading(Tags, tags);
  const ResultsHeadingSelectBox = withResultsHeading(SelectBox, selectBoxProps);
  return(
    <ResultsHeadingContext.Provider value={contextProps}>
      <div className="ma__results-heading js-results-heading">
        <div className="ma__results-heading__container">
          <div className="ma__results-heading__title">
            {resultsHeadingTitle}
          </div>
          {tags && (<ResultsHeadingTag />) }
          { selectBoxProps && (
            <div className="ma__results-heading__sort ma__results-heading__sort-selecBox">
              <ResultsHeadingSelectBox />
            </div>
            )
          }
          { buttonToggleProps && (
            <div className="ma__results-heading__sort">
              <ButtonToggle {...buttonToggleProps} />
            </div>
           )
          }
        </div>
      </div>
    </ResultsHeadingContext.Provider>
  );
};

ResultsHeading.propTypes = {
  /** The range of results being displayed, e.g. 1-10 */
  numResults: PropTypes.string,
  /** The total count of results */
  totalResults: PropTypes.string,
  /** The sort input type as ButtonToggle */
  buttonToggle: PropTypes.shape(ButtonToggle.propTypes),
  /** The sort input type as SelectBox */
  selectBox: PropTypes.shape(SelectBox.propTypes),
  /** The array of tags and the tags callback functions */
  tags: PropTypes.shape(Tags.propTypes)
};

Tags.propTypes = {
  /** The tags applied to the search list
        type: The type of tag
        text: The text displayed by the tag (required)
        value: The value of the tag  */
  tags: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    value: PropTypes.string
  })),
  /** Custom onClick function that triggers when 'Clear all' button is clicked */
  onClearCallback: PropTypes.func,
  /** Custom onClick function that triggers when a tag is clicked */
  onClearThisCallback: PropTypes.func
};

export default ResultsHeading;
