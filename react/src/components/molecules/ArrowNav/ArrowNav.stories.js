import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ArrowNav from './index';
import ArrowNavDocs from './ArrowNav.md';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ArrowNav', (() => {
      const props = {
        href: text('href', ''),
        info: text('info', 'link info'),
        text: text('text', 'Text'),
        title: text('title', 'Title'),
        onClick: action('Clicked'),
        direction: select('direction', ['left', 'right']),
        label: text('label', 'Label')
      };
      return(<ArrowNav {...props} />);
    }),
    { info: ArrowNavDocs }
  );
