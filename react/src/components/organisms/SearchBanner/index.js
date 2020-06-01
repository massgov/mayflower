import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FilterBox from 'MayflowerReactOrganisms/FilterBox';
import HeaderSearch from 'MayflowerReactMolecules/HeaderSearch';
import Icon from 'MayflowerReactBase/Icon';
import Tabs from 'MayflowerReactMolecules/Tabs';
// eslint-disable-next-line import/no-unresolved

class SearchBanner extends React.Component {
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

    if (filterBox && filterBox.submitButton) {
      const outerClickHandler = filterBox.submitButton.onClick;
      submitButton = {
        ...filterBox.submitButton,
        onClick: (e) => {
          this.toggleFilterBox();
          outerClickHandler(e);
        }
      };
    }
    const searchBannerClasses = classNames({
      'ma__search-banner__top': true,
      'ma__search-banner__top--noTabs': !tabs
    });
    const toggleButtonClasses = classNames({
      'ma__search-banner__filter-box-toggle': true,
      'ma__search-banner__filter-box-toggle--expanded': this.state.filterBoxExpanded,
      'ma__search-banner__filter-box-toggle--desktop-hidden': this.props.filterDesktopHidden
    });
    return(
      <div className={searchBannerClasses}>
        <div className="main-content--two">
          <h2 className="visually-hidden">Search Form</h2>
          <HeaderSearch {...searchBox} />
        </div>
        {tabs && <Tabs {...tabs} />}
        <div className="ma_search-banner__filter-box-container">
          {filterBox && (
            <div className="main-content--two ma__search-banner__filter-box-toggle-container">
              <button
                onClick={this.toggleFilterBox}
                type="button"
                className={toggleButtonClasses}
                aria-controls={this.props.filterBox.id}
                aria-expanded={this.state.filterBoxExpanded}
              >
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
  filterToggleText: 'More Filters',
  filterBoxExpanded: false,
  filterBox: {
    id: 'filter-box'
  }
};

export default SearchBanner;
