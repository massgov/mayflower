import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../atoms/icons/Icon';
import './style.css';

const CalloutAlert = (props) => {

  return(
    <div className={`ma__callout-alert`}>
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
  children: PropTypes.element
};

export default CalloutAlert;
