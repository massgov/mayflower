import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import PublishStateDocs from './PublishState.md';
import PublishState from './index';

storiesOf('atoms/text', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'PublishState', (() => {
      const props = {
        text: text('text', 'Draft')
      };
      return(
        <PublishState {...props} />
      );
    }),
    { info: PublishStateDocs }
  );
