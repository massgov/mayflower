import React from 'react';
import PropTypes from 'prop-types';

import InputText from '../../atoms/forms/InputText';
import ButtonSearch from '../../atoms/buttons/ButtonSearch';

const SearchBannerForm = (searchBannerForm) => {
  let { classes = [] } = searchBannerForm.buttonSearch;
  classes = classes.concat(['ma__search-banner__button']);

  return(
    <form className="ma__search-banner__form" action={searchBannerForm.action} onSubmit={searchBannerForm.onSubmit}>
      <div className="ma__search-banner__input">
        <InputText {...searchBannerForm.inputText} />
      </div>
      <ButtonSearch {...searchBannerForm.buttonSearch} classes={classes} />
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
  buttonSearch: PropTypes.shape(ButtonSearch.propTypes).isRequired
};

export default SearchBannerForm;
