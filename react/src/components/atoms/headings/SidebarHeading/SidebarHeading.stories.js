import React from 'react';

import { storiesOf } from '@storybook/react';
import { text, select, withKnobs } from '@storybook/addon-knobs';

import SidebarHeadingDocs from './SidebarHeading.md';
import SidebarHeading from './index';

storiesOf('atoms/headings', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'SidebarHeading', (() => {
      const levelOptions = {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6
      };
      const title = text('title', 'Key Agencies');
      const level = select('level', levelOptions, levelOptions[2]);
      return(<SidebarHeading title={title} level={level} />);
    }),
    { info: SidebarHeadingDocs }
  );

