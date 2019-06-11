import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Icon from '../../icons/Icon';


const ButtonAlert = ({
  text, onClick, expanded, hideText, showText
}) => (
  <button className="ma__button-alert" onClick={onClick} expanded={expanded}>
    <span className="ma__button-alert__show">{showText}</span>
    <span className="ma__button-alert__hide">{hideText}</span>
    <Icon />
    {text}
  </button>
);

ButtonAlert.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  expanded: PropTypes.bool,
  showText: PropTypes.string,
  hideText: PropTypes.string
};

export default ButtonAlert;
