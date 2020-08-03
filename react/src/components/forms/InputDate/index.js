/**
 * InputDate module.
 * @module @massds/mayflower-react/InputDate
 * @requires module:pikaday/scss/pikaday
 * @requires module:@massds/mayflower-assets/scss/00-base/pikaday
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-date
 */
import React from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import InputGroup from 'MayflowerReactForms/InputGroup';

const InputDate = (props) => {
  const {
    defaultValue,
    startDate,
    endDate,
    onChangeCallback,
    ...rest
  } = props;
  const [state, setState] = React.useState({
    selected: defaultValue,
    startDate,
    endDate
  });
  const onChange = (date) => {
    const updatedState = {};
    if (is.array(date)) {
      const [start, end] = date;
      updatedState.selected = start;
      updatedState.startDate = start;
      updatedState.endDate = end;
    } else {
      updatedState.selected = date;
    }
    setState(updatedState);
    if (is.function(onChangeCallback)) {
      props.onChangeCallback(state);
    }
  };
  const dateProps = {
    ...rest,
    onChange,
    selected: state.selected
  };
  if (props.selectsRange) {
    dateProps.startDate = state.startDate;
    dateProps.endDate = state.endDate;
  }
  return(
    <MayflowerDate {...dateProps} />
  );
};

export const MayflowerDate = React.forwardRef((props, inputRef) => {
  const {
    selected,
    minDate,
    maxDate,
    selectsRange = false,
    selectsStart = false,
    selectsEnd = false,
    startDate,
    endDate,
    placeholder = null,
    name,
    id,
    disabled = false,
    format,
    required = false,
    onChange,
    showError = false
  } = props;
  // Triggers when a user selects a date in the picker only.
  const handleChange = (date) => {
    if (is.function(onChange)) {
      onChange(date);
    }
  };

  const inputClassNames = classNames('ma__input-date js-input-date', {
    'js-is-required': required,
    'ma__input--error': showError
  });
  const pickerProps = {
    selected,
    selectsRange,
    selectsStart,
    selectsEnd
  };
  if (is.date(minDate)) {
    pickerProps.minDate = minDate;
  }
  if (is.date(maxDate)) {
    pickerProps.maxDate = maxDate;
  }
  if (selectsEnd) {
    pickerProps.minDate = startDate;
  }
  if (is.date(startDate)) {
    pickerProps.startDate = startDate;
  }
  if (is.date(endDate)) {
    pickerProps.endDate = endDate;
  }
  return(
    <InputGroup {...props}>
      <DatePicker
        {...pickerProps}
        placeholderText={placeholder}
        name={name}
        id={id}
        disabled={disabled}
        dateFormat={format}
        required={required}
        className={inputClassNames}
        onChange={handleChange}
      />
    </InputGroup>
  );
});

class InputDateOld extends React.Component {
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
      <>
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
      </>
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
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
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
  startDate: null,
  endDate: null,
  format: 'M/dd/yyyy'
};

export default InputDate;
