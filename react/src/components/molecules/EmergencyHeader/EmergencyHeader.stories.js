import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import * as Icon from 'MayflowerReactBase/Icon';
import { svgOptions } from 'MayflowerReactBase/Icon/Icon.knob.options';
import EmergencyHeader from '.';

export const EmergencyHeaderExample = (args) => {
  const SelectedComponent = Icon[args.icon];

  return<EmergencyHeader {...args} icon={<SelectedComponent />} />;
};

EmergencyHeaderExample.storyName = 'Default';
EmergencyHeaderExample.args = {
  title: ({ linkClasses }) => <a className={linkClasses} href="https://www.mass.gov">The State is experiencing severe weather due to the winter storm Paula.</a>,
  theme: 'c-warning',
  prefix: 'Emergency Alerts',
  icon: 'IconAlert'
};
EmergencyHeaderExample.argTypes = {
  theme: {
    control: {
      type: 'select',
      options: {
        'c-warning (default)': 'c-warning',
        'c-primary': 'c-primary',
        'c-primary-alt': 'c-primary-alt',
        'c-error': 'c-error',
        'c-gray': 'c-gray'
      }
    }
  },
  icon: {
    control: {
      type: 'select',
      options: Object.fromEntries(
        Object.entries(svgOptions).map(([key, value]) => [`Icon${key[0].toUpperCase() + key.slice(1)}`, value ? `Icon${value[0].toUpperCase() + value.slice(1)}` : value])
      )
    }
  }
};

export default {
  title: 'molecules/EmergencyHeader',
  component: EmergencyHeader,
  parameters: {
    docs: {
      page: () => <StoryPage StoryComponent={EmergencyHeaderExample} />
    }
  }
};
