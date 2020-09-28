import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import SelectBox from './index';
import selectOptions from './SelectBox.knobs.options';
import SelectBoxDocs from './SelectBox.md';

export const SelectBoxExample = (args) => {
  const props = {
    ...args
  };
  props.className = args.required ? 'ma__select-box js-dropdown' : 'ma__select-box js-dropdown ma__select-box--optional';
  return(
    <SelectBox {...props} />
  );
};

SelectBoxExample.storyName = 'Default';
SelectBoxExample.args = {
  label: 'Color Scheme:',
  stackLabel: false,
  required: true,
  id: 'color-select',
  options: selectOptions.options.colors,
  selected: selectOptions.options.colors[0].text,
  onChangeCallback: action('SelectBox onChangeCallback')
};
SelectBoxExample.argTypes = {
  selected: {
    control: {
      type: 'select',
      options: selectOptions.options.colors.map((option) => option.text)
    }
  }
};

export default {
  title: 'forms/atoms/SelectBox',
  component: SelectBox,
  parameters: {
    docs: {
      page: () => <StoryPage Description={SelectBoxDocs} />
    }
  }
};
