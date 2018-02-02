import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';

import CompHeading from './index';
import CompReadme from './CompHeading.md';

storiesOf('atoms/headings', module).addDecorator(withKnobs)
  .add('CompHeading', withInfo({ CompReadme })(() => {
    const levelOptions = {
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6
    };
    const props = {
      title: text('compHeading.title', 'Title text'),
      titleContext: text('compHeading.titleContext', ''),
      id: text('compHeading.id', ''),
      sub: boolean('compHeading.sub', false),
      level: select('compHeading.level', levelOptions, levelOptions[3]),
      color: select('compHeading.color', { '': 'green (default)', yellow: 'yellow' }),
      centered: boolean('compHeading.centered', false),
      sidebar: boolean('compHeading.sidebar', false)
    };
    return(<CompHeading {...props} />);
  }));
