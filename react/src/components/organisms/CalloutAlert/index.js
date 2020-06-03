/**
 * CalloutAlert module.
 * @module @massds/mayflower-react/CalloutAlert
 * @requires module:@massds/mayflower-assets/scss/03-organisms/callout-alert
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from 'MayflowerReactBase/Icon';

const CalloutAlert = (props) => {
  const calloutAlertClasses = classNames({
    'ma__callout-alert': true,
    [`ma__callout-alert--${props.theme}`]: props.theme
  });

  const calloutAlertContentClasses = classNames({
    'ma__callout-alert__content': true,
    'ma__callout-alert__content--no-icon': !(props.icon && props.icon.name)
  });

  return(
    <div className={calloutAlertClasses}>
      <div className={calloutAlertContentClasses}>
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
  theme: PropTypes.oneOf(['', 'c-primary', 'c-primary-alt', 'c-highlight', 'c-gray-dark', 'c-error-red']),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
};

CalloutAlert.defaultProps = {
  icon: { name: 'alert' }
};

export default CalloutAlert;
