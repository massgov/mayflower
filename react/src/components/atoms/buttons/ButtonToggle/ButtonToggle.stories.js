import React, { lazy, Suspense } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ButtonToggleDocs from './ButtonToggle.md';
import buttonToggleOptions from './ButtonToggle.knobs.options';

storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ButtonToggle', (() => {
      const ButtonToggle = lazy(() => import('./index'));
      const props = {
        option1: object('option1', buttonToggleOptions.options[0]),
        option2: object('option2', buttonToggleOptions.options[1]),
        id: text('id', 'sort'),
        labelText: text('labelText', 'Sort by:'),
        onChangeCallback: action('buttonToggle on select'),
        defaultValue: select('defaultValue', [buttonToggleOptions.options[0].value, buttonToggleOptions.options[1].value], buttonToggleOptions.options[1].value)
      };
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <ButtonToggle {...props} />
        </Suspense>
      );
    }),
    { info: ButtonToggleDocs }
  );
