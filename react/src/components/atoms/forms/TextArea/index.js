import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class TextArea extends React.Component {
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
    const labelClass = ['ma__label'];
    if (this.props.required) {
      labelClass.push('ma__label--required');
    } else {
      labelClass.push('ma__label--optional');
    }
    if (this.props.hiddenLabel) {
      labelClass.push('ma__label--hidden');
    }
    if (this.props.disabled) {
      labelClass.push('ma__label--disabled');
    }
    const maxlength = this.props.maxlength ? this.props.maxlength : false;
    const minlength = this.props.minlength ? this.props.minlength : false;
    const errorClasses = ['ma__error-msg'];
    const textClasses = [];
    if (this.props.errorDisplay) {
      errorClasses.push('has-error');
    }
    if (this.props.errorDisplay) {
      textClasses.push('has-error');
    }
    if (this.props.required) {
      textClasses.push('js-is-required');
    }
    return(
      <div className="ma__textarea">
        { this.props.labelText &&
          <label htmlFor="input-type-textarea"className={labelClass.join(' ')}>
            {this.props.labelText}
          </label>
        }
        {this.props.errorMsg &&
        <div className={errorClasses.join(' ')} htmlFor={this.props.id}>{this.props.errorMsg}</div>}
        <textarea
          className={textClasses.join(' ')}
          name={this.props.name}
          id={this.props.id}
          data-type={this.props.type}
          maxLength={maxlength}
          minLength={minlength}
          value={this.state.value}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          required={this.props.required}
        />
      </div>
    );
  }
}

TextArea.propTypes = {
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
  /** The number of characters wide to make the input field */
  onChange: PropTypes.func,
  /** Default input text value */
  defaultText: PropTypes.string,
  /** The min acceptable input length */
  minlength: PropTypes.number,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Display the Error Mesage or not. */
  errorDisplay: PropTypes.bool,
  /** Error Message content. */
  errorMsg: PropTypes.string,
  /** Disabled */
  disabled: PropTypes.bool
};

TextArea.defaultProps = {
  hiddenLabel: false,
  required: false
};

export default TextArea;
