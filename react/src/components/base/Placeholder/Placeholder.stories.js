import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';

import Placeholder from '.';
import PlaceholderDocs from './Placeholder.md';

storiesOf('base', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Placeholder', (() => {
      const props = {
        text: text('placeholder.text', 'This is just a placeholder for templates')
      };
      return(<Placeholder {...props} />);
    }),
    { info: PlaceholderDocs }
  );
