import React from 'react';
import PropTypes from 'prop-types';
import ButtonCopy from '@massds/mayflower-react/dist/ButtonCopy';
import './_color-display.scss';

const ColorSwatch = ({
  name, value, variable, width = '200px', height = '4rem', copiable = true, inline = false
}) => {
  const hexValue = value.toUpperCase();
  return(
    <div style={{ display: 'flex', flexDirection: inline ? 'row' : 'column' }}>
      { name && <h6>{name}</h6>}
      <div
        className="sg-swatch"
        style={{
          background: value, borderRadius: 0, height, width, border: '1px solid #EEEEEE'
        }}
      />
      <div className="sg-info">
        <span>{hexValue}</span>
        {copiable && <ButtonCopy content={hexValue} />}
        {copiable && <br />}
        {variable && <span style={{ fontSize: '.9rem' }}>{variable}</span>}
      </div>
    </div>
  );
};

ColorSwatch.propTypes = {
  /** Color name */
  name: PropTypes.string,
  /** Color hex value */
  value: PropTypes.string,
  /** Color variable alias */
  variable: PropTypes.string,
  /** Whether to inline color swatch and hex code */
  inline: PropTypes.bool,
  /** Whether to add button copy */
  copiable: PropTypes.bool,
  /** Width of the color swatch */
  width: PropTypes.string,
  /** Height of the color swatch */
  height: PropTypes.string
};

const GradientTile = (props) => {
  const colorRef = React.useRef(null);
  const [rgb, setRgb] = React.useState('');
  React.useEffect(() => {
    const computedStyles = window.getComputedStyle(colorRef.current).getPropertyValue('background-color');
    setRgb(() => computedStyles);
  },[]);
  const hex = (x) => {
    const hexVal = Math.round(x).toString(16);
    return hexVal.length === 1 ? '0' + hexVal : hexVal;
  };
  const rgbToHex = (rgbVal) => {
    // Match color(srgb R G B)
    const rgbValues = rgbVal && rgbVal.match(/^color\(srgb\s*([\d.]+)\s*([\d.]+)\s*([\d.]+)\)$/);
    if (!rgbValues) return null;
  
    // Extract decimal floats
    const r = parseFloat(rgbValues[1]) * 255;
    const g = parseFloat(rgbValues[2]) * 255;
    const b = parseFloat(rgbValues[3]) * 255;
  
    // Convert to hex string
    return `#${hex(r)}${hex(g)}${hex(b)}`.toUpperCase();
  };
  const { index, effect } = props;
  const firstTile = index === 0;
  const name = firstTile ? props.name : `${index * 10} % ${effect}`;
  const hexValue = rgbToHex(rgb) ? rgbToHex(rgb).toUpperCase() : "";
  return(
    <li className={`${props.token}--${effect}`}>
      <h6>{name}</h6>
      <div className="sg-swatch" ref={colorRef} />
      <div className="sg-info">
        <span>{hexValue}</span>
        <ButtonCopy content={hexValue} />
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
  /** Base color SCSS variable name */
  token: PropTypes.string
};

const GradientSpectrum = ({ token, name, effect }) => {
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
        tilesArray.map((index) => <GradientTile key={`${token}${index}`} name={name} token={token} index={index} effect={effect} />)
      }
    </ul>
  );
};

GradientSpectrum.propTypes = {
  /** Color effect: tint or shade  */
  effect: PropTypes.string,
  /** Base color name */
  name: PropTypes.string,
  /** Base color SCSS variable alias */
  token: PropTypes.string
};

export { ColorSwatch, GradientSpectrum };
