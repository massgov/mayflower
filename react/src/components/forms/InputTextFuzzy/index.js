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
import InputGroup from 'MayflowerReactForms/InputGroup';

const InputTextFuzzy = (props) => {
  const optionsToSuggestions = (options) => options.map((item) => ({
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

  const [suggestions, setSuggestions] = React.useState(optionsToSuggestions(props.options));
  const [value, setValue] = React.useState(props.selected);
  const fuse = React.useMemo(() => new Fuse(props.options, Object.assign(props.fuseOptions, { keys: props.keys })), [props.fuseOptions]);

  const onSuggestionsFetchRequested = (fetchRequested) => {
    const updatedSuggestions = is.empty(fetchRequested.value) ? optionsToSuggestions(props.options) : fuse.search(fetchRequested.value);
    setSuggestions(updatedSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion, method }) => {
    // invokes custom function if passed in the component
    if (is.fn(props.onSuggestionClick)) {
      event.persist();
      // Suggestion is an object that can contain info on score, matches, etc.
      props.onSuggestionClick(event, { suggestion, method, suggestions });
    }
  };

  const getSuggestionValue = (suggestion) => suggestion.item.text;

  const handleChange = (event, { newValue, method }) => {
    // Only change value when not typing up and down.
    // This solves performance issues with suggestion rendering.
    if (!['up', 'down'].includes(method)) {
      setValue(newValue);
      if (is.fn(props.onChange)) {
        event.persist();
        props.onChange({
          event, method, value: newValue, suggestions
        });
      }
    }
  };

  const handleBlur = (event) => {
    if (is.fn(props.onBlur)) {
      event.persist();
      props.onBlur({ event, value, suggestions });
    }
  };

  // handleChange and onSuggestionSelected both do not fire when enter is hit.
  // This is a workaround for that. Use handleChange for keyboard presses.
  const handleKeyPress = (event) => {
    if (is.fn(props.onKeyDown)) {
      event.persist();
      props.onKeyDown(event);
    }
  };

  const handleFocus = (event) => {
    if (is.fn(props.onFocus)) {
      event.persist();
      props.onFocus(event, { event, value, suggestions });
    }
  };


  const shouldRenderSuggestions = (v) => {
    if (!is.string(v)) {
      return false;
    }
    return(props.renderDefaultSuggestion === true) ? v.trim().length >= 0 : v.trim().length > 0;
  };
  const renderItem = (suggestion, { query }) => {
    const { item, matches } = suggestion;
    let renderItems = [];
    if (is.empty(value)) {
      renderItems = props.keys.map((key) => <span key={`${key}.suggestion_${item.optionIndex}`}>{item[key]}</span>);
    } else {
      const matchLength = matches.length;
      for (let i = 0; i < matchLength; i++) {
        const match = matches[i];
        // Add one to each range to get a proper highlight match.
        const ranges = match.indices.map((range) => {
          const [start, end] = range;
          return[
            start, Number(end) + 1
          ];
        });
        const parts = parse(match.value, ranges);
        const partsLength = parts.length;
        for (let j = 0; j < partsLength; j++) {
          const index = j;
          const part = parts[j];
          if (part.text.length > 0) {
            const className = part.highlight === true ? 'highlight' : null;
            const key = `${match.key}.suggestion_${index}`;
            renderItems.push(<span className={className} key={key}>{part.text}</span>);
          }
        }
      }
    }
    return(
      <span className="ma__suggestion-content">
        <span className="ma__suggestion-content-name">
          {renderItems}
        </span>
      </span>
    );
  };

  const renderItemsContainer = ({ children, containerProps }) => (<div className="ma__input-fuzzy" {...containerProps}>{children}</div>);
  const {
    inputId,
    id,
    placeholder,
    disabled,
    labelText,
    boxed,
    autoFocusInput,
    required,
    inline,
    showError,
    errorMsg,
    hiddenLabel
  } = props;
  const autoProps = {
    suggestions,
    renderSuggestionsContainer: renderItemsContainer,
    renderSuggestion: renderItem,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    getSuggestionValue,
    shouldRenderSuggestions,
    onSuggestionSelected,
    focusInputOnSuggestionClick: false,
    inputProps: {
      required,
      type: 'search',
      placeholder,
      onChange: handleChange,
      disabled,
      id: inputId,
      onFocus: handleFocus,
      autoFocus: autoFocusInput,
      onBlur: handleBlur,
      onKeyPress: handleKeyPress,
      value
    },
    id
  };

  const inputTextTypeAheadClasses = classNames({
    'ma__input-typeahead': true,
    'ma__input-typeahead--disabled': disabled,
    'ma__input-typeahead--boxed': boxed
  });

  const inputGroupProps = {
    ...autoProps.inputProps,
    inline,
    labelText,
    showError,
    errorMsg,
    hiddenLabel
  };
  return(
    <InputGroup {...inputGroupProps}>
      <div className={inputTextTypeAheadClasses}>
        <Autosuggest {...autoProps} />
      </div>
    </InputGroup>
  );
};

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
    /** Lets the matches found be included in the result set. */
    includeMatches: true,
    /** Match sensitivity. 0 means what's been typed must be a perfect match, 1 means anything typed matches. */
    threshold: 0.3,
    /** Prevents matches against empty strings. */
    minMatchCharLength: 1,
    /** Allows more characters for long queries. */
    maxPatternLength: 300
  },
  selected: '',
  autoFocusInput: false,
  disabled: false,
  boxed: false,
  renderDefaultSuggestion: true
};

export default InputTextFuzzy;
