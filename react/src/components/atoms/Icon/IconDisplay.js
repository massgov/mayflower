import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from './index';
import './display.css';

const IconDisplay = (props) => {
  const { key, name } = props;
  const [copied, setCopied] = useState(false);
  const copyAction = () => {
    setCopied(true);
    navigator.clipboard.writeText(name);
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return() => clearTimeout(timer);
  };
  const copyButtonTitle = copied ? 'copied' : 'copy hex code';
  return(
    <li style={{ width: 300, margin: 10, padding: 10 }} key={`icon_${key}`} >
      <div className="sg-info">
        <Icon {...props} />
        <span>{name}</span>
      </div>
    </li>
  );
};

IconDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  svgWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  svgHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.arrayOf(PropTypes.string),
  ariaHidden: PropTypes.bool,
  fill: PropTypes.string
};

export default IconDisplay;
