import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import ButtonToggle from './index';
import ButtonToggleDocs from './ButtonToggle.md';
import buttonToggleOptions from './ButtonToggle.knobs.options';

storiesOf('atoms/buttons', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'ButtonToggle', (() => {
      const props = {
        option1: object('buttonToggle.option1', buttonToggleOptions.options[0]),
        option2: object('buttonToggle.option2', buttonToggleOptions.options[1]),
        id: text('buttonToggle.id', 'sort'),
        labelText: text('buttonToggle.labelText', 'Sort by:'),
        onChangeCallback: action('buttonToggle on select'),
        defaultValue: select('buttonToggle.defaultValue', [buttonToggleOptions.options[0].value, buttonToggleOptions.options[1].value], buttonToggleOptions.options[1].value)
      };
      return(
        <ButtonToggle {...props} />
      );
    }),
    { info: ButtonToggleDocs }
  );
