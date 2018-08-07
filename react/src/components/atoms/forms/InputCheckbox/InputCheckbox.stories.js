import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import InputCheckbox from './index';
import InputCheckboxDocs from './InputCheckbox.md';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('InputCheckbox', withInfo( `<div>${InputCheckboxDocs}</div>` )(() => {
    const props = {
      name: text('inputRadio.name', 'plant'),
      id: text('inputRadio.id', 'fern'),
      value: text('inputRadio.value', 'fern'),
      label: text('inputRadio.label', 'Fern'),
      required: boolean('inputRadio.required', true),
      outline: boolean('inputRadio.outline', true),
      checked: boolean('inputRadio.checked', false),
      disabled: boolean('inputRadio.disabled', false)
    };

    return(
      <InputCheckbox {...props} onChange={action('onChange')} />
    );
  }));
