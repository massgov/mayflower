import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Icon from '../../icons/Icon';


const ButtonAlert = ({
  text, onClick, expanded
}) => (
  <button className="ma__button-alert" onClick={onClick} expanded={expanded}>
    {expanded ? (
      <span className="ma__button-alert__show">Show</span>
    ) : (
      <span className="ma__button-alert__hide">Hide</span>
    )}
    <Icon />
    {text}
  </button>
);

ButtonAlert.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  expanded: PropTypes.bool
};

export default ButtonAlert;
