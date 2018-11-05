import React from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import Autowhatever from 'react-autowhatever';
import parse from 'autosuggest-highlight/parse';
import classNames from 'classnames';

import './style.css';

class InputTextFuzzy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.selected || '',
      suggestions: []
    };
    const fuseOptions = this.props.fuseOptions;
    fuseOptions.keys = this.props.keys;
    this.fuse = new Fuse(this.props.options, fuseOptions);
  }
  handleChange = (e) => {
    const suggestions = this.fuse.search(e.target.value);
    this.setState({
      value: e.target.value,
      suggestions
    });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(e);
    }
  };
  renderItem = (suggestion) => {
    return (
      <span className="suggestion-content">
          <span className="name">
            {
              suggestion.matches.map((match) => {
                if(this.props.keys.indexOf(match.key) > -1) {
                  // Add one to each range to get a proper highlight match.
                  const ranges = match.indices.map((range) => {
                    return [
                      range[0],
                      range[1] === range[0] ? range[1] : range[1] + 1
                    ]
                  });
                  const parts = parse(match.value, ranges);
                  return parts.filter(part => {
                    return part.text.length >= 1;
                  }).map((part, index) => {
                    const className = part.highlight ? 'highlight' : null;
                    const key = `${match.key}.suggestion_${index}`;
                    return(
                      <span className={className} key={key}>{part.text}</span>
                    );
                  });
                }
              })
            }
          </span>
        </span>
    );
  };
  renderItemsContainer = ({ children, containerProps }) => {
    return(<div className="ma__input-fuzzy" {...containerProps}>{children}</div>)
  };
  render() {
    const autoProps = {
      items: this.state.suggestions,
      renderItemsContainer: this.renderItemsContainer,
      renderItem: this.renderItem,
      renderItemData: { value: this.state.value },
      inputProps: {
        placeholder: this.props.placeholder,
        onChange: this.handleChange,
        value: this.state.value,
        disabled: this.props.disabled
      },
      id: this.props.id
    };
    autoProps.itemProps = (props) => {
      const { itemIndex } = props;
      const suggestion = this.state.suggestions[itemIndex];
      return {
        'data-item-index': itemIndex,
        onMouseDown: event => {
          this.setState({
            value: suggestion.item.text,
            suggestions: []
          });
          if (typeof this.props.onSuggestionClick === 'function') {
            // Suggestion is an object that can contain info on score, matches, etc.
            this.props.onSuggestionClick({event, suggestion});
          }
        }
      }
    };
    const inputTextTypeAheadClasses = classNames({
      'ma__input-typeahead': true,
      'ma__input-typeahead--disabled': this.props.disabled,
      'ma__input-typeahead--boxed': this.props.boxed,
    });
    return(
      <React.Fragment>
        {this.props.label && (<label htmlFor={this.props.id} className="ma__label">{this.props.label}</label>)}
        <div className={inputTextTypeAheadClasses}>
          <Autowhatever {...autoProps} />
        </div>
      </React.Fragment>
    );
  }
}

InputTextFuzzy.propTypes = {
  /** The id of the typeahead element */
  id: PropTypes.string.isRequired,
  /** The label text above the input text box */
  label: PropTypes.string,
  /** The placeholder text to appear in the input text box */
  placeholder: PropTypes.string,
  /** Style the input with a box outline */
  boxed: PropTypes.bool,
  /** The keys within options to use with search. */
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** An array of objects representing all searchable values. */
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Any Fusejs options to override the default options set in this component.*/
  fuseOptions: PropTypes.object,
  /** Disables input. */
  disabled: PropTypes.bool,
  /** Function that runs after changes to the input happen. */
  onChange: PropTypes.func,
  /** Function that runs after a suggestion has been clicked. */
  onSuggestionClick: PropTypes.func,
  /** The default value for the select box */
  selected: PropTypes.string,
};

InputTextFuzzy.defaultProps = {
  fuseOptions: {
    shouldSort: true,
    findAllMatches: true,
    includeMatches: true,
    threshold: 0.3,
    minMatchCharLength: 1
  },
  disabled: false,
  boxed: false
};

export default InputTextFuzzy;
