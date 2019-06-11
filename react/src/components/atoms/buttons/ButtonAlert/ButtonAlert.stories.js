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
        onClick: action('ButtonWithIcon clicked'),
        text: text('text', 'Button With Icon'),
        type: select('type', ButtonAlertOptions.type, 'submit'),
        classes: array('classes', []),
        iconSize: select('iconSize', ButtonAlertOptions.size, ''),
        iconColor: select('iconColor', ButtonAlertOptions.color),
        canExpand: boolean('canExpand', true),
        expanded: boolean('expanded', true),
        capitalized: boolean('capitalized', true),
        ariaLabel: text('arialLabel', '')
      };
      return(
        <ButtonAlert
          {...props}
          text="Test"
          onClick={action('Button Clicked')}
        />
      );
    }),
    { info: ButtonAlertDocs }
  );
