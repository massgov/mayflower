import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../base/Icon';
import './styles.css';

const ColorSwatch = ({ name, value, variable }) => {
  const [copied, setCopied] = useState(false);
  const hexValue = value.toUpperCase();
  const copyAction = () => {
    setCopied(true);
    navigator.clipboard.writeText(hexValue);
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return() => clearTimeout(timer);
  };
  const copyButtonTitle = copied ? 'copied' : 'copy hex code';
  return(
    <li style={{ width: 300, margin: 10, padding: 10 }}>
      <h3 className="ma__sidebar-heading">{name}</h3>
      <div className="sg-swatch" style={{ background: value, borderRadius: 0 }} />
      <div className="sg-info">
        <span>{hexValue}</span>
        { navigator && navigator.clipboard && (
          <button
            onClick={copyAction}
            title={copyButtonTitle}
            aria-label={copyButtonTitle}
          >
            { copied ? <Icon name="inputsuccess" svgWidth={16} svgHeight={16} /> : <Icon name="copy" svgWidth={16} svgHeight={16} />}
          </button>
        )}
        <br />
        <code style={{ fontSize: '1rem' }}>{variable}</code>
      </div>
    </li>
  );
};

ColorSwatch.propTypes = {
  /** Color name */
  name: PropTypes.string,
  /** Color hex value */
  value: PropTypes.string,
  /** Color variable alias */
  variable: PropTypes.string
};

const GradientTile = (props) => {
  const colorRef = useRef(null);
  const [rgb, setRgb] = useState('');
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const computedStyles = window.getComputedStyle(colorRef.current).getPropertyValue('background-color');
    setRgb(() => computedStyles);
  });
  const hex = (x) => `0${Number(x).toString(16)}`.slice(-2);
  const rgbToHex = (rgbVal) => {
    const rgbValues = rgbVal && rgbVal.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    const hexValue = rgbValues && `#${hex(rgbValues[1])}${hex(rgbValues[2])}${hex(rgbValues[3])}`;
    return hexValue;
  };
  const { index, effect } = props;
  const firstTile = index === 0;
  const name = firstTile ? props.name : `${index * 10} % ${effect}`;
  const variable = firstTile ? `$${props.variable}` : '';
  const hexValue = rgbToHex(rgb).toUpperCase();
  const copyAction = () => {
    setCopied(true);
    navigator.clipboard.writeText(hexValue);
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return() => clearTimeout(timer);
  };
  const copyButtonTitle = copied ? 'copied' : 'copy hex code';
  return(
    <li className={`${props.variable}--${effect}`}>
      <h3 className="ma__sidebar-heading">{name}</h3>
      <div className="sg-swatch" ref={colorRef} />
      <div className="sg-info">
        <span>{hexValue}</span>
        { navigator && navigator.clipboard && (
          <button
            onClick={copyAction}
            title={copyButtonTitle}
            aria-label={copyButtonTitle}
          >
            { copied ? <Icon name="inputsuccess" svgWidth={16} svgHeight={16} /> : <Icon name="copy" svgWidth={16} svgHeight={16} />}
          </button>
        )}
        <br />
        <code style={{ fontSize: '1rem' }}>{variable}</code>
      </div>
    </li>
  );
};

GradientTile.propTypes = {
  /** Gradient index, used to determine the percentage of the effect */
  index: PropTypes.number,
  /** Color effect: tint or shade  */
  effect: PropTypes.string,
  /** Base color name */
  name: PropTypes.string,
  /** Base color variable alias */
  variable: PropTypes.string
};

const GradientSpectrum = ({ variable, name, effect }) => {
  const tiles = effect === 'tint' ? 10 : 6;
  let i;
  const tilesArray = [];
  for (i = 0; i < tiles; i += 1) {
    tilesArray.push(i);
  }
  return(
    <ul className="sg-colors sg-colors--gradient">
      {
        // eslint-disable-next-line react/no-array-index-key
        tilesArray.map((index) => <GradientTile key={`${variable}${index}`} name={name} variable={variable} index={index} effect={effect} />)
      }
    </ul>
  );
};

GradientSpectrum.propTypes = {
  /** Color effect: tint or shade  */
  effect: PropTypes.string,
  /** Base color name */
  name: PropTypes.string,
  /** Base color variable alias */
  variable: PropTypes.string
};

export { ColorSwatch, GradientSpectrum };
