import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import InputRadioGroup from './index';
import inputRadioGroupOptions from './InputRadioGroup.knobs.options';
import InputRadioGroupDocs from './InputRadioGroup.md';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('InputRadioGroup', withInfo(`<div>${InputRadioGroupDocs}</div>`)(() => {
    const InputRadioGroupProps = {
      title: text('inputRadioGroup.title', 'Pick your favorite plant'),
      name: text('inputRadioGroup.group', 'favorite-plant'),
      outline: boolean('inputRadioGroup.outline', true),
      defaultSelected: text('inputRadioGroup.defaultSelected', ''),
      error: boolean('inputRadioGroup.error', false),
      errorMsg: text('inputRadioGroup.errorMsg', 'You must selected your favorite plant.'),
      disabled: boolean('inputRadioGroup.disabled', false),
      inline: boolean('inputRadioGroup.inline', true),
      radioButtons: object('inputRadioGroup.radioButtons', inputRadioGroupOptions.radioButtons)
    };
    console.table(InputRadioGroupProps.radioButtons);

    return(
      <InputRadioGroup {...InputRadioGroupProps} onChange={action('onChange')} />
    );
  }));
