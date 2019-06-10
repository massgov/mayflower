import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Icon from '../../icons/Icon';


const ButtonAlert = ({
  text, onClick, expanded, expandedText
}) => (
  <button className="ma__button-alert" onClick={onClick} expanded={expanded}>
    {expanded && (
      <div>{expandedText}</div>
    )}
    <Icon />
    {text}
  </button>
);

ButtonAlert.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  expanded: PropTypes.bool,
  expandedText: PropTypes.element
};

export default ButtonAlert;
