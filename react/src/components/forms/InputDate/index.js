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
    startDate = null,
    endDate = null,
    selectsRange = false,
    inputProps = {},
    ...rest
  } = props;
  const {
    selected = null,
    onChange = null
  } = inputProps;
  const [state, setState] = React.useState({
    selected,
    startDate,
    endDate
  });
  const onChangeCallback = (date) => {
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
    if (is.function(onChange)) {
      onChange(state);
    }
  };
  const dateProps = {
    ...rest,
    inputProps: {
      onChange: onChangeCallback,
      selected: state.selected
    }
  };
  if (selectsRange) {
    dateProps.startDate = state.startDate;
    dateProps.endDate = state.endDate;
  }
  return(
    <MayflowerDate {...dateProps} />
  );
};

export const MayflowerDate = (props) => {
  const {
    minDate,
    maxDate,
    selectsRange = false,
    selectsStart = false,
    selectsEnd = false,
    startDate,
    endDate,
    inputProps = {},
    groupProps = {}
  } = props;
  const {
    disabled = false,
    format,
    placeholder = null,
    name,
    id,
    required = false,
    onChange,
    selected
  } = inputProps;
  const {
    showError = false
  } = groupProps;
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
};

MayflowerDate.propTypes = {
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
  /** For DateRange, sets which date input is the start field. */
  selectsStart: PropTypes.bool,
  /** For DateRange, sets which date input is the end field. */
  selectsEnd: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  /** Toggles on ranged date mode. */
  selectsRange: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  /** Controls the date format of input date . The current option are: 'M/DD/YYYY’, 'MM/DD/YYYY’', 'MMM D YYYY', or 'dddd, MMMM Do YYYY' */
  format: PropTypes.oneOf(['M/DD/YYYY', 'MM/DD/YYYY', 'MM-DD-YYYY', 'YYYYMMDD']),
  /** Custom onChange function that receives the selected date input */
  onChangeCallback: PropTypes.func,
  /** The date to set by default */
  selected: PropTypes.instanceOf(Date)
};

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
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  /** Toggles on ranged date mode. */
  selectsRange: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  /** Controls the date format of input date . The current option are: 'M/DD/YYYY’, 'MM/DD/YYYY’', 'MMM D YYYY', or 'dddd, MMMM Do YYYY' */
  format: PropTypes.oneOf(['M/DD/YYYY', 'MM/DD/YYYY', 'MM-DD-YYYY', 'YYYYMMDD']),
  /** Custom onChange function that receives the selected date input */
  onChangeCallback: PropTypes.func,
  /** The date to set by default */
  selected: PropTypes.instanceOf(Date)
};

export default InputDate;
