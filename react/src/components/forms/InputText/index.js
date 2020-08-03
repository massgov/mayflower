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
    name,
    id,
    type,
    placeholder,
    maxlength,
    pattern,
    width,
    required,
    defaultValue,
    showError
  } = props;
  const inputRef = React.useRef(ref);
  const inputClasses = classNames('ma__input', {
    'js-is-required': required,
    'ma__input--error': showError
  });
  return(
    <InputGroup {...props}>
      <input
        className={inputClasses}
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        data-type={type}
        maxLength={maxlength || null}
        pattern={pattern || null}
        style={width ? { width: `${width}px` } : null}
        onChange={props.onChange}
        required={required}
        ref={inputRef}
        defaultValue={defaultValue}
      />
    </InputGroup>
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

InputText.defaultProps = {
  hiddenLabel: false,
  required: false
};

export default InputText;
