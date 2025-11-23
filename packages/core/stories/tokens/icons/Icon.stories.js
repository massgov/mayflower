import React from 'react';
import { assets } from './Icon.knob.options';
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
  }
};

export default {
  title: generateTitle('Icon'),
  component: Icons
};
