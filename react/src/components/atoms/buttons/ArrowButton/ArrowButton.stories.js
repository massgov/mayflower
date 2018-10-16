import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import ArrowButton from './index';
import ArrowButtonDocs from './ArrowButton.md';

storiesOf('atoms/buttons', module).addDecorator(withKnobs)
  .add('ArrowButton', withInfo(`<div>${ArrowButtonDocs}</div>`)(() => {
    const props = {
      direction: select('arrowButton.direction', ['left', 'right']),
      href: text('arrowButton.href', ''),
      info: text('arrowButton.info', 'Left'),
      onClick: action('Button Clicked')
    };
    return(
      <ArrowButton {...props} />
    );
  }));
