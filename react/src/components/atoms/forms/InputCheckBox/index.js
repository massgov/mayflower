import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class InputCheckBox extends React.Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      selected: props.checked
    };
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.id]: target.value
    });
  }

  render() {
    const icon = this.props.icon ? this.props.icon : '';
    return (
      <span className="ma__input-checkbox">
        <input
          type="checkbox"
          value={this.props.value}
          id={this.props.id}
          checked={this.state.checked}
        />
        {icon}
        <label htmlFor={this.props.id}>
          <span>{this.props.label}</span>
        </label>
      </span>
    );
  }
}

InputCheckBox.propTypes = {
  /** Value to be passed by checkbox. */
  value: PropTypes.string.isRequired,
  /** ID of input. */
  id: PropTypes.string.isRequired,
  /** Icon */
  icon: PropTypes.object,
  /** Lable for input. */
  label: PropTypes.string.isRequired,
  /** Checked by default. */
  checked: PropTypes.bool,
}

InputCheckBox.defaultProps = {
  checked: false
}

export default InputCheckBox;
