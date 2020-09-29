import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import { action } from '@storybook/addon-actions';

import LinkDropdown from '.';

export const LinkDropdownExample = (args) => <LinkDropdown {...args} />;

LinkDropdownExample.storyName = 'Default';
LinkDropdownExample.args = {
  dropdownButton: {
    text: 'Add to calendar',
    theme: 'c-primary',
    usage: 'quaternary-simple',
    id: 'dropdownbutton-simple',
    capitalized: true
  },
  dropdownItems: [{
    text: 'Google Calendar',
    href: '#'
  }, {
    text: 'Outlook Calendar',
    href: '#'
  }],
  onItemSelect: action('onItemSelect onClick'),
  onButtonClick: action('onButtonClick onClick')
};


export default {
  title: 'molecules/LinkDropdown',
  component: LinkDropdown,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
