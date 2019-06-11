import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean, array } from '@storybook/addon-knobs';

import ButtonAlert from './index';
import ButtonAlertDocs from './ButtonAlert.md';
import ButtonAlertOptions from './ButtonAlert.knobs.options';


storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ButtonAlert', (() => {
      const props = {
        onClick: action('ButtonAlert clicked'),
        text: text('text', 'ButtonAlert')
      };
      return(
        <ButtonAlert
          {...props}
        />
      );
    }),
    { info: ButtonAlertDocs }
  );
