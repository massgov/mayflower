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
import InputDate from 'MayflowerReactForms/InputDate';

class DateRange extends React.Component {
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
