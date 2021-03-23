/**
 * InputTextFuzzy module.
 * @module @massds/mayflower-react/InputTextFuzzy
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-typeahead
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-fuzzy
 * @requires module:@massds/mayflower-assets/scss/01-atoms/helper-text
 */
import React from 'react';
import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import parse from 'autosuggest-highlight/parse';
import classNames from 'classnames';
import is from 'is';

import Label from '../Label';

class InputTextFuzzy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.selected || '',
      suggestions: []
    };
    const { fuseOptions } = this.props;
    fuseOptions.keys = this.props.keys;
    this.fuse = new Fuse(this.props.options, fuseOptions);
  }

  onSuggestionsFetchRequested = ({ value }) => {
    const suggestions = is.empty(value) ? this.optionsToSuggestions(this.props.options) : this.fuse.search(value);
    this.setState({
      suggestions
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion, method }) => {
    // invokes custom function if passed in the component
    if (is.fn(this.props.onSuggestionClick)) {
      event.persist();
      // Suggestion is an object that can contain info on score, matches, etc.
      this.props.onSuggestionClick(event, { suggestion, method, suggestions: this.state.suggestions });
    }
  }

  getSuggestionValue = (suggestion) => suggestion.item.text;

  handleChange = (event) => {
    if (event && event.persist) {
      event.persist();
    }

    const { value, method } = event.target;

    this.setState({
      value
    }, () => {
      if (is.fn(this.props.onChange)) {
        this.props.onChange({
          event, method, value, suggestions: this.state.suggestions
        });
      }
    });
  };

  handleBlur = (event) => {
    if (is.fn(this.props.onBlur)) {
      if (event && event.persist()) {
        event.persist();
      }
      this.props.onBlur({ event, value: this.state.value, suggestions: this.state.suggestions });
    }
  }

  // handleChange and onSuggestionSelected both do not fire when enter is hit.
  // This is a workaround for that. Use handleChange for keyboard presses.
  handleKeyPress = (event) => {
    const { value, suggestions } = this.state;
    if (is.fn(this.props.onKeyDown)) {
      this.props.onKeyDown(event);
    }
    const match = suggestions.find((el) => el.item.text === value);
    if (event.key === 'Enter') {
      event.persist();
      event.preventDefault();
      if (is.fn(this.props.onSuggestionClick) && match) {
        this.props.onSuggestionClick(event, { method: 'enter', suggestion: { item: { text: value } } });
      }
    }
  }

  handleFocus = (event) => {
    if (is.fn(this.props.onFocus)) {
      event.persist();
      this.props.onFocus(event, { event, value: this.state.value, suggestions: this.state.suggestions });
    }
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

  shouldRenderSuggestions = (value) => ((this.props.renderDefaultSuggestion === true) ? (value.trim().length >= 0) : (value.trim().length > 0))

  renderItem = (suggestion) => {
    const { item, matches } = suggestion;
    let renderItems = [];
    if (is.empty(this.state.value)) {
      renderItems = this.props.keys.map((key) => <span key={`${key}.suggestion_${item.optionIndex}`}>{item[key]}</span>);
    } else {
      matches.forEach((match) => {
        if (this.props.keys.indexOf(match.key) > -1) {
          // Add one to each range to get a proper highlight match.
          const ranges = match.indices.map((range) => {
            const [start, end] = range;
            return[
              start, Number(end) + 1
            ];
          });
          const parts = parse(match.value, ranges);
          renderItems = parts.filter((part) => part.text.length > 0).map((part, index) => {
            const className = part.highlight === true ? 'highlight' : null;
            const key = `${match.key}.suggestion_${index}`;
            return(<span className={className} key={key}>{part.text}</span>);
          });
        }
      });
    }
    return(
      <span className="ma__suggestion-content">
        <span className="ma__suggestion-content-name">
          {renderItems}
        </span>
      </span>
    );
  }

  renderItemsContainer = ({ children, containerProps }) => (<div className="ma__input-fuzzy" {...containerProps}>{children}</div>);

  render() {
    const {
      inputId, id, placeholder, disabled, label, boxed, autoFocusInput
    } = this.props;
    const autoProps = {
      suggestions: this.state.suggestions,
      renderSuggestionsContainer: this.renderItemsContainer,
      renderSuggestion: this.renderItem,
      onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.onSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      shouldRenderSuggestions: this.shouldRenderSuggestions,
      onSuggestionSelected: this.onSuggestionSelected,
      focusInputOnSuggestionClick: false,
      inputProps: {
        type: 'search',
        placeholder,
        onChange: this.handleChange,
        value: this.state.value,
        disabled,
        id: inputId,
        onFocus: this.handleFocus,
        autoFocus: autoFocusInput,
        onBlur: this.handleBlur,
        onKeyPress: this.handleKeyPress
      },
      id
    };

    const inputTextTypeAheadClasses = classNames({
      'ma__input-typeahead': true,
      'ma__input-typeahead--disabled': disabled,
      'ma__input-typeahead--boxed': boxed
    });
    return(
      <>
        {label && (
          <Label inputId={inputId} disabled={disabled}>
            {label}
          </Label>
        )}
        <div className={inputTextTypeAheadClasses}>
          <Autosuggest {...autoProps} />
        </div>
      </>
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
  /** The keys within options to use with search (part of fuseOptions). */
  keys: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])).isRequired,
  /** An array of objects representing all searchable values. */
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Any Fusejs options to override the default options set in this component.
   * API doc: https://fusejs.io/api/options.html
   *
  */
  /* eslint-disable-next-line  react/forbid-prop-types */
  fuseOptions: PropTypes.object,
  /** Disables input. */
  disabled: PropTypes.bool,
  /** Function that runs after changes to the input happen. */
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  /** Function that runs after a suggestion has been clicked. */
  onSuggestionClick: PropTypes.func,
  /** Custom keydown callback */
  onKeyDown: PropTypes.func,
  /** The default value for the select box. */
  selected: PropTypes.string,
  /** The id of the the input tag */
  inputId: PropTypes.string,
  /** By default all options will be rendered as suggestions on input focus */
  renderDefaultSuggestion: PropTypes.bool,
  /** Focus on typeahead input */
  autoFocusInput: PropTypes.bool
};

InputTextFuzzy.defaultProps = {
  fuseOptions: {
    /** Set the result list to sort by score. */
    shouldSort: true,
    /** Prevents matching from stopping at the first match found. */
    findAllMatches: true,
    /** Lets the matches found be included in the result set. This field must be true for the highlight to work. */
    includeMatches: true,
    /** Match sensitivity. 0 means what's been typed must be a perfect match, 1 means anything typed matches. */
    threshold: 0.3,
    /** Prevents matches against empty strings. */
    minMatchCharLength: 1,
    /** Allows more characters for long queries. */
    maxPatternLength: 300
  },
  autoFocusInput: false,
  disabled: false,
  boxed: false,
  renderDefaultSuggestion: true
};

export default InputTextFuzzy;
