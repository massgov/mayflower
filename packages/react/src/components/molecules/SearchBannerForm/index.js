/**
 * SearchBannerForm module.
 * @module @massds/mayflower-react/SearchBannerForm
 * @requires module:@massds/mayflower-assets/scss/03-organisms/search-banner
 * @requires module:@massds/mayflower-assets/scss/01-atoms/error-msg
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-typeahead
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';

import InputText from 'MayflowerReactForms/InputText';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';

const SearchBannerForm = (searchBannerForm) => {
  let { classes = [] } = searchBannerForm.buttonSearch;
  classes = classes.concat(['ma__search-banner__button']);

  return(
    <form className="ma__search-banner__form" action={searchBannerForm.action} onSubmit={searchBannerForm.onSubmit}>
      <div className="ma__search-banner__input">
        <InputText {...searchBannerForm.inputText} />
      </div>
      <ButtonWithIcon {...searchBannerForm.buttonSearch} classes={classes} />
    </form>
  );
};

SearchBannerForm.propTypes = {
  /** The URL to submit form data to */
  action: PropTypes.string,
  /** Custom submit function */
  onSubmit: PropTypes.func,
  /** The properties for the text input field */
  inputText: PropTypes.shape(InputText.propTypes).isRequired,
  /** The Search button */
  buttonSearch: PropTypes.shape(ButtonWithIcon.propTypes).isRequired
};

export default SearchBannerForm;
