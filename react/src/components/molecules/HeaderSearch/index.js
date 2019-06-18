import React from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import { componentWithName } from 'airbnb-prop-types';
import ButtonWithIcon from '../../atoms/buttons/ButtonWithIcon';
import TypeAheadDropdown from '../../molecules/TypeAheadDropdown';
import './style.css';

class HeaderSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultText };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.defaultText });
  }

  handleChange(e) {
    const query = e.target.value;
    this.setState({ value: query });
    /**
       * Invokes a custom onChange function if passed.
       * @param {string} query - The current query string of the input.
    */
    if (this.props.onChange && is.fn(this.props.onChange)) {
      this.props.onChange(query);
    }
  }
  handleClick(e) {
    const event = e;
    if (this.props.buttonSearch && is.fn(this.props.buttonSearch.onClick)) {
      /**
       * Invokes a custom onClick function if passed to the buttonSearch component.
       * @param {object} event - The click event.
       * @param {string} query - The current query string input.
      */
      this.props.buttonSearch.onClick({ event, query: this.state.value });
    } else if (this.state.value && this.state.value.length > 0) {
      window.location.assign(`https://search.mass.gov/?q=${this.state.value}`);
    }
  }

  render() {
    const headerSearch = this.props;
    const orgDropdown = headerSearch.orgDropdown;
    const shouldShowTypeAhead = (orgDropdown && orgDropdown.dropdownButton && orgDropdown.inputText);
    const { onClick, ...buttonSearchRest } = headerSearch.buttonSearch;
    return(
      <div className="ma__header-search__wrapper ma__header-search__wrapper--responsive">
        {shouldShowTypeAhead &&
          <div className="ma__header-search__pre-filter">
            <TypeAheadDropdown {...orgDropdown} />
          </div>
        }
        <div className="ma__header-search">
          <form action="#" className="ma__form" onSubmit={headerSearch.onSubmit} role="search">
            <label
              htmlFor={headerSearch.id}
              className="ma__header-search__label"
            >{headerSearch.label}
            </label>
            <input
              id={headerSearch.id}
              className="ma__header-search__input"
              placeholder={headerSearch.placeholder}
              onChange={this.handleChange}
              type="search"
              value={this.state.value}
            />
            {this.props.suggestions && this.props.suggestions}
            {this.props.postInputFilter && (
              <div className="ma__header-search__post-filter">
                {this.props.postInputFilter}
              </div>
            )}
            <ButtonWithIcon
              onClick={(e) => this.handleClick(e)}
              {...buttonSearchRest}
            />
          </form>
        </div>
      </div>
    );
  }
}

HeaderSearch.propTypes = {
  /** The ID for the input */
  id: PropTypes.string,
  /** The label text for the input */
  label: PropTypes.string,
  /** The placeholder text for the input */
  placeholder: PropTypes.string,
  /** The Search button */
  buttonSearch: PropTypes.shape(ButtonWithIcon.propTypes),
  /** Custom submit function */
  onSubmit: PropTypes.func,
  /** Custom change function for the text input */
  onChange: PropTypes.func,
  /** Default input text value */
  defaultText: PropTypes.string,
  /** Render suggestions as passable element */
  suggestions: PropTypes.element,
  /** @molecules/TypeAheadDropdown */
  orgDropdown: PropTypes.shape(PropTypes.TypeAheadDropdown),
  /** postInputFilter passable component */
  postInputFilter: componentWithName('SelectBox')
};

HeaderSearch.defaultProps = {
  id: 'header-search',
  label: 'Search terms',
  placeholder: 'Search Mass.gov',
  buttonSearch: {
    ariaLabel: '',
    usage: 'secondary'
  }
};

export default HeaderSearch;
