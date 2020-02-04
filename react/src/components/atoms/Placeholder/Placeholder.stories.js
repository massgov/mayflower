import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Placeholder from '.';
import PlaceholderDocs from './Placeholder.md';

storiesOf('atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Placeholder', (() => {
      const props = {
        text: text('text', 'This is just a placeholder for templates')
      };
      return(<Placeholder {...props} />);
    }),
    { info: PlaceholderDocs }
  );
