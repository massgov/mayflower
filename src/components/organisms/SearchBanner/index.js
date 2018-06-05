import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FilterBox from '../../organisms/FilterBox';
import HeaderSearch from '../../molecules/HeaderSearch';
import SvgChevron from '../../atoms/icons/SvgChevron';
import Tabs from '../../molecules/Tabs';
// eslint-disable-next-line import/no-unresolved
import './style.css';

class SearchBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: this.props.searchBox.default,
      filterBoxExpanded: false
    };
    this.toggleFilterBox = this.toggleFilterBox.bind(this);
    this.filterBoxSubmitOnClick = this.filterBoxSubmitOnClick.bind(this);

    // Store the passed filterBox submit button click handler for future use.
    if (props.filterBox) {
      this.outerSubmitButtonOnClick = props.filterBox.submitButton.onClick;
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.searchInput !== nextProps.searchBox.defaultText) {
      const searchInput = nextProps.searchBox.defaultText;
      this.setState({ searchInput });
    }
  }
  toggleFilterBox() {
    this.setState((prevState) => ({ filterBoxExpanded: !prevState.filterBoxExpanded }));
  }
  filterBoxSubmitOnClick() {
    this.setState((prevState) => ({ filterBoxExpanded: !prevState.filterBoxExpanded }));
    if (this.props.filterBox) {
      this.outerSubmitButtonOnClick();
    }
  }
  render() {
    const { tabs, searchBox, filterBox } = this.props;
    if (filterBox) { filterBox.submitButton.onClick = this.filterBoxSubmitOnClick; }
    const toggleButtonClass = `ma__search-banner__filter-box-toggle ${this.state.filterBoxExpanded && 'ma__search-banner__filter-box-toggle--expanded'}`;
    return(
      <div className={`ma__search-banner__top ${!tabs && 'ma__search-banner__top--noTabs'}`}>
        <div className="main-content--two">
          <h2 className="visually-hidden">Search Form</h2>
          <HeaderSearch {...searchBox} />
        </div>
        {tabs && <Tabs {...tabs} />}
        {filterBox && (
          <div className="main-content--two ma__search-banner__filter-box-toggle-container">
            <button onClick={this.toggleFilterBox} type="button" className={toggleButtonClass}>
              More Filters
              <SvgChevron />
            </button>
          </div>
        )}
        {this.state.filterBoxExpanded && <FilterBox {...filterBox} />}
      </div>
    );
  }
}

SearchBanner.propTypes = {
  /** @molecules/HeaderSearch */
  searchBox: PropTypes.shape(PropTypes.HeaderSearch).isRequired,
  /** @molecules/Tabs */
  tabs: PropTypes.shape(PropTypes.Tabs),
  /** @organisms/FilterBox */
  filterBox: PropTypes.shape(PropTypes.FilterBox)
};

export default SearchBanner;
