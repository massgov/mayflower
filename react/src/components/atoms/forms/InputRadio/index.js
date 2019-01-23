import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.css';

class InputRadio extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const selected = event.target.value;
    const value = this.props.value;
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(selected, value, event);
    }
  }

  render() {
    const radioClasses = classNames({
      'ma__input-radio': true,
      'ma__input-radio--outline': this.props.outline
    });
    return(
      <div className={radioClasses}>
        <input
          checked={this.props.checked}
          name={this.props.name}
          type="radio"
          value={this.props.value}
          id={this.props.id}
          required={this.props.required}
          onChange={this.handleChange}
          disabled={this.props.disabled}
        />
        <label htmlFor={this.props.id}>
          <span>{this.props.label}</span>
        </label>
      </div>
    );
  }
}

InputRadio.propTypes = {
  /** The name of the input radio. */
  name: PropTypes.string.isRequired,
  /** The id of the input radio. */
  id: PropTypes.string.isRequired,
  /** The value of the input radio */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** The input radio label */
  label: PropTypes.string.isRequired,
  /** Whether the input radio is checked or not  */
  checked: PropTypes.bool,
  /** Whether radio input is required or not */
  required: PropTypes.bool,
  /** Whether you want the radio input outlined */
  outline: PropTypes.bool,
  /** OnChange function */
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

InputRadio.defaultProps = {
  outline: false,
  required: false,
  onChange: () => {},
  disabled: false
};

export default InputRadio;
