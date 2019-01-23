import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../atoms/icons/Icon';
import './style.css';

const CalloutAlert = (props) => {
  const calloutAlertClasses = classNames({
    'ma__callout-alert': true,
    [`ma__callout-alert--${props.theme}`]: props.theme
  });

  return(
    <div className={calloutAlertClasses}>
      <div className="ma__callout-alert__content">
        {
          props.icon && (
            <div className="ma__callout-alert__icon">
              <Icon {...props.icon} />
            </div>
          )
        }
        {props.children}
      </div>
    </div>
  );
};

CalloutAlert.propTypes = {
  icon: PropTypes.shape(Icon.propTypes),
  /** Themes correspond to site color scheme i.e. sass variables */
  theme: PropTypes.oneOf(['', 'c-primary-alt', 'c-highlight', 'c-gray-dark', 'c-error-red']),
  children: PropTypes.element
};

export default CalloutAlert;
