/**
 * DateRange module.
 * @module @massds/mayflower-react/DateRange
 * @requires module:@massds/mayflower-assets/scss/02-molecules/date-range
 * @requires external:pikaday/scss/pikaday
 * @requires module:@massds/mayflower-assets/scss/00-base/pikaday
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-date
 */
import React from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import InputDate, { MayflowerDate } from 'MayflowerReactForms/InputDate';
import InputGroup from 'MayflowerReactForms/InputGroup';

const DateRange = (props) => {
  const {
    startDate = {
      inputProps: {
        required: false,
        format: 'M/dd/yyyy',
        restrict: ''
      },
      groupProps: {
        fieldset: true,
        showError: props.startDate?.groupProps?.showError || groupProps?.showError
      },
      defaultDate: null,
      startDate: null,
      endDate: null
    },
    endDate = {
      inputProps: {
        required: false,
        format: 'M/dd/yyyy',
        restrict: ''
      },
      groupProps: {
        showError: props.startDate?.groupProps?.showError || groupProps?.showError
      },
      defaultDate: null,
      startDate: null,
      endDate: null
    },
    inputProps = {},
    groupProps = {}
  } = props;
  const {
    disabled = false
  } = inputProps;
  const [startDateState, setStartDate] = React.useState(startDate.startDate);
  const [endDateState, setEndDate] = React.useState(endDate.endDate);
  const startOnChange = (date) => {
    setStartDate(date);
    if (is.function(startDate.onChange)) {
      startDate.onChange({ date });
    }
  };
  const endOnChange = (date) => {
    setEndDate(date);
    if (is.function(endDate.onChange)) {
      endDate.onChange({ date });
    }
  };
  const startProps = {
    ...startDate,
    selectsStart: true,
    inputProps: {
      ...startDate.inputProps,
      disabled: startDate?.inputProps?.disabled || disabled,
      selected: startDateState,
      onChange: startOnChange
    },
    startDate: startDateState,
    endDate: endDateState
  };
  const endProps = {
    ...endDate,
    inputProps: {
      ...endDate.inputProps,
      disabled: endDate?.inputProps?.disabled || disabled,
      onChange: endOnChange,
      selected: endDateState
    },
    selectsStart: true,
    startDate: startDateState,
    endDate: endDateState,
    selectsEnd: true
  };
  const inputGroupProps = {
    ...props,
    groupProps: {
      ...groupProps,
      fieldset: true
    }
  };
  return(
    <InputGroup {...inputGroupProps}>
      <div className="ma__date-range">
        <div className="ma__date-range__start js-filter-by-date-range__start">
          <MayflowerDate {...startProps} />
        </div>
        <div className="ma__date-range__divider">to</div>
        <div className="ma__date-range__end js-filter-by-date-range__end">
          <MayflowerDate {...endProps} />
        </div>
      </div>
    </InputGroup>
  );
};


DateRange.propTypes = {
  /** The text label of the date range input */
  labelText: PropTypes.string.isRequired,
  /** The start date of your filter query, @forms/InputDate */
  startDate: PropTypes.shape(InputDate.props).isRequired,
  /** The end date of your filter query, @forms/InputDate */
  endDate: PropTypes.shape(InputDate.props).isRequired
};

export default DateRange;
