import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import ButtonToggle from './index';
import ButtonToggleDocs from './ButtonToggle.md';
import buttonToggleOptions from './ButtonToggle.knobs.options';

storiesOf('atoms/buttons', module).addDecorator(withKnobs)
  .add('ButtonToggle', withInfo(`<div>${ButtonToggleDocs}</div>`)(() => {
    const props = {
      options: object('buttonToggle.options', buttonToggleOptions.options),
      id: text('buttonToggle.id', 'sort'),
      labelText: text('buttonToggle.labelText', 'Sort by:'),
      onChangeCallback: action('buttonToggle on select')
    };
    return(
      <ButtonToggle {...props} />
    );
  }));
