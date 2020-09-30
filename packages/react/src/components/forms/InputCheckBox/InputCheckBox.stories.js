import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import { action } from '@storybook/addon-actions';
import * as Icon from 'MayflowerReactBase/Icon';
import { svgOptions } from 'MayflowerReactBase/Icon/Icon.knob.options';
import InputCheckBox from './index';
import InputCheckBoxDocs from './InputCheckBox.md';

export const InputCheckBoxExample = (args) => {
  const {
    icon, ...rest
  } = args;
  const props = {
    ...rest
  };
  if (icon) {
    const IconComponent = Icon[icon];
    props.icon = <IconComponent name={icon} width={20} height={20} />;
  }
  return(
    <InputCheckBox {...props} />
  );
};
InputCheckBoxExample.storyName = 'Default';
InputCheckBoxExample.args = {
  id: 'input-checkbox',
  value: 'select-all',
  label: 'Apply to all',
  defaultValue: 'select-all',
  onChange: action('onChange'),
  onKeyDown: action('onKeyDown'),
  disabled: false,
  required: false,
  errorMsg: 'You are required to check this box.',
  labelText: 'Checkbox Input',
  classes: []
};
InputCheckBoxExample.argTypes = {
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
  title: 'forms/atoms/InputCheckBox',
  component: InputCheckBox,
  parameters: {
    docs: {
      page: () => <StoryPage Description={InputCheckBoxDocs} />
    }
  }
};
