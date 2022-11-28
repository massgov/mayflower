// @ts-nocheck
/**
 * SearchBanner module.
 * @module @massds/mayflower-react/SearchBanner
 * @requires module:@massds/mayflower-assets/scss/01-atoms/forms
 * @requires module:@massds/mayflower-assets/scss/01-atoms/buttons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-typeahead
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 * @requires module:@massds/mayflower-assets/scss/02-molecules/tabs
 */
import React from 'react';
import classNames from 'classnames';

import FilterBox, { FilterBoxProps } from 'MayflowerReactOrganisms/FilterBox';
import HeaderSearch, { HeaderSearchProps } from 'MayflowerReactMolecules/HeaderSearch';
// eslint-disable-next-line import/no-unresolved
import IconChevron from 'MayflowerReactBase/Icon/IconChevron';
import Tabs, { TabsProps } from 'MayflowerReactMolecules/Tabs';

export interface SearchBannerProps {
  /** Custom class added to the root element. */
  className?: string
  /** `@molecules/HeaderSearch` */
  searchBox: HeaderSearchProps
  /** `@molecules/Tabs` */
  tabs?: TabsProps
  /** `@organisms/FilterBox` */
  filterBox?: FilterBoxProps
  /** filterbox toggle button custom function */
  toggleButtonOnClick?(...args: unknown[]): unknown
  /** Controls if filterBox is expanded */
  filterBoxExpanded?: boolean
  /** Controls if we allow filterbox toggle to render only on mobile */
  filterDesktopHidden?: boolean
  /** Filter box toggle button text */
  filterToggleText?: string
}

// eslint-disable-next-line import/no-unresolved

class SearchBanner extends React.Component<SearchBannerProps> {
  constructor(props) {
    super(props);
    this.state = {
      filterBoxExpanded: false
    };
    this.toggleFilterBox = this.toggleFilterBox.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
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
      tabs, searchBox, filterBox, filterToggleText, className
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
      'ma__search-banner__top--noTabs': !tabs,
      [`${className}`]: !!className
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
                <IconChevron width={20} height={20} />
              </button>
            </div>
          )}
          { filterBox && this.state.filterBoxExpanded && <FilterBox {...filterBox} submitButton={submitButton} /> }
        </div>
      </div>
    );
  }
}

SearchBanner.defaultProps = {
  filterDesktopHidden: false,
  filterToggleText: 'More Filters',
  filterBoxExpanded: false,
  filterBox: {
    id: 'filter-box'
  }
};

export default SearchBanner;
