import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import { action } from '@storybook/addon-actions';

import ButtonToggle from './index';
import ButtonToggleDocs from './ButtonToggle.md';
import buttonToggleOptions from './ButtonToggle.knobs.options';

export default {
  title: 'atoms/buttons/ButtonToggle',
  component: ButtonToggle,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ButtonToggleDocs} />
    }
  }
};

export const ButtonToggleExample = (args) => <ButtonToggle {...args} />;
ButtonToggleExample.storyName = 'Default';
ButtonToggleExample.args = {
  option1: buttonToggleOptions.options[0],
  option2: buttonToggleOptions.options[1],
  id: 'sort',
  labelText: 'Sort by:',
  onChangeCallback: action('buttonToggle on select'),
  defaultValue: buttonToggleOptions.options[1].value
};
ButtonToggleExample.argTypes = {
  defaultValue: {
    control: {
      type: 'select',
      options: {
        [buttonToggleOptions.options[0].value]: buttonToggleOptions.options[0].value, 
        [buttonToggleOptions.options[1].value]: buttonToggleOptions.options[1].value
      }
    }
  }
};
