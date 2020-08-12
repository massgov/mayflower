import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object, select } from '@storybook/addon-knobs';

import SelectBox from './index';
import selectOptions from './SelectBox.knobs.options';
import SelectBoxDocs from './SelectBox.md';

storiesOf('forms|atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'SelectBox', (() => {
      const [value, setValue] = React.useState(selectOptions.options.colors[0].value);
      const props = {
        inputProps: {
          required: boolean('required', true),
          id: text('id', 'color-select'),
          selected: select('selected', selectOptions.options.colors.map((option) => option.text), selectOptions.options.colors[0].text),
          onChange: ({ selectedValue }) => {
            setValue(selectedValue);
          },
          value,
          className: text('className', '')
        },
        groupProps: {
          labelProps: {
            hidden: boolean('hiddenLabel', false),
            labelText: text('labelText', 'Color Scheme:')
          },
          inline: boolean('inline', false),
          errorMsg: text('errorMsg', 'You are required to select an option.'),
          showError: boolean('showError', false),
          helperText: text('helperText', '')
        },
        options: object('options', selectOptions.options.colors)
      };
      return(<SelectBox {...props} />);
    }),
    { info: SelectBoxDocs }
  );
