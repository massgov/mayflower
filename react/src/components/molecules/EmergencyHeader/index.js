import React from 'react';
import PropTypes from 'prop-types';
import airbnbTypes from 'airbnb-prop-types';
import Icon from '../../atoms/icons/Icon';

import './style.css';

const EmergencyHeader = (props) => {
  const { title, icon, prefix } = props;
  const theme = props.theme.length === 0 ? 'c-highlight' : props.theme;
  const linkArgs = {
    theme,
    linkClasses: 'ma__content-link'
  };
  return(
    <h2 className={`ma__emergency-header ma__emergency-header--${theme}`}>
      <span className="ma__emergency-header__label">
        {icon}
        <span>{prefix}</span>
      </span>
      <span className="ma__emergency-header__title">{ title({ ...linkArgs }) }</span>
    </h2>
  );
};

EmergencyHeader.propTypes = {
  /** A function whose return value is displayed in the text to the right of the divider bar. */
  title: PropTypes.func.isRequired,
  /** A string that controls different color themes for the component. */
  theme: PropTypes.oneOf(['', 'c-highlight', 'c-primary-alt', 'c-primary', 'c-gray', 'c-error']),
  /** A SVG icon to display to the left of the prefix text. */
  icon: airbnbTypes.componentWithName('Icon'),
  /** An optional string displayed to the left of the divider bar. */
  prefix: PropTypes.string
};
EmergencyHeader.defaultProps = {
  theme: 'c-highlight',
  prefix: 'Emergency Alerts',
  icon: <Icon name="alert" />
};

export default EmergencyHeader;
