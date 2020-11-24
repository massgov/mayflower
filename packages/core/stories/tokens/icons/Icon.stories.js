import React from 'react';
import { StoryPage } from '../../../.storybook/preview';
import { assets, svgOptions } from './Icon.knob.options';
import * as Icon from '@massds/mayflower-react/dist/Icon';
import IconDisplay from './IconDisplay';
import generateTitle from '../../util/generateTitle';


export const Icons = (args) => {
  return(
    <ul className="sg-icons">
      {
        Object.keys(assets).map((icon) => (
          <IconDisplay {...args} name={icon} key={`icon_${icon}`} />
        ))
      }
    </ul>
  );
};
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
  title: generateTitle('Icons'),
  component: Icons,
  parameters: {
    backgrounds: {
        default: 'dark',
        values: [
          { name: 'white', value: '#ffffff' },
          { name: 'light', value: '#eeeeee' },
          { name: 'gray', value: '#cccccc' },
          { name: 'dark', value: '#222222' },
          { name: 'black', value: '#000000' },
        ],
    },
  }
};
