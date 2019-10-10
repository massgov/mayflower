import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ArrowButton from './index';
import ArrowButtonDocs from './ArrowButton.md';

storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ArrowButton', (() => {
      const props = {
        direction: select('direction', ['left', 'right']),
        href: text('href', ''),
        info: text('info', 'Left'),
        onClick: action('Button Clicked')
      };
      return(
        <ArrowButton {...props} />
      );
    }),
    { info: ArrowButtonDocs }
  );
