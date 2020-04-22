import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import ButtonAlert from './index';
import ButtonAlertDocs from './ButtonAlert.md';
import buttonWithIconOptions from '../ButtonWithIcon/ButtonWithIcon.knobs.options';

storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ButtonAlert', (() => {
      const props = {
        onClick: action('ButtonAlert clicked'),
        text: text('text', ' Updates'),
        showText: text('showText', 'Show'),
        hideText: text('hideText', 'Hide'),
        classes: text('classes', ''),
        isOpen: boolean('isOpen', false),
        theme: select('theme', buttonWithIconOptions.theme)
      };
      return(
        <ButtonAlert
          {...props}
        />
      );
    }),
    { info: ButtonAlertDocs }
  );
