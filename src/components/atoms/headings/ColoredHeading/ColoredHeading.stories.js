import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select } from '@storybook/addon-knobs/react';

import ColoredHeading from './index';
// import CompReadme from './CompHeading.md';

storiesOf('atoms/headings', module).addDecorator(withKnobs)
  .add('ColoredHeading', withInfo()(() => {
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
      level: select('level', levelOptions, 2),
      color: select('color', { '': '', green: 'green' })
    };
    return(<ColoredHeading {...props} />);
  }));
