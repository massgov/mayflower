import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import InputText from './index';
import InputTextReadme from './InputText.md';
import InputTextOptions from './InputText.knobs.options';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('InputText', withInfo(`<div>${InputTextReadme}</div>`)(() => {
    const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputTextOptions).map(([k, v]) => (
      { [k]: v(InputText.defaultProps[k]) })));

    return(<InputText {...inputTextOptionsWithKnobs} />);
  }));
