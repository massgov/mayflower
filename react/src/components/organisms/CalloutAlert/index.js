import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../atoms/icons/Icon';
import './style.css';

const CalloutAlert = (calloutLink) => {

  return(
    <div className={`ma__callout-alert`}>
      <div className="ma__callout-alert__content">
        <div className="ma__callout-alert__icon">
          <Icon name="alert" />
        </div>
        {calloutLink.children}
      </div>
    </div>
  );
};

CalloutAlert.propTypes = {
};

export default CalloutAlert;
