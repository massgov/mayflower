import React from 'react';
import { assets, boldOptions } from './Icon.knob.options';
import IconDisplay from './IconDisplay';
import generateTitle from '../../util/generateTitle';

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
      type: 'color'
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
