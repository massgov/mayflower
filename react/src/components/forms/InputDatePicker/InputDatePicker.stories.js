import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select, date } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import InputDatePicker from './index';

storiesOf('forms|atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputDatePicker', (() => {
      return(
        <InputDatePicker />
      );
    })
  );
