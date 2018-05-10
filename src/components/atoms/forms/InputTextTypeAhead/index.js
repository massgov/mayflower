import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import parse from 'autosuggest-highlight/parse';
import PropTypes from 'prop-types';
import './style.css';

class InputTextTypeAhead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: props.options
    };
    this.selectTag = '';
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.selected });
    this.selectTag.selectedIndex = nextProps.options.findIndex((option) => option.text === nextProps.selected);
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
    const value = JSON.parse(JSON.stringify(this.state.value));
    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange,
      type: 'search'
    };
    const shouldRenderSuggestions = (x) => x.trim().length >= 0;
    const getSuggestionValue = (suggestion) => suggestion.text;
    const renderSuggestion = (suggestion, { query }) => {
      const suggestionText = `${suggestion.text}`;
      const re = new RegExp(query, 'i');
      const start = suggestionText.match(re) && suggestionText.match(re).index;
      const end = start && start > 0 ? (start + query.length) : query.length;
      const matches = (start >= 0 && end >= 0) ? ([[start, end]]) : [];
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
    return(
      <React.Fragment>
        {this.props.label && (<label htmlFor={this.props.id} className="ma__label">{this.props.label}</label>)}
        <div className="ma__input-typeahead">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            inputProps={inputProps}
            shouldRenderSuggestions={shouldRenderSuggestions}
            id={this.props.id}
            ref={(select) => { this.selectTag = select; }}
          />
        </div>
      </React.Fragment>
    );
  }
}

InputTextTypeAhead.propTypes = {
  /** The label text above the input text box */
  label: PropTypes.string,
  /** The placeholder text to appear in the input text box */
  placeholder: PropTypes.string.isRequired,
  /** The id of the typeahead element */
  id: PropTypes.string.isRequired,
  /** An array of options for the typeahead */
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string
    ]),
    text: PropTypes.oneOfType([
      PropTypes.string
    ])
  })),
  /** Custom change function */
  onChange: PropTypes.func,
  /** The default value for the select box */
  selected: PropTypes.string
};

export default InputTextTypeAhead;
