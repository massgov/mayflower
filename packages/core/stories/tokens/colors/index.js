import React from 'react';
import PropTypes from 'prop-types';
import ButtonCopy from '@massds/mayflower-react/dist/ButtonCopy';

const ColorSwatch = ({ name, value, variable }) => {
  const hexValue = value.toUpperCase();
  return(
    <li style={{ width: 300, padding: 10 }}>
      <h6 className="ma__sidebar-heading">{name}</h6>
      <div className="sg-swatch" style={{ background: value, borderRadius: 0 }} />
      <div className="sg-info">
        <span>{hexValue}</span>
        <ButtonCopy content={hexValue} />
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
  const colorRef = React.useRef(null);
  const [rgb, setRgb] = React.useState('');
  React.useEffect(() => {
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
  let token;
  switch (name) {
    case props.name:
      token = `$${props.token}`;
      break;
    case '50 % tint':
      token = 'lighter';
      break;
    case '90 % tint':
      token = 'lightest';
      break;
    case '30 % shade':
      token = 'darker';
      break;
    case '50 % shade':
      token = 'darkest';
      break;
    default:
      token = '';
  }
  const hexValue = rgbToHex(rgb).toUpperCase();
  return(
    <li className={`${props.token}--${effect}`}>
      <h6 className="ma__sidebar-heading">{name}</h6>
      <div className="sg-swatch" ref={colorRef} />
      <div className="sg-info">
        <span>{hexValue}</span>
        <ButtonCopy content={hexValue} />
        <br />
        <code style={{ fontSize: '1rem' }}>{token}</code>
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
