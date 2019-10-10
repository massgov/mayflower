import React from 'react';
import { storiesOf } from '@storybook/react';

import Error404 from '.';
import Error404Docs from './Error404.md';

storiesOf('pages', module)
  .add(
    'Error404', (() => (
      <Error404 />
    )),
    { info: Error404Docs }
  );
