import React, { Fragment, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import SidebarHeading from '../../atoms/headings/SidebarHeading';
import Icon from '../../atoms/icons/Icon';
import { themeColors, grayScaleColors, utilityColors, primaryColors, primaryAltColors, highLightColors } from './colors.json';
import ColorGradientsDocs from './ColorGradients.md';

import './styles.css';

const Color = ({ name, value, variable }) => {
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

Color.propTypes = {
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

storiesOf('base/colors', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Colors', (() => (
    <Fragment>
      <SidebarHeading title="Mayflower Brand Colors" level={2} />
      <ul className="sg-colors">
        {
          // eslint-disable-next-line react/no-array-index-key
          themeColors.map((color, i) => <Color key={`themeColors${i}`} {...color} />)
        }
      </ul>
      <SidebarHeading title="Gray Scale Colors" level={2} />
      <ul className="sg-colors">
        {
          // eslint-disable-next-line react/no-array-index-key
          grayScaleColors.map((color, i) => <Color key={`grayScaleColors${i}`} {...color} />)
        }
      </ul>
      <SidebarHeading title="Utility Colors" level={2} />
      <ul className="sg-colors">
        {
          // eslint-disable-next-line react/no-array-index-key
          utilityColors.map((color, i) => <Color key={`utilityColors${i}`} {...color} />)
        }
      </ul>
      <SidebarHeading title="Theme Color Usage" level={2} />
      <ul className="sg-colors">
        {
          // eslint-disable-next-line react/no-array-index-key
          primaryColors.map((color, i) => <Color key={`primaryColors${i}`} {...color} />)
        }
      </ul>
      <ul className="sg-colors">
        {
          // eslint-disable-next-line react/no-array-index-key
          primaryAltColors.map((color, i) => <Color key={`primaryAltColors${i}`} {...color} />)
        }
      </ul>
      <ul className="sg-colors">
        {
          // eslint-disable-next-line react/no-array-index-key
          highLightColors.map((color, i) => <Color key={`highLightColors${i}`} {...color} />)
        }
      </ul>
    </Fragment>
  )))
  .add(
    'Gradients (Light)', (() => (
      <Fragment>
        {
          themeColors.map(({ variable, name }, i) => {
            const props = {
              variable: variable.match(/\$(.*)/)[1],
              name,
              effect: 'tint'
            };
            return(
              // eslint-disable-next-line react/no-array-index-key
              <GradientSpectrum {...props} key={`spectrum_${variable}${i}`} />
            );
          })
        }
      </Fragment>
    )),
    { info: ColorGradientsDocs }
  )
  .add(
    'Gradients (Dark)', (() => (
      <Fragment>
        {
          themeColors.map(({ variable, name }, i) => {
            const props = {
              variable: variable.match(/\$(.*)/)[1],
              name,
              effect: 'shade'
            };
            return(
              // eslint-disable-next-line react/no-array-index-key
              <GradientSpectrum {...props} key={`spectrum_${variable}${i}`} />
            );
          })
        }
      </Fragment>
    )),
    { info: ColorGradientsDocs }
  );
