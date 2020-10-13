/**
 * EventTime module.
 * @module @massds/mayflower-react/EventTime
 * @requires module:@massds/mayflower-assets/scss/01-atoms/event-time
 */
import React from 'react';
import PropTypes from 'prop-types';
import parse from 'react-html-parser';

const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour12: true,
  hour: 'numeric',
  minute: 'numeric'
});
const dateFormat = new Intl.DateTimeFormat('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

const EventTime = (props) => {
  const { startDate, endDate, details } = props;
  return(
    <span className="ma__event-time">
      <div className="ma__event-time__calendar">
        <div className="ma__event-time__date">{dateFormat.format(startDate)}</div>
        <div className="ma__event-time__time">
          {`${timeFormat.format(startDate)} - ${timeFormat.format(endDate)}`}
        </div>
      </div>
      { details && (
        <p className="ma__contact__details">{parse(details)}</p>
      )}
    </span>
  );
};

EventTime.propTypes = {
  /** The start date of the event. */
  startDate: PropTypes.instanceOf(Date).isRequired,
  /** The end date of the event. */
  endDate: PropTypes.instanceOf(Date).isRequired,
  /** Details around the event. */
  details: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default EventTime;
