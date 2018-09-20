import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FilterBox from '../../organisms/FilterBox';
import HeaderSearch from '../../molecules/HeaderSearch';
import Icon from '../../atoms/icons/Icon';
import Tabs from '../../molecules/Tabs';
// eslint-disable-next-line import/no-unresolved
import './style.css';

class SearchBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBoxExpanded: false
    };
    this.toggleFilterBox = this.toggleFilterBox.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { filterBoxExpanded } = nextProps;
    if (this.state.filterBoxExpanded !== filterBoxExpanded) {
      this.setState({ filterBoxExpanded });
    }
  }
  toggleFilterBox() {
    this.setState((prevState) => ({ filterBoxExpanded: !prevState.filterBoxExpanded }));
    if (typeof this.props.toggleButtonOnClick === 'function') {
      this.props.toggleButtonOnClick(this.state.filterBoxExpanded);
    }
  }
  render() {
    const {
      tabs, searchBox, filterBox, filterToggleText
    } = this.props;
    let submitButton;

    if (filterBox) {
      const outerClickHandler = filterBox.submitButton.onClick;
      submitButton = {
        ...filterBox.submitButton,
        onClick: (e) => {
          this.toggleFilterBox();
          outerClickHandler(e);
        }
      };
    }
    const filterExpanded = this.state.filterBoxExpanded ? ' ma__search-banner__filter-box-toggle--expanded' : '';
    const filterDesktopHidden = this.props.filterDesktopHidden ? ' ma__search-banner__filter-box-toggle--desktop-hidden' : '';
    const toggleButtonClass = `ma__search-banner__filter-box-toggle${filterExpanded}${filterDesktopHidden}`;
    return(
      <div className={`ma__search-banner__top ${!tabs && 'ma__search-banner__top--noTabs'}`}>
        <div className="main-content--two">
          <h2 className="visually-hidden">Search Form</h2>
          <HeaderSearch {...searchBox} />
        </div>
        {tabs && <Tabs {...tabs} />}
        <div className="ma_search-banner__filter-box-container">
          {filterBox && (
            <div className="main-content--two ma__search-banner__filter-box-toggle-container">
              <button onClick={this.toggleFilterBox} type="button" className={toggleButtonClass}>
                {filterToggleText}
                <Icon name="chevron" svgWidth={20} svgHeight={20} />
              </button>
            </div>
          )}
          { filterBox && this.state.filterBoxExpanded && <FilterBox {...filterBox} submitButton={submitButton} /> }
        </div>
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
  filterBox: PropTypes.shape(PropTypes.FilterBox),
  /** filterbox toggle button custom function */
  toggleButtonOnClick: PropTypes.func,
  /** Controls if filterBox is expanded */
  filterBoxExpanded: PropTypes.bool,
  /** Controls if we allow filterbox toggle to render only on mobile */
  filterDesktopHidden: PropTypes.bool,
  /** Filter box toggle button text */
  filterToggleText: PropTypes.string
};

SearchBanner.defaultProps = {
  filterDesktopHidden: false,
  filterToggleText: 'More Filters'
};

export default SearchBanner;
