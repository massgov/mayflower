/**
 * EmergencyAlert module.
 * @module @massds/mayflower-react/EmergencyAlert
 * @requires module:@massds/mayflower-assets/scss/02-molecules/emergency-alert
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';

const EmergencyAlert = (props) => {
  const {
    message, timeStamp, link, theme
  } = props;
  const linkArgs = {
    theme,
    linkClasses: 'ma__content-link',
    TextElement: 'span'
  };
  const pClasses = classNames({
    'ma__emergency-alert': true,
    [`ma__emergency-alert--${theme}`]: theme
  });
  return(
    <p className={pClasses}>
      <span className="ma__emergency-alert__message">
        {message}
        {(timeStamp) && (<span className="ma__emergency-alert__time-stamp">&nbsp;{timeStamp}</span>)}
      </span>
      {is.fn(link) && (
        <span className="ma__emergency-alert__link">
          &nbsp;{link({ ...linkArgs })}
        </span>
      )}
    </p>
  );
};

EmergencyAlert.propTypes = {
  /** A string that controls different color themes for the component. */
  theme: PropTypes.oneOf(['c-warning', 'c-primary-alt', 'c-primary', 'c-gray', 'c-error']),
  /** A message describing the event. */
  message: PropTypes.string.isRequired,
  /** A string representing the time of the event. */
  timeStamp: PropTypes.string,
  /** An optional function whose return value is a link to take the user to page with more information. */
  link: PropTypes.func
};

EmergencyAlert.defaultProps = {
  theme: 'c-warning'
};

export default EmergencyAlert;
