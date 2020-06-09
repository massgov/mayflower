/**
 * Tags module.
 * @module @massds/mayflower-react/Tags
 * @requires module:@massds/mayflower-assets/scss/02-molecules/tags
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-tag
 */
import React from 'react';
import PropTypes from 'prop-types';
import ButtonTag from 'MayflowerReactButtons/ButtonTag';

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags ? this.props.tags : null
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
      this.props.onClearThisCallback(event.target, event);
    }
  }

  render() {
    const { tags } = this.state;
    return(
      tags && (
      <div className="ma__tags">
        { tags.map((tag, tagIndex) => (
          <ButtonTag
            type={tag.type}
            value={tag.value}
            text={tag.text}
            handleClick={(e) => this.handleClearThis(e)}
            /* eslint-disable-next-line react/no-array-index-key */
            key={`resultsHeading.tag.${tagIndex}`}
          />
        ))}
        { tags.length > 1 && (
        <button type="button" className="ma__tags-clear js-results-heading-clear" onClick={() => this.handleClearAll()}>Clear all</button>
        )}
      </div>
      )
    );
  }
}

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

export default Tags;
