import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

import InputCheckBox from './index';
import InputCheckBoxOptions from './InputCheckBox.knobs.options';
import inputCheckBoxDocs from './InputCheckBox.md';

storiesOf('atoms/forms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputCheckBox', (() => {
      const inputCheckBoxOptionsWithKnobs = Object.assign(...Object.entries(InputCheckBoxOptions).map(([k, v]) => (
        { [k]: v() })));
      return(
        <InputCheckBox {...inputCheckBoxOptionsWithKnobs} />
      );
    }),
    { info: inputCheckBoxDocs }
  );
