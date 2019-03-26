import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import Heading from './index';

storiesOf('atoms/headings', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Heading', (() => {
    const levelOptions = {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6'
    };
    const props = {
      text: text('text', 'Title text'),
      level: select('level', levelOptions, 1)
    };
    return(<Heading {...props} />);
  }));
