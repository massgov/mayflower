import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import SidebarHeading from '../../atoms/headings/SidebarHeading/index';

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

const GradientTile = ({ color, value, name, index }) => {
  return (
    <li className="title tile--tint">
      <h3 className="ma__sidebar-heading">{`${color} ${index * 10} %`}</h3>
      <div className="sg-swatch" />
      <div className="sg-info">
        <span>{value}</span>
        <br />
        <code style={{ fontSize: '1rem' }}>{`${name}-${index * 10}`}</code>
      </div>
    </li>
  );
};

const tiles = 10;
let i;
const tilesArray = [];
for (i = 0; i < tiles; i++) {
  tilesArray.push(i);
}

storiesOf('base', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Colors', (() => {
      return(
        <Fragment>
          <SidebarHeading title="Theme Colors" level={2} />
          <ul className="sg-colors">
            {
              themeColors.map((color) => <Color {...color} />)
            }
          </ul>
          <SidebarHeading title="Gray Scale Colors" level={2} />
          <ul className="sg-colors">
            {
              grayScaleColors.map((color) => <Color {...color} />)
            }
          </ul>
          <SidebarHeading title="Utility Colors" level={2} />
          <ul className="sg-colors">
            {
              utilityColors.map((color) => <Color {...color} />)
            }
          </ul>
        </Fragment>
      );
    }))
  .add(
    'Colors', (() => {
      return(
        <Fragment>
          <ul class="sg-colors">
            {
              tilesArray.map((i) => <GradientTile color="blue" value="#14558f" name="c-primary" index={i} />)
            }
          </ul>
        </Fragment>
      );
    }));
