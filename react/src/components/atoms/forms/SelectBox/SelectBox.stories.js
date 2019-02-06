import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, object, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import SelectBox from './index';
import selectOptions from './SelectBox.knobs.options';
import SelectBoxDocs from './SelectBox.md';

storiesOf('atoms/forms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'SelectBox', (() => {
      const props = {
        label: text('selectBox.label', 'Color Scheme:'),
        stackLabel: boolean('selectBox.stackLabel', false),
        required: boolean('selectBox.required', true),
        id: text('selectBox.id', 'color-select'),
        options: object('selectBox.options', selectOptions.options.colors),
        selected: select('selectBox.defaultSelected', selectOptions.options.colors.map((option) => option.text), selectOptions.options.colors[0].text),
        onChangeCallback: action('SelectBox onChangeCallback')
      };
      props.className = text('selectBox.className', !props.required ? 'ma__select-box js-dropdown ma__select-box--optional' : 'ma__select-box js-dropdown');
      return(<SelectBox {...props} />);
    }),
    { info: SelectBoxDocs }
  );
