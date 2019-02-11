import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import InputCheckBox from './index';
import InputCheckBoxOptions from './InputCheckBox.knobs.options';
import inputCheckBoxText from './InputCheckBox.md';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('InputCheckBox', withInfo(`<div>${inputCheckBoxText}</div>`)(() => {
    const inputCheckBoxOptionsWithKnobs = Object.assign(...Object.entries(InputCheckBoxOptions).map(([k, v]) => (
      { [k]: v() })));
    return(
      <InputCheckBox {...inputCheckBoxOptionsWithKnobs} />
    );
  }));
