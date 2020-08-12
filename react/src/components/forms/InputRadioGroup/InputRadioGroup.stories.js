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
        inputProps: {
          name: text('group', 'favorite-plant'),
          disabled: boolean('disabled', false),
          defaultChecked: inputRadioGroupOptions.radioButtons[1].value
        },
        groupProps: {
          labelProps: {
            className: text('label: className', ''),
            labelText: text('labelText', 'Pick your favorite plant'),
            hidden: boolean('hiddenLabel', false)
          },
          showError: boolean('showError', false),
          errorMsg: text('errorMsg', 'You must selected your favorite plant.'),
          inline: boolean('inline', true),
          outline: boolean('outline', true),
        },
        radioButtons: object('radioButtons', inputRadioGroupOptions.radioButtons)
      };

      return(
        <InputRadioGroup {...InputRadioGroupProps} onChange={action('onChange')} />
      );
    }),
    { info: InputRadioGroupDocs }
  );
