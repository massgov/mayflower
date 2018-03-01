import React from 'react';
import PropTypes from 'prop-types';
import Pikaday from 'pikaday';

class InputDate extends React.Component {
  constructor(props) {
    super(props);
    this.startPikaday = this.startPikaday.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.startPikaday();
  }

  handleChange(date) {
    const newDate = (new Date(date)).toISOString().slice(0, 10).replace(/-/g, '');
    if (typeof this.props.onChangeCallback === 'function') {
      this.props.onChangeCallback({ newDate });
    }
  }

  startPikaday() {
    const restrict = this.props.restrict;
    const picker = new Pikaday({
      field: this.dateInput,
      format: 'MM/DD/YY',
      formatStrict: 'YYYMMDD',
      onSelect: this.handleChange
    });
    this.dateInput.setAttribute('type', 'text');

    if (restrict === 'max') {
      picker.setMaxDate(new Date());
    } else if (restrict === 'min') {
      picker.setMinDate(new Date());
    }
  }

  render() {
    const classNames = this.props.required ? 'ma__input-date js-input-date js-is-required' : 'ma__input-date js-input-date ';
    return(
      <React.Fragment>
        <label htmlFor={this.props.id}>{this.props.labelText}</label>
        <input
          className={classNames}
          name={this.props.name}
          id={this.props.id}
          type="date"
          placeholder={this.props.placeholder}
          data-type="date"
          data-restrict={this.props.restrict}
          ref={(input) => { this.dateInput = input; }}
          required={this.props.required}
        />
      </React.Fragment>
    );
  }
}

InputDate.propTypes = {
  /** The label text above the input field */
  labelText: PropTypes.string.isRequired,
  /** Whether an input date is required or not */
  required: PropTypes.bool,
  /** The id on the input date element */
  id: PropTypes.string.isRequired,
  /** The name of the input date element */
  name: PropTypes.string.isRequired,
  /** The placeholder text in the input box, prompting users for a value */
  placeholder: PropTypes.string,
  /** Controls whether the user can pick any date (''), today and prior ('max') or today and future ('min') */
  restrict: PropTypes.oneOf(['', 'max', 'min']),
  /** Custom onChange function that receives the selected date input */
  onChangeCallback: PropTypes.func
};

// Only set defaults for the configuration variables which need to be opted in to activate.
InputDate.defaultProps = {
  required: false,
  restrict: ''
};

export default InputDate;
