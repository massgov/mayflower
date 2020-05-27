import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class InputTextTypeAhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: (props.clearInputTextTypeAheadSelected || !props.selected) ? '' : props.selected,
      suggestions: []
    };
    this.selectTag = '';
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    if (process.env.NODE_ENV === 'development') {
      /* eslint-disable-next-line no-console */
      console.warn('This component is deprecated and will be archived in v10. Use InputTextFuzzy instead.');
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.selected });
    this.selectTag.selectedIndex = nextProps.options.findIndex((option) => option.text === nextProps.selected);
  }
  onKeyDown(event) {
    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(event);
    }
  }
  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
    if (newValue.length === 0 && (typeof this.props.onChange === 'function')) {
      // Change the filter back to "" if the user clears the typeahead input.
      const suggestion = { text: '', value: '' };
      this.props.onChange(event, { suggestion });
    }
  }
  onBlur(event) {
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event);
    }
  }
  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }
  onSuggestionSelected(event, { suggestion }) {
    // invokes custom function if passed in the component
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event, { suggestion });
    }
  }
  getSuggestions(value) {
    const escapeRegexCharacters = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp(`${escapedValue}`, 'i');
    const { options } = this.props;
    if (escapedValue === '') {
      return options;
    }
    return options.filter((item) => regex.test(item.text));
  }

  render() {
    const { suggestions } = this.state;
    const {
      boxed, id, label, placeholder, autoFocusInput, disabled
    } = this.props;
    const value = JSON.parse(JSON.stringify(this.state.value));
    const inputProps = {
      value,
      onKeyDown: this.onKeyDown,
      onChange: this.onChange,
      onBlur: this.onBlur,
      type: 'search',
      autoFocus: autoFocusInput,
      placeholder,
      disabled
    };
    const shouldRenderSuggestions = (x) => x.trim().length >= 0;
    const getSuggestionValue = (suggestion) => suggestion.text;
    const renderSuggestion = (suggestion, { query }) => {
      const suggestionText = `${suggestion.text}`;
      const matches = match(suggestionText, query);
      const parts = parse(suggestionText, matches);
      return(
        <span className="suggestion-content">
          <span className="name">
            {
            parts.map((part, index) => {
              const className = part.highlight ? 'highlight' : null;
              const key = `suggestion_${index}`;
              return(
                <span className={className} key={key}>{part.text}</span>
              );
            })
            }
          </span>
        </span>
      );
    };
    const inputTextTypeAheadClasses = classNames({
      'ma__input-typeahead': true,
      'ma__input-typeahead--boxed': boxed,
      'ma__input-typeahead--disabled': disabled
    });
    return(
      <React.Fragment>
        {label && (<label htmlFor={id} className="ma__label">{label}</label>)}
        <div className={inputTextTypeAheadClasses}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            inputProps={inputProps}
            shouldRenderSuggestions={shouldRenderSuggestions}
            id={id}
            ref={(select) => { this.selectTag = select; }}
          />
        </div>
      </React.Fragment>
    );
  }
}

InputTextTypeAhead.propTypes = {
  /** Style the input with a box outline */
  boxed: PropTypes.bool,
  /** The label text above the input text box */
  label: PropTypes.string,
  /** The placeholder text to appear in the input text box */
  placeholder: PropTypes.string.isRequired,
  /** The id of the typeahead element */
  id: PropTypes.string.isRequired,
  /** An array of options for the typeahead */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })),
  /** Custom keydown callback */
  onKeyDown: PropTypes.func,
  /** Custom change function */
  onChange: PropTypes.func,
  /** Custom blur handler function */
  onBlur: PropTypes.func,
  /** The default value for the select box */
  selected: PropTypes.string,
  /** Focus on typeahead input */
  autoFocusInput: PropTypes.bool,
  clearInputTextTypeAheadSelected: PropTypes.bool,
  disabled: PropTypes.bool
};

InputTextTypeAhead.defaultProps = {
  autoFocusInput: false,
  clearInputTextTypeAheadSelected: false,
  disabled: false
};

export default InputTextTypeAhead;
