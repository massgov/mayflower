import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from './index';
import './display.css';

const IconDisplay = (props) => {
  const { name, random } = props;
  const [copied, setCopied] = useState(false);
  const copyAction = () => {
    setCopied(true);
    navigator.clipboard.writeText(name);
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return() => clearTimeout(timer);
  };
  // useEffect(() => {
  //   setCopied('')
  // }, [random])
  //console.log(`${name}${random}`)
  const copyButtonTitle = copied ? 'copied' : 'copy hex code';
  return(
    <li style={{ width: 180, margin: 10, padding: 10 }}>
      <div className="sg-icons-info">
        <Icon {...props} key={`${name}${random}`} />
        <div>
          <span>{name}</span>
          { navigator && navigator.clipboard && (
            <button
              onClick={copyAction}
              title={copyButtonTitle}
              aria-label={copyButtonTitle}
            >
              { copied ? <Icon name="inputsuccess" svgWidth={16} svgHeight={16} /> : <Icon name="copy" svgWidth={16} svgHeight={16} />}
            </button>
          )}
        </div>
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
