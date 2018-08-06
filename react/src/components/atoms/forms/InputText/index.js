import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.defaultText !== prevState.value) {
      return{
        value: nextProps.defaultText
      };
    }

    return null;
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.defaultText !== this.props.defaultText) {
  //     this.setState({
  //       value: this.props.defaultText
  //     });
  //   }
  // }

  handleChange(event) {
    const input = event.target.value;
    this.setState({ value: input });
    // invokes custom function if passed in the component
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(input);
    }
  }

  render() {
    const inputText = this.props;
    const inputLabelClass = ['ma__label'];
    if (inputText.labelText) {
      inputLabelClass.push(`ma__label--${inputText.required ? 'required' : 'optional'}`);
      if (inputText.hiddenLabel) {
        inputLabelClass.push('ma__label--hidden');
      }
      if (inputText.disabled) {
        inputLabelClass.push('ma__label--disabled');
      }
    }
    const inputClasses = ['ma__input'];
    if (inputText.required) {
      inputClasses.push('js-is-required');
    }
    if (inputText.errorDisplay) {
      inputClasses.push('has-error');
    }
    const errorClasses = ['ma__error-msg'];
    if (inputText.errorDisplay) {
      errorClasses.push('has-error');
    }
    const input =
      (<input
        className={inputClasses.join(' ')}
        name={inputText.name}
        id={inputText.id}
        type={inputText.type}
        placeholder={inputText.placeholder}
        data-type={inputText.type}
        maxLength={inputText.maxlength || null}
        pattern={inputText.pattern || null}
        style={inputText.width ? { width: `${inputText.width}px` } : null}
        onChange={this.handleChange}
        required={inputText.required}
        disabled={this.props.disabled}
        value={this.state.value}
      />);

    return(
      <React.Fragment>
        { inputText.labelText &&
        <label
          htmlFor={inputText.id}
          className={inputLabelClass.join(' ')}
        >
          {inputText.labelText}
        </label> }
        { inputText.errorMsg &&
        <div className={errorClasses.join(' ')}>{inputText.errorMsg}</div>}
        { inputText.type === 'number' ?
          <div className="ma__input-number">
            {input}
            <button type="button" aria-label="increase value" className="ma__input-number__plus" />
            <button type="button" aria-label="decrease value" className="ma__input-number__minus" />
          </div> :
          <React.Fragment>
            {input}
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

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
  /** Whether an error msg should be display or not. */
  errorDisplay: PropTypes.bool,
  /** Custom change function */
  onChange: PropTypes.func,
  /** Default input text value */
  defaultText: PropTypes.string,
  /** Whether the input is disabled or not */
  disabled: PropTypes.bool
};

InputText.defaultProps = {
  hiddenLabel: false,
  required: false
};

export default InputText;
