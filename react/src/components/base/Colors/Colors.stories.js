import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import { themeColors, grayScaleColors, utilityColors } from './colors.json';

import './styles.css';

const Color = ({ color, value, name }) => {
  return (
    <li style={{ width: 300, margin: 20, padding: 10 }}>
      <h3 className="ma__sidebar-heading">{color}</h3>
      <div className="sg-swatch" style={{ background: value, borderRadius: 0 }} />
      <div className="sg-info">
        <span>{value}</span>
        <br />
        <code style={{ fontSize: '1rem' }}>{name}</code>
      </div>
    </li>
  );
};

storiesOf('base', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Colors', (() => {
      return(
        <Fragment>
          <ul className="sg-colors">
            {
              themeColors.map((color) => <Color {...color} />)
            }
          </ul>
          <ul className="sg-colors">
            {
              grayScaleColors.map((color) => <Color {...color} />)
            }
          </ul>
          <ul className="sg-colors">
            {
              utilityColors.map((color) => <Color {...color} />)
            }
          </ul>
        </Fragment>
      );
    }));
