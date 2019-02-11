import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ArrowNav from './index';
import ArrowNavDocs from './ArrowNav.md';

storiesOf('molecules', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ArrowNav', (() => {
      const props = {
        href: text('ArrowNav.href', ''),
        info: text('ArrowNav.info', 'link info'),
        text: text('ArrowNav.text', 'Text'),
        title: text('ArrowNav.title', 'Title'),
        onClick: action('Clicked'),
        direction: select('ArrowNav.direction', ['left', 'right']),
        label: text('ArrowNav.label', 'Label')
      };
      return(<ArrowNav {...props} />);
    }),
    { info: ArrowNavDocs }
  );
