import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import InputRadioGroup from './index';
import inputRadioGroupOptions from './InputRadioGroup.knobs.options';
import InputRadioGroupDocs from './InputRadioGroup.md';

storiesOf('forms|molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputRadioGroup', (() => {
      const InputRadioGroupProps = {
        title: text('title', 'Pick your favorite plant'),
        name: text('group', 'favorite-plant'),
        outline: boolean('outline', true),
        defaultSelected: text('defaultSelected', ''),
        error: boolean('error', false),
        errorMsg: text('errorMsg', 'You must selected your favorite plant.'),
        disabled: boolean('disabled', false),
        inline: boolean('inline', true),
        radioButtons: object('radioButtons', inputRadioGroupOptions.radioButtons)
      };

      return(
        <InputRadioGroup {...InputRadioGroupProps} onChange={action('onChange')} />
      );
    }),
    { info: InputRadioGroupDocs }
  );
