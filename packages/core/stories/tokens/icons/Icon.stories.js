import React from 'react';
import * as Icon from '@massds/mayflower-react/dist/Icon';
import { StoryPage } from '../../../.storybook/preview';
import { assets, svgOptions } from './Icon.knob.options';
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
Icons.storyName = 'All Icons';
Icons.args = {
  width: 40,
  height: 50,
  title: 'Icon Title Here',
  classes: [''],
  ariaHidden: false,
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
