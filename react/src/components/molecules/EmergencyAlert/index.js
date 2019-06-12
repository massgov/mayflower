import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';
import './style.css';

const EmergencyAlert = (props) => {
  const { message, timeStamp, link, theme } = props;
  const paragraphClasses = classNames({
    'ma__emergency-alert': true,
    [`ma__emergency-alert--${theme}`]: theme && theme.length > 0
  });
  const linkArgs = {
    theme,
    linkClasses: 'ma__content-link ma__content-link--chevron',
    TextElement: 'span'
  };
  return(
    <p className={paragraphClasses}>
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
  theme: PropTypes.oneOf(['', 'c-primary-alt', 'c-warning', 'c-gray-dark']),
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
