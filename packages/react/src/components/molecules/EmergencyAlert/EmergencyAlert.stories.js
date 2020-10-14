import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import Link from 'MayflowerReactMolecules/Link';
import EmergencyAlert from './index';

export const EmergencyAlertExample = (args) => <EmergencyAlert {...args} />;

EmergencyAlertExample.storyName = 'Default';
EmergencyAlertExample.args = {
  theme: 'c-warning',
  message: 'MassPort is operating with limited flights due to road closures.',
  timeStamp: '02.15.16, 5:00 p.m',
  link: ({ linkClasses, TextElement }) => <Link classes={linkClasses} href="https://www.mass.gov"><TextElement>Read full alert</TextElement></Link>
};
EmergencyAlertExample.argTypes = {
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
  }
};

export default {
  title: 'molecules/EmergencyAlert',
  component: EmergencyAlert,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
