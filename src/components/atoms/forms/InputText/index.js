import React from 'react';
import PropTypes from 'prop-types';

const InputText = (inputText) => {
  const inputLabelClasses = ['ma__label'];
  if (inputText.labelText) {
    inputLabelClasses.push(`ma__label--${inputText.required ? 'required' : 'optional'}`);
    if (inputText.hiddenLabel) {
      inputLabelClasses.push('ma__label--hidden');
    }
  }
  const inputClasses = ['ma__input'];
  if (inputText.required) {
    inputClasses.push('js-is-required');
  }

  return(
    <div className={inputText.classes.join(' ') || null}>
      {inputText.labelText &&
      <label
        htmlFor={inputText.id}
        className={inputLabelClasses.join(' ')}
      >
        {inputText.labelText}
      </label>}
      {inputText.errorMsg &&
      <div className="ma__error-msg">{inputText.errorMsg}</div>}
      <input
        className={inputClasses.join(' ')}
        name={inputText.name}
        id={inputText.id}
        type={inputText.type}
        placeholder={inputText.placeholder || null}
        data-type={inputText.type}
        maxLength={inputText.maxlength || null}
        pattern={inputText.pattern || null}
        style={inputText.width ? { width: `${inputText.width}px` } : null}
        required={inputText.required}
      />
    </div>
  );
};

InputText.propTypes = {
  /** Whether the label should be hidden or not */
  hiddenLabel: PropTypes.bool,
  /** The label text for the input field */
  labelText: PropTypes.string.isRequired,
  /** Whether the field is required or not */
  required: PropTypes.bool,
  /** The unique ID for the input field */
  id: PropTypes.string.isRequired,
  /** The name for the input field */
  name: PropTypes.string.isRequired,
  /** The type of the input field */
  type: PropTypes.string.isRequired,
  /** The max acceptable input length */
  maxlength: PropTypes.number,
  /** The pattern to filter input against, e.g. "[0-9]" for numbers only */
  pattern: PropTypes.string,
  /** The number of characters wide to make the input field */
  width: PropTypes.number,
  /** The placeholder text for the input field */
  placeholder: PropTypes.string,
  /** The message to be displayed in the event of an error */
  errorMsg: PropTypes.string,
  /** Classes to be applied to the input wrapper */
  classes: PropTypes.arrayOf(PropTypes.string)
};

InputText.defaultProps = {
  hiddenLabel: false,
  required: false,
  classes: []
};

export default InputText;
