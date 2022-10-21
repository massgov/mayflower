// @ts-nocheck
/**
 * InputText module.
 * @module @massds/mayflower-react/InputText
 * @requires module:@massds/mayflower-assets/scss/01-atoms/error-msg
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import ErrorMessage from 'MayflowerReactForms/ErrorMessage';

interface InputTextProps {
  /** Whether the label should be hidden or not */
  hiddenLabel?: boolean;
  /** The label text for the input field */
  labelText: string;
  /** Whether the field is required or not */
  required?: boolean;
  /** The unique ID for the input field */
  id: string;
  /** The name for the input field */
  name: string;
  /** The type of the input field */
  type: string;
  /** The max acceptable input length */
  maxlength?: number;
  /** The pattern to filter input against, e.g. "[0-9]" for numbers only */
  pattern?: string;
  /** The number of characters wide to make the input field */
  width?: number;
  /** The placeholder text for the input field */
  placeholder?: string;
  /** The message to be displayed in the event of an error */
  errorMsg?: string;
  /** Custom change function */
  onChange?(...args: unknown[]): unknown;
  /** Default input text value */
  defaultText?: string;
}

class InputText extends React.Component<InputTextProps> {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.defaultText });
  }

  handleChange(event) {
    const input = event.target.value;
    this.setState({ value: input });
    // invokes custom function if passed in the component
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(input);
    }
  }

  render() {
    const {
      name, id, type, placeholder, maxlength, pattern, width, required, labelText, hiddenLabel, errorMsg
    } = this.props;
    const inputLabelClasses = ['ma__label'];
    if (labelText) {
      inputLabelClasses.push(`ma__label--${required ? 'required' : 'optional'}`);
      if (hiddenLabel) {
        inputLabelClasses.push('ma__label--hidden');
      }
    }
    const inputClasses = ['ma__input'];
    if (required) {
      inputClasses.push('js-is-required');
    }
    return(
      <>
        {labelText
        && (
        <label
          htmlFor={id}
          className={inputLabelClasses.join(' ')}
        >
          {labelText}
        </label>
        )}
        <input
          className={inputClasses.join(' ')}
          name={name}
          id={id}
          type={type}
          placeholder={placeholder}
          data-type={type}
          maxLength={maxlength || null}
          pattern={pattern || null}
          style={width ? { width: `${width}px` } : null}
          onChange={this.handleChange}
          required={required}
          value={this.state.value}
        />
        {errorMsg
          && (<ErrorMessage error={errorMsg} inputId={id} />)}
      </>
    );
  }
}

InputText.defaultProps = {
  hiddenLabel: false,
  required: false
};

export default InputText;
