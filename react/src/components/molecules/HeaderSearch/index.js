import React from 'react';
import PropTypes from 'prop-types';
import ButtonWithIcon from '../../atoms/buttons/ButtonWithIcon';
import TypeAheadDropdown from '../../molecules/TypeAheadDropdown';
import componentPropTypeCheck from '../../utilities/componentPropTypeCheck';
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

  handleChange(event) {
    const query = event.target.value;
    this.setState({ value: query });
    // invokes custom function if passed in the component
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(query);
    }
  }

  render() {
    const headerSearch = this.props;
    const orgDropdown = headerSearch.orgDropdown;
    const shouldShowTypeAhead = (orgDropdown && orgDropdown.dropdownButton && orgDropdown.inputText);
    return(
      <div className="ma__header-search__wrapper ma__header-search__wrapper--responsive">
        {shouldShowTypeAhead &&
          <div className="ma__header-search__pre-filter">
            <TypeAheadDropdown {...orgDropdown} />
          </div>
        }
        <section className="ma__header-search">
          <form action="#" className="ma__form" onSubmit={headerSearch.onSubmit}>
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
            <div className="ma__header-search__post-filter">
              {this.props.postInputFilter}
            </div>
            <ButtonWithIcon {...headerSearch.buttonSearch} />
          </form>
        </section>
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
  postInputFilter: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'SelectBox')
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
