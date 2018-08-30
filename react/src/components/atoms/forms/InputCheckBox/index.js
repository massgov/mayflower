import React from 'react';
import PropTypes from 'prop-types';
// import './style.css';

class InputDate extends React.Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.id;
    this.setState({
      [id]: value
    });
  }

  return(

    <span className="ma__input-checkbox">
      <input
        type="checkbox"
        value={this.props.value}
        id={data.id}
        checked={!!data.checked}
      />
      {icon}
      <label htmlFor={data.id}>
        <span>{data.label}</span>
      </label>
    </span>
  );
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
