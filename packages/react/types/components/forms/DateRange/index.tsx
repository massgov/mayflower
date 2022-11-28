// @ts-nocheck
/**
 * DateRange module.
 * @module @massds/mayflower-react/DateRange
 * @requires module:@massds/mayflower-assets/scss/02-molecules/date-range
 * @requires external:pikaday/scss/pikaday
 * @requires module:@massds/mayflower-assets/scss/00-base/pikaday
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-date
 */
import React from 'react';
import InputDate, { InputDateProps } from 'MayflowerReactForms/InputDate';

export interface DateRangeProps {
  /** The text label of the date range input */
  label: string
  /** The start date of your filter query, @forms/InputDate */
  startDate: InputDateProps
  /** The end date of your filter query, @forms/InputDate */
  endDate: InputDateProps
}

class DateRange extends React.Component<DateRangeProps> {
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

export default DateRange;
