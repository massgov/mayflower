import React from 'react';
import PropTypes from 'prop-types';

import ButtonSearch from '../../atoms/buttons/ButtonSearch';

const HeaderSearch = (headerSearch) => (
  <section className="ma__header-search">
    <form action="#" className="ma__form js-header-search-form" onSubmit={headerSearch.onSubmit}>
      <label
        htmlFor={headerSearch.id}
        className="ma__header-search__label"
      >{headerSearch.label}
      </label>
      <input
        id={headerSearch.id}
        className="ma__header-search__input"
        placeholder={headerSearch.placeholder}
        onChange={headerSearch.onChange}
        type="text"
      />
      <ButtonSearch {...headerSearch.buttonSearch} />
    </form>
  </section>
);

HeaderSearch.propTypes = {
  /** The ID for the input */
  id: PropTypes.string,
  /** The label text for the input */
  label: PropTypes.string,
  /** The placeholder text for the input */
  placeholder: PropTypes.string,
  /** The Search button */
  buttonSearch: PropTypes.shape(ButtonSearch.propTypes),
  /** Custom submit function */
  onSubmit: PropTypes.func,
  /** Custom change function for the text input */
  onChange: PropTypes.func
};

HeaderSearch.defaultProps = {
  id: 'header-search',
  label: 'Search terms',
  placeholder: 'Search Mass.gov',
  buttonSearch: {}
};

export default HeaderSearch;
