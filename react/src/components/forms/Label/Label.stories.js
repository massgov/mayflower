import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import Label from './index';
import LabelDocs from './Label.md';
import LabelOptions from './Label.knobs.options';

export const LabelExample = (args) => (
  <Label {...args}>{LabelOptions.labelText}</Label>
);

LabelExample.storyName = 'Default';
LabelExample.args = {
  inputId: LabelOptions.inputId,
  disabled: LabelOptions.disabled,
  hidden: LabelOptions.hidden,
  conditionText: LabelOptions.conditionText,
  className: '',
  useLegend: LabelOptions.useLegend
};

export default {
  title: 'forms/atoms/Label',
  component: Label,
  parameters: {
    docs: {
      page: () => <StoryPage Description={LabelDocs} />
    }
  }
};
