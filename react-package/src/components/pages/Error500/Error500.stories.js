import React from 'react';
import { storiesOf } from '@storybook/react';

import Error500 from '.';
import Error500Docs from './Error500.md';

storiesOf('pages', module)
  .add(
    'Error500', (() => (
      <Error500 />
    )),
    { info: Error500Docs }
  );
