// @ts-nocheck
/**
 * HeaderSearch module.
 * @module @massds/mayflower-react/HeaderSearch
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-typeahead
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import is from 'is';
import ButtonWithIcon, { ButtonWithIconProps } from 'MayflowerReactButtons/ButtonWithIcon';
import TypeAheadDropdown, { TypeAheadDropdownProps } from 'MayflowerReactForms/TypeAheadDropdown';
// eslint-disable-next-line import/no-unresolved
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';

export interface HeaderSearchProps {
  /** The ID for the input */
  id?: string
  /** The label text for the input */
  label?: string
  /** The placeholder text for the input */
  placeholder?: string
  /** The Search button */
  buttonSearch?: ButtonWithIconProps
  /** Custom submit function */
  onSubmit?(...args: unknown[]): unknown
  /** Custom change function for the text input */
  onChange?(...args: unknown[]): unknown
  /** Default input text value */
  defaultText?: string
  /** Render suggestions as passable element */
  suggestions?: React.ReactElement
  /** @molecules/TypeAheadDropdown */
  orgDropdown?: TypeAheadDropdownProps
  /** postInputFilter passable component */
  postInputFilter?: React.ReactElement
  /** A ref object as created by React.createRef(). Will be applied to the input element. */
  inputRef?: (...args: unknown[]) => unknown | {
    current?: object
  }
}

class HeaderSearch extends React.Component<HeaderSearchProps> {
  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultText };
  }

  handleChange = (event) => {
    const query = event.target.value;
    this.setState({ value: query });
    // invokes custom function if passed in the component
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(query);
    }
  }

  handleSubmit = (event) => {
    if (is.fn(this.props.onSubmit)) {
      this.props.onSubmit(event);
    }
  };

  render() {
    const headerSearch = { ...this.props };
    const orgDropdown = headerSearch.orgDropdown;
    const shouldShowTypeAhead = (orgDropdown && orgDropdown.dropdownButton && orgDropdown.inputText);
    const inputProps = {
      id: headerSearch.id,
      className: 'ma__header-search__input',
      placeholder: headerSearch.placeholder,
      onChange: this.handleChange,
      type: 'search',
      value: this.state.value
    };
    if (this.props.inputRef) {
      inputProps.ref = this.props.inputRef;
    }
    headerSearch.buttonSearch.icon = <IconSearch />;
    return(
      <div className="ma__header-search__wrapper ma__header-search__wrapper--responsive">
        {shouldShowTypeAhead
          && (
          <div className="ma__header-search__pre-filter">
            <TypeAheadDropdown {...orgDropdown} />
          </div>
          )}
        <div className="ma__header-search">
          <form action="#" className="ma__form" onSubmit={this.handleSubmit} role="search">
            <label
              htmlFor={headerSearch.id}
              className="ma__header-search__label"
            >
              {headerSearch.label}
            </label>
            <input {...inputProps} />
            {this.props.suggestions && this.props.suggestions}
            {this.props.postInputFilter && (
              <div className="ma__header-search__post-filter">
                {this.props.postInputFilter}
              </div>
            )}
            <ButtonWithIcon {...headerSearch.buttonSearch} />
          </form>
        </div>
      </div>
    );
  }
}

HeaderSearch.defaultProps = {
  id: 'header-search',
  label: 'Search terms',
  placeholder: 'Search Mass.gov',
  buttonSearch: {
    'aria-label': '',
    usage: 'secondary'
  }
};

export default HeaderSearch;
