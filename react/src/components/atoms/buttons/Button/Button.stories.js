import React, { lazy, Suspense } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ButtonDocs from './Button.md';
import buttonOptions from './Button.knobs.options';

storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Button', (() => {
      const Button = lazy(() => import('./index'));
      const props = {
        usage: select('usage', buttonOptions.usage),
        theme: select('theme', buttonOptions.theme),
        type: select('type', buttonOptions.type),
        size: select('size', buttonOptions.size),
        info: text('info', 'this will be the tooltip text on hover'),
        disabled: boolean('disabled', false),
        text: text('text', 'Button'),
        href: text('href', ''),
        onClick: action('button clicked'),
        classes: array('classes', [])
      };
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <Button {...props} />
        </Suspense>
      );
    }),
    { info: ButtonDocs }
  );
