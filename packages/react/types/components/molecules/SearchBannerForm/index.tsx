// @ts-nocheck
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

import InputText, { InputTextProps } from 'MayflowerReactForms/InputText';
import ButtonWithIcon, { ButtonWithIconProps } from 'MayflowerReactButtons/ButtonWithIcon';

export interface SearchBannerFormProps {
  /** The URL to submit form data to */
  action?: string
  /** Custom submit function */
  onSubmit?(...args: unknown[]): unknown
  /** The properties for the text input field */
  inputText: InputTextProps
  /** The Search button */
  buttonSearch: ButtonWithIconProps
}

const SearchBannerForm = (searchBannerForm: SearchBannerFormProps) => {
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

export default SearchBannerForm;
