import React, { lazy, Suspense } from 'react';
import { storiesOf } from '@storybook/react';

import DividerDocs from './Divider.md';

storiesOf('atoms', module)
  .add(
    'Divider', () => {
      const Divider = lazy(() => import('./index'));
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <Divider />
        </Suspense>
      );
    },
    { info: DividerDocs }
  );
