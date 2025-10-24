import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { assets, svgOptions } from './Icon.knob.options';
import * as Icon from './index';
import IconDisplay from './IconDisplay';

export default {
  title: 'brand/icons',
  component: Icon['IconAlert'],
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};

export const BasicIcon = (args) => {
  const SelectedComponent = Icon[args.name];

  return(<SelectedComponent {...args} />);
};

BasicIcon.storyName = 'Icon';
BasicIcon.args = {
  name: 'IconAlert',
  width: 40,
  height: 50,
  classes: [''],
  ['aria-hidden']: false,
  ['aria-label']: 'This is an icon',
  fill: '#000'
};
BasicIcon.argTypes = {
  name: {
    control: {
      type: 'select',
      options: assets
    }
  },
  fill: {
    control: {
      type: 'color'
    }
  }
};

console.log(assets);

export const AllIcons = (args) => {
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
AllIcons.storyName = 'All Icons';
AllIcons.args = {
  width: 40,
  height: 50,
  title: 'Icon Title Here',
  classes: [''],
  ariaHidden: false,
  fill: '#000'
};
AllIcons.argTypes = {
  fill: {
    control: {
      type: 'color'
    }
  }
};