import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderSearch from '../../molecules/HeaderSearch';
import Tabs from '../../molecules/Tabs';
// eslint-disable-next-line import/no-unresolved
import './style.css';

class SearchBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: this.props.searchBox.default
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.searchInput !== nextProps.searchBox.defaultText) {
      const searchInput = nextProps.searchBox.defaultText;
      this.setState({ searchInput });
    }
  }
  render() {
    const { tabs, searchBox } = this.props;
    return(
      <div className="ma__search-banner__top">
        <div className="main-content--two">
          <h2 className="visually-hidden">Search Form</h2>
          <HeaderSearch {...searchBox} />
        </div>
        {tabs && <Tabs {...tabs} />}
      </div>
    );
  }
}

SearchBanner.propTypes = {
  /** @molecules/HeaderSearch */
  searchBox: PropTypes.shape(PropTypes.HeaderSearch).isRequired,
  /** @molecules/Tabs */
  tabs: PropTypes.shape(PropTypes.Tabs)
};

export default SearchBanner;
