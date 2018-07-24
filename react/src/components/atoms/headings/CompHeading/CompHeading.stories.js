import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { text, boolean, select, withKnobs } from '@storybook/addon-knobs/react';

import CompHeading from './index';
import CompReadme from './CompHeading.md';

const levelOptions = [1, 2, 3, 4, 5, 6];

storiesOf('atoms/headings', module).addDecorator(withKnobs)
  .add('Comp Heading', withInfo({ CompReadme })(() => {
    const props = {
      title: text('compHeading.title', 'Title text'),
      titleContext: text('compHeading.titleContext', ''),
      id: text('compHeading.id', ''),
      sub: boolean('compHeading.sub', false),
      level: select('compHeading.level', levelOptions, 2),
      color: select('compHeading.color', { '': 'green (default)', yellow: 'yellow' }, ''),
      centered: boolean('compHeading.centered', false),
      sidebar: boolean('compHeading.sidebar', false)
    };
    return(<CompHeading {...props} />);
  }));
