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
  const [startDate, setStartDate] = React.useState(props.startDate.startDate);
  const [endDate, setEndDate] = React.useState(props.endDate.endDate);  
  const startOnChange = (date) => {
    setStartDate(date);
    if (is.function(props.startDate.onChangeCallback)) {
      props.startDate.onChangeCallback({ date });
    }
  };
  const endOnChange = (date) => {
    setEndDate(date);
    if (is.function(props.endDate.onChangeCallback)) {
      props.endDate.onChangeCallback({ date });
    }
  };
  return(
    <InputGroup {...props}>
      <div className="ma__date-range">
        <div className="ma__date-range__start js-filter-by-date-range__start">
          <MayflowerDate {...props.startDate} showError={props.startDate?.showError || props.showError} selectsStart selected={startDate} startDate={startDate} endDate={endDate} onChange={startOnChange} />
        </div>
        <div className="ma__date-range__divider">to</div>
        <div className="ma__date-range__end js-filter-by-date-range__end">
          <MayflowerDate {...props.endDate} showError={props.endDate?.showError || props.showError} selectsEnd selected={endDate} startDate={startDate} endDate={endDate} onChange={endOnChange} />
        </div>
      </div>
    </InputGroup>
  );
};

class DateRangeOld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <div className="ma__date-range">
        <fieldset>
          <legend className="ma__date-range__label">
            {this.props.label}
          </legend>
          <div className="ma__date-range__start js-filter-by-date-range__start">
            <InputDate {...this.props.startDate} />
          </div>
          <div className="ma__date-range__divider">to</div>
          <div className="ma__date-range__end js-filter-by-date-range__end">
            <InputDate {...this.props.endDate} />
          </div>
        </fieldset>
      </div>
    );
  }
}

DateRange.propTypes = {
  /** The text label of the date range input */
  label: PropTypes.string.isRequired,
  /** The start date of your filter query, @forms/InputDate */
  startDate: PropTypes.shape(InputDate.props).isRequired,
  /** The end date of your filter query, @forms/InputDate */
  endDate: PropTypes.shape(InputDate.props).isRequired
};

export default DateRange;
