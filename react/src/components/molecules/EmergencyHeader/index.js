import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../atoms/icons/Icon';
import './style.css';

const EmergencyHeader = ({ emergencyHeader }) => (
  <h2 className="ma__emergency-header">
    <span className="ma__emergency-header__label">
      <Icon />
      {emergencyHeader.prefix ? (
        <span>{emergencyHeader.prefix}</span>
      ) : (
        <span>Emergency Alerts</span>
      )}
    </span>
    <span className="ma__emergency-header__title">{ emergencyHeader.title }</span>
  </h2>
);

EmergencyHeader.propTypes = {
  /** The emergency header object including a title and prefix  */
  emergencyHeader: PropTypes.shape({
    title: PropTypes.string,
    prefix: PropTypes.string
  })
};

export default EmergencyHeader;
