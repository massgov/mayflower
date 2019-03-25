import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import ButtonSort from './index';
import ButtonSortDocs from './ButtonSort.md';
import buttonSortOptions from './ButtonSort.knobs.options';

storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ButtonSort', (() => {
      const props = {
        text: text('text', 'Date'),
        direction: select('direction', buttonSortOptions.direction, '')
      };
      return(
        <ButtonSort {...props} />
      );
    }),
    { info: ButtonSortDocs }
  );
