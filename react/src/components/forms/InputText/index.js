/**
 * InputText module.
 * @module @massds/mayflower-react/InputText
 * @requires module:@massds/mayflower-assets/scss/01-atoms/error-msg
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputGroup from 'MayflowerReactForms/InputGroup';

const InputText = React.forwardRef((props, ref) => {
  const {
    inputProps = {},
    groupProps = {}
  } = props;
  const {
    type,
    maxlength,
    width,
    required = false,
    disabled = false,
    defaultValue = '',
    className: inputClassName = null
  } = inputProps;
  const {
    showError = false
  } = groupProps;

  const inputRef = React.useRef(ref);
  const inputClasses = classNames(
    'ma__input',
    inputClassName,
    {
      'js-is-required': required,
      'ma__input--error': showError
    }
  );
  const inputElementProps = {
    ...inputProps,
    className: inputClasses,
    'data-type': type,
    required,
    ref: inputRef,
    disabled,
    defaultValue,
    maxLength: maxlength
  };
  if (width) {
    inputElementProps.style = {
      width: `${width}px`
    };
  }
  return(
    <input {...inputElementProps} />
  );
});

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
  /** Custom change function */
  onChange: PropTypes.func,
  /** Default input text value */
  defaultText: PropTypes.string
};

export default InputText;
