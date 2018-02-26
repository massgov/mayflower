import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import SelectBox from './index';
import selectOptions from './SelectBox.knobs.options';
import SelectBoxDocs from './SelectBox.md';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add(
    'SelectBox',
    withInfo(`<div>${SelectBoxDocs}</div>`)(() => {
      const props = {
        label: text('selectBox.label', 'Color Scheme:'),
        required: boolean('selectBox.required', true),
        id: text('selectBox.id', 'color-select'),
        options: object('selectBox.options', selectOptions.options.colors)
      };
      props.className = text('selectBox.className', !props.required ? 'ma__select-box js-dropdown ma__select-box--optional' : 'ma__select-box js-dropdown');
      return(<SelectBox {...props} onChangeCallback={action('custom-click on select')} />);
    })
  );
