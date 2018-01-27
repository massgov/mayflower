import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';

import CompHeading from './CompHeading';
import CompReadme from './CompHeading.md';

storiesOf('Atoms/Headings/Comp Heading', module).addDecorator(withKnobs)
  .add('Comp Heading', withInfo(CompReadme)(() => {
    const title = text('title', 'Title text');
    const titleContext = text('titleContext', '');
    const levelOptions = {
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6'
    };
    const level = select('level', levelOptions);
    const sub = boolean('sub', false);
    const color = select('color', { '': '', yellow: 'yellow' });
    const id = text('id', '');
    const centered = boolean('centered', false);
    const sidebar = boolean('sidebar', false);
    return(<CompHeading
      title={title}
      titleContext={titleContext}
      id={id}
      sub={sub}
      level={level}
      color={color}
      centered={centered}
      sidebar={sidebar}
    />);
  }));
