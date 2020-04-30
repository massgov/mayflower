import React from 'react';
import PropTypes from 'prop-types';

import InputText from '../../forms/InputText';
import ButtonWithIcon from '../../atoms/buttons/ButtonWithIcon';

import './style.css';

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
