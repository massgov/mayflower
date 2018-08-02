import React from 'react';
import PropTypes from 'prop-types';
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
    const { textArea } = this.props;
    const labelClasses = ['ma__label'];
    textArea.required ? labelClass.push('ma__label--required') : labelClass.push('ma__label--optional');
    textArea.hiddenLabel && labelClass.push('ma__label--hidden');
    return(
      { textarea.labelText && (
        <label
          for="input-type-textarea"
          className={labelClasses.join(' ')}
        >
          {textArea.labelText}
        </label>
        )
      }
<textarea
  class="{{ textarea.required ? 'js-is-required' : ''}}"
  name="{{ textarea.name }}"
  id="{{ textarea.id }}"
  data-type="{{ textarea.type }}"
  {% if textarea.maxlength %}
    maxlength="{{ textarea.maxlength }}"
  {% endif %}
  {{ textarea.required ? 'required' : '' }} /></textarea>
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
  errorDisplay: PropTypes.boolean,
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
