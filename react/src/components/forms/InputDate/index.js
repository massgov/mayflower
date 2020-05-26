import React from 'react';
import PropTypes from 'prop-types';
import Pikaday from 'pikaday';

import './style.scss';

class InputDate extends React.Component {
  constructor(props) {
    super(props);
    this.picker = null;
    this.startPikaday = this.startPikaday.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.startPikaday();
    this.picker.setDate(this.props.defaultDate, true);
  }
  componentWillReceiveProps(nextProps) {
    this.picker.setDate(nextProps.defaultDate, true);
  }
  handleChange(date) {
    if (typeof this.props.onChangeCallback === 'function') {
      this.props.onChangeCallback({ date });
    }
  }
  startPikaday() {
    const restrict = this.props.restrict;
    const pickerOptions = {
      field: this.dateInput,
      format: this.props.format,
      formatStrict: true,
      onSelect: this.handleChange,
      setDefaultDate: false
    };
    if (this.props.defaultDate !== null) {
      pickerOptions.defaultDate = this.props.defaultDate;
      pickerOptions.setDefaultDate = true;
    }
    this.picker = new Pikaday(pickerOptions);
    this.dateInput.setAttribute('type', 'text');
    if (restrict === 'max') {
      this.picker.setMaxDate(new Date());
    } else if (restrict === 'min') {
      this.picker.setMinDate(new Date());
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
          format={this.props.format}
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
  /** Controls the date format of input date . The current option are: 'M/DD/YYYY’, 'MM/DD/YYYY’', 'MMM D YYYY', or 'dddd, MMMM Do YYYY' */
  format: PropTypes.oneOf(['M/DD/YYYY', 'MM/DD/YYYY', 'MM-DD-YYYY', 'YYYYMMDD']),
  /** Custom onChange function that receives the selected date input */
  onChangeCallback: PropTypes.func,
  /** The date to set by default */
  defaultDate: PropTypes.instanceOf(Date)
};

// Only set defaults for the configuration variables which need to be opted in to activate.
InputDate.defaultProps = {
  required: false,
  restrict: '',
  defaultDate: null,
  format: 'M/DD/YYYY'
};

export default InputDate;
