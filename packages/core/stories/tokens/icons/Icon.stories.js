import React from 'react';
import generateTitle from '@core/stories/util/generateTitle';
import { assets, boldOptions } from './Icon.knob.options';
import IconDisplay from './IconDisplay';

const brandColors = [
  { color: '#141414', name: 'Neutral Default' },
  { color: '#707070', name: 'Neutral Muted' },
  { color: '#a8a8a8', name: 'Neutral Disabled' },
  { color: '#14558f', name: 'Primary' },
  { color: '#2d6a46', name: 'Secondary' },
  { color: '#cd0d0d', name: 'Danger' },
  { color: '#f6b622', name: 'Warning' },
  { color: '#187236', name: 'Success' }
];

export const Icons = (args) => (
  <ul className="sg-icons">
    {
        Object.keys(assets).map((icon) => (
          <IconDisplay {...args} name={icon} key={`icon_${icon}`} />
        ))
      }
  </ul>
);
Icons.args = {
  width: 24,
  height: 24,
  bold: true,
  classes: [''],
  'aria-hidden': false,
  'aria-label': 'This is an icon',
  fill: '#000'
};
Icons.argTypes = {
  fill: {
    control: {
      type: 'select',
      options: brandColors.reduce((acc, item) => {
        acc[item.name] = item.color;
        return acc;
      }, {})
    }
  },
  bold: {
    control: { type: 'boolean' },
    options: boldOptions // Use the imported boldOptions
  }
};

export default {
  title: generateTitle('Icon'),
  component: Icons
};
