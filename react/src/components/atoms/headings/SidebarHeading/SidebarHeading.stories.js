import React, { lazy, Suspense } from 'react';

import { storiesOf } from '@storybook/react';
import { text, select, withKnobs } from '@storybook/addon-knobs';

import SidebarHeadingDocs from './SidebarHeading.md';

storiesOf('atoms/headings', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'SidebarHeading', (() => {
      const SidebarHeading = lazy(() => import('./index'));
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
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <SidebarHeading title={title} level={level} />
        </Suspense>
      );
    }),
    { info: SidebarHeadingDocs }
  );

