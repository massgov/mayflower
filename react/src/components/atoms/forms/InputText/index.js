import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.css';

class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
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
    const inputText = this.props;
    const inputLabelClasses = classNames({
      ma__label: true,
      'ma__label--required': inputText.required,
      'ma__label--optional': !inputText.required,
      'ma__label--hidden': inputText.hiddenLabel
    });
    const inputClasses = classNames({
      ma__input: true,
      'js-is-required': inputText.required
    });
    return(
      <React.Fragment>
        {inputText.labelText &&
        <label
          htmlFor={inputText.id}
          className={inputLabelClasses}
        >
          {inputText.labelText}
        </label>}
        {inputText.errorMsg &&
        <div className="ma__error-msg">{inputText.errorMsg}</div>}
        <input
          className={inputClasses}
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
          value={this.state.value}
        />
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
