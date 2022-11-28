// @ts-nocheck
/**
 * CalloutAlert module.
 * @module @massds/mayflower-react/CalloutAlert
 * @requires module:@massds/mayflower-assets/scss/03-organisms/callout-alert
 */
import React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line import/no-unresolved
import * as Icon from 'MayflowerReactBase/Icon';

export interface CalloutAlertProps {
  icon?: {
    name?: string
    title?: string
    width?: string | number
    height?: string | number
    className?: string
    fill?: string
  }
  /** Themes correspond to site color scheme i.e. sass variables */
  theme?: "" | "c-primary" | "c-primary-alt" | "c-highlight" | "c-gray-dark" | "c-error-red"
  children?: React.ReactElement | unknown[]
}

const CalloutAlert = (props: CalloutAlertProps) => {
  const calloutAlertClasses = classNames({
    'ma__callout-alert': true,
    [`ma__callout-alert--${props.theme}`]: props.theme
  });

  const calloutAlertContentClasses = classNames({
    'ma__callout-alert__content': true,
    'ma__callout-alert__content--no-icon': !(props.icon && props.icon.name)
  });
  const IconComponent = props?.icon?.name ? Icon[props.icon.name] : null;

  return(
    <div className={calloutAlertClasses}>
      <div className={calloutAlertContentClasses}>
        {
          props?.icon?.name && (
            <div className="ma__callout-alert__icon">
              <IconComponent {...props.icon} />
            </div>
          )
        }
        {props.children}
      </div>
    </div>
  );
};

CalloutAlert.defaultProps = {
  icon: { name: 'IconAlert' }
};

export default CalloutAlert;
