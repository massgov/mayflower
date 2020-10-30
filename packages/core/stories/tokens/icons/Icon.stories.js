import React from 'react';
import { StoryPage } from '../../../.storybook/preview';
import { assets, svgOptions } from './Icon.knob.options';
import * as Icon from '@massds/mayflower-react/dist/Icon';
import IconDisplay from './IconDisplay';
import generateTitle from '../../util/generateTitle';

export default {
  title: generateTitle('Icons'),
  component: Icons,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};


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
