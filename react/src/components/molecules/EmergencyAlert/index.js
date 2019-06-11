import React from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import './style.css';

const EmergencyAlert = (props) => {
  const { message, timeStamp, link } = props;
  return(
    <p className="ma__emergency-alert">
      <span className="ma__emergency-alert__message">
        {message}
        {(timeStamp) && (<span className="ma__emergency-alert__time-stamp">&nbsp;{timeStamp}</span>)}
      </span>
      {is.fn(link) && (
        <span className="ma__emergency-alert__link">
          &nbsp;{link()}
        </span>
      )}
    </p>
  );
};

EmergencyAlert.propTypes = {
  /** A message describing the event. */
  message: PropTypes.string.isRequired,
  /** A string representing the time of the event. */
  timeStamp: PropTypes.string,
  /** An optional function whose return value is a link to take the user to page with more information. */
  link: PropTypes.func
};

export default EmergencyAlert;
