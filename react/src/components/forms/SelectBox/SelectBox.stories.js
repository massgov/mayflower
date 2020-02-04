import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SelectBox from './index';
import selectOptions from './SelectBox.knobs.options';
import SelectBoxDocs from './SelectBox.md';

storiesOf('forms|atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'SelectBox', (() => {
      const props = {
        label: text('label', 'Color Scheme:'),
        stackLabel: boolean('stackLabel', false),
        required: boolean('required', true),
        id: text('id', 'color-select'),
        options: object('options', selectOptions.options.colors),
        selected: select('defaultSelected', selectOptions.options.colors.map((option) => option.text), selectOptions.options.colors[0].text),
        onChangeCallback: action('SelectBox onChangeCallback')
      };
      props.className = text('className', !props.required ? 'ma__select-box js-dropdown ma__select-box--optional' : 'ma__select-box js-dropdown');
      return(<SelectBox {...props} />);
    }),
    { info: SelectBoxDocs }
  );
