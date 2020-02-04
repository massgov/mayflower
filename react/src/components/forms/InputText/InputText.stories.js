import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import InputText from './index';
import InputTextDocs from './InputText.md';
import InputTextOptions from './InputText.knobs.options';

storiesOf('forms|atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputText', (() => {
      const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputTextOptions).map(([k, v]) => (
        { [k]: v(InputText.defaultProps[k]) })));
      inputTextOptionsWithKnobs.onChange = action('Text input modified');

      return(<InputText {...inputTextOptionsWithKnobs} />);
    }),
    { info: InputTextDocs }
  );
