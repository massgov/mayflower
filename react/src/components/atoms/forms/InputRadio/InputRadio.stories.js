import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import InputRadio from './index';
// import InputRadioDocs from './Button.md';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('InputRadio', withInfo(/* `<div>${ButtonDocs}</div>` */)(() => {
    const props = {
      name: text('inputRadio.name', 'plant'),
      id: text('inputRadio.id', 'fern'),
      value: text('inputRadio.value', 'fern'),
      label: text('inputRadio.label', 'Fern'),
      required: boolean('inputRadio.required', true),
      outline: boolean('inputRadio.outline', true),
      checked: boolean('inputRadio.checked', null),
      disabled: boolean('inputRadio.disabled', false),
      error: boolean('inputRadio.error', false)
    };
    return(
      <InputRadio {...props} onChange={action('onChange')} />
    );
  }));
