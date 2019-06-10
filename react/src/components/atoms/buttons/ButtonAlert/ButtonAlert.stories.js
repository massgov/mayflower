import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ButtonAlert from './index';
import ArrowButtonDocs from './ButtonAlert.md';

storiesOf('atoms/buttons', module)
  .add(
    'ButtonAlert', () => (
      <ButtonAlert
        text="Test"
        onClick={action('Button Clicked')}
      />
    ),
    { info: ArrowButtonDocs }
  );
