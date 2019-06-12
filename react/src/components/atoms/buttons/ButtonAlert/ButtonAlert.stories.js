import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import ButtonAlert from './index';
import ButtonAlertDocs from './ButtonAlert.md';

storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ButtonAlert', (() => {
      const props = {
        onClick: action('ButtonAlert clicked'),
        text: text('text', ' Updates'),
        showText: text('showText', 'Show'),
        hideText: text('hideText', 'Hide'),
        classes: text('classes', '')
      };
      return(
        <ButtonAlert
          {...props}
        />
      );
    }),
    { info: ButtonAlertDocs }
  );
