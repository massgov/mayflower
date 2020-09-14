import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import LinkDropdown from '.';
import buttonWithIconOptions from 'MayflowerReactButtons/ButtonWithIcon/ButtonWithIcon.knobs.options';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('LinkDropdown', (() => {
    const props = {
      dropdownButton: {
        text: text('text', 'Add to calendar', 'dropdownButton'),
        theme: select('theme', buttonWithIconOptions.theme, 'c-primary', 'dropdownButton'),
        usage: select('usage', buttonWithIconOptions.usage, 'quaternary-simple', 'dropdownButton'),
        id: text('id', 'dropdownbutton-simple', 'dropdownButton'),
        capitalized: boolean('capitalized', true, 'dropdownButton')
      },
      dropdownItems: object('dropdownItems', [{
        text: 'Google Calendar',
        href: '#'
      }, {
        text: 'Outlook Calendar',
        href: '#'
      }], 'dropdownItems'),
      onItemSelect: action('onItemSelect onClick'),
      onButtonClick: action('onButtonClick onClick')
    };
    return(
      <LinkDropdown {...props} />
    );
  }));
