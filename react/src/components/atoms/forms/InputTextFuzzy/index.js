import React from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import Autowhatever from 'react-autowhatever';
import parse from 'autosuggest-highlight/parse';
import classNames from 'classnames';
import is from 'is';

import './style.css';

class InputTextFuzzy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.selected || '',
      suggestions: [],
      highlightedItemIndex: null
    };
    const fuseOptions = this.props.fuseOptions;
    fuseOptions.keys = this.props.keys;
    this.fuse = new Fuse(this.props.options, fuseOptions);
  }
  clearSuggestions = (event = null) => {
    this.setState({
      suggestions: [],
      highlightedItemIndex: null
    }, () => {
      if (event && is.fn(this.props.onSuggestionClick)) {
        this.props.onSuggestionClick(event, {
          suggestion: {
            item: { text: this.state.value }
          }
        });
      }
    });
  }
  optionsToSuggestions = (options) => {
    const suggestions = options.map((item) => ({
      item: {
        text: item.text,
        value: item.value
      },
      matches: [{
        indices: [],
        value: item.text,
        key: 'text',
        arrayIndex: 0
      }]
    }));
    return suggestions;
  }
  handleChange = (e) => {
    e.persist();
    const { value } = e.target;
    if (is.empty(value)) {
      const suggestions = this.optionsToSuggestions(this.props.options);
      if (this.props.renderDefaultSuggestion) {
        this.setState({
          suggestions,
          value: ''
        }, () => {
          if (is.fn(this.props.onChange)) {
            this.props.onChange({ event: e, value, suggestions });
          }
        });
      } else if (is.fn(this.props.onChange)) {
        this.props.onChange({ event: e, value, suggestions });
      }
    } else {
      const suggestions = this.fuse.search(value);
      this.setState({
        value,
        suggestions
      }, () => {
        if (is.fn(this.props.onChange)) {
          this.props.onChange({ event: e, value, suggestions });
        }
      });
    }
  };
  handleFocus = () => {
    if (this.props.renderDefaultSuggestion) {
      const suggestions = this.optionsToSuggestions(this.props.options);
      this.setState({
        suggestions
      });
    }
  }
  renderItem = (suggestion) => (
    <span className="ma__suggestion-content">
      <span className="ma__suggestion-content-name">
        {
              suggestion.matches.map((match) => {
                if (this.props.keys.indexOf(match.key) > -1) {
                  // Add one to each range to get a proper highlight match.
                  const ranges = match.indices.map((range) => [
                      range[0],
                      range[1] + 1
                    ]);
                  const parts = parse(match.value, ranges);
                  return parts.filter((part) => part.text.length > 0).map((part, index) => {
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
  renderItemsContainer = ({ children, containerProps }) => (<div className="ma__input-fuzzy" {...containerProps}>{children}</div>);
  render() {
    const autoProps = {
      items: this.state.suggestions,
      renderItemsContainer: this.renderItemsContainer,
      renderItem: this.renderItem,
      renderItemData: { value: this.state.value },
      inputProps: {
        type: 'search',
        placeholder: this.props.placeholder,
        onChange: this.handleChange,
        value: this.state.value,
        disabled: this.props.disabled,
        id: this.props.inputId,
        onFocus: this.handleFocus,
        onBlur: () => {
          this.clearSuggestions();
        },
        onKeyDown: (event, { newHighlightedItemIndex }) => {
          event.persist();
          switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
              event.preventDefault();
              this.setState((currentState) => {
                if (currentState.suggestions.length > 0) {
                  return{
                    highlightedItemIndex: !(newHighlightedItemIndex) ? 0 : newHighlightedItemIndex
                  };
                }
              });
              break;
            case 'Enter':
              // If there are suggestions and the user chose one.
              if (this.state.suggestions.length > 0 && this.state.highlightedItemIndex !== null && this.state.highlightedItemIndex > -1) {
                const suggestion = this.state.suggestions[this.state.highlightedItemIndex];
                this.setState({
                  value: suggestion.item.text,
                  suggestions: [],
                  highlightedItemIndex: null
                }, () => {
                  if (is.fn(this.props.onSuggestionClick)) {
                    // Suggestion is an object that can contain info on score, matches, etc.
                    this.props.onSuggestionClick(event, { suggestion });
                  }
                });
              } else {
                // Try to see if the typed in value is in the options array.
                const suggestion = this.props.options.find((option) => {
                  let match = false;
                  this.props.keys.forEach((key) => {
                    if (option[key] && option[key] === this.state.value) {
                      match = true;
                    }
                  });
                  return match;
                });
                if (suggestion) {
                  this.clearSuggestions(event);
                }
              }
              break;
            case 'Escape':
              this.setState({
                suggestions: [],
                highlightedItemIndex: null
              });
              break;
            default:
          }
        }
      },
      id: this.props.id
    };
    if (this.state.highlightedItemIndex !== null) {
      autoProps.highlightedItemIndex = this.state.highlightedItemIndex;
    }

    autoProps.itemProps = (props) => {
      const { itemIndex } = props;
      const suggestion = this.state.suggestions[itemIndex];
      return{
        'data-item-index': itemIndex,
        onMouseDown: (event) => {
          event.persist();
          this.setState({
            value: suggestion.item.text,
            suggestions: [],
            highlightedItemIndex: null
          }, () => {
            if (is.fn(this.props.onSuggestionClick)) {
              // Suggestion is an object that can contain info on score, matches, etc.
              this.props.onSuggestionClick(event, { suggestion });
            }
          });
        },
        onMouseEnter: () => {
          this.setState({
            highlightedItemIndex: itemIndex
          });
        },
        onMouseLeave: () => {
          this.setState({
            highlightedItemIndex: null
          });
        }
      };
    };
    const inputTextTypeAheadClasses = classNames({
      'ma__input-typeahead': true,
      'ma__input-typeahead--disabled': this.props.disabled,
      'ma__input-typeahead--boxed': this.props.boxed
    });
    return(
      <React.Fragment>
        {this.props.label && (<label htmlFor={this.props.inputId} className="ma__label">{this.props.label}</label>)}
        <div className={inputTextTypeAheadClasses}>
          <Autowhatever {...autoProps} />
        </div>
      </React.Fragment>
    );
  }
}

InputTextFuzzy.propTypes = {
  /** The id of the typeahead element. */
  id: PropTypes.string.isRequired,
  /** The label text above the input text box. */
  label: PropTypes.string,
  /** The placeholder text to appear in the input text box. */
  placeholder: PropTypes.string,
  /** Style the input with a box outline. */
  boxed: PropTypes.bool,
  /** The keys within options to use with search. */
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** An array of objects representing all searchable values. */
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Any Fusejs options to override the default options set in this component. */
  fuseOptions: PropTypes.object,
  /** Disables input. */
  disabled: PropTypes.bool,
  /** Function that runs after changes to the input happen. */
  onChange: PropTypes.func,
  /** Function that runs after a suggestion has been clicked. */
  onSuggestionClick: PropTypes.func,
  /** The default value for the select box. */
  selected: PropTypes.string,
  /** The id of the the input tag */
  inputId: PropTypes.string,
  /** By default all options will be rendered as suggestions on input focus */
  renderDefaultSuggestion: PropTypes.bool
};

InputTextFuzzy.defaultProps = {
  fuseOptions: {
    /** Set the result list to sort by score. */
    shouldSort: true,
    /** Prevents matching from stopping at the first match found. */
    findAllMatches: true,
    /** Lets the matches found be included in the result set. */
    includeMatches: true,
    /** Match sensitivity. 0 means what's been typed must be a perfect match, 1 means anything typed matches. */
    threshold: 0.3,
    /** Prevents matches against empty strings. */
    minMatchCharLength: 1
  },
  disabled: false,
  boxed: false,
  renderDefaultSuggestion: true
};

export default InputTextFuzzy;
