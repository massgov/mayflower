import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';

import CompHeading from './index';
import CompReadme from './CompHeading.md';

storiesOf('Atoms/Headings', module).addDecorator(withKnobs)
  .add('Comp Heading', withInfo({ CompReadme })(() => {
    const levelOptions = {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6'
    };
    const data = {
      compHeading: {
        title: text('title', 'Title text'),
        titleContext: text('titleContext', ''),
        id: text('id', ''),
        sub: boolean('sub', false),
        level: select('level', levelOptions),
        color: select('color', { '': '', yellow: 'yellow' }),
        centered: boolean('centered', false),
        sidebar: boolean('sidebar', false)
      }
    };
    return(<CompHeading data={data} />);
  }));
