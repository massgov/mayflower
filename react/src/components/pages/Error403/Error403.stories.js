import React from 'react';
import { storiesOf } from '@storybook/react';

import Error403 from '.';
import Error403Docs from './Error403.md';

storiesOf('pages', module)
  .add(
    'Error403', (() => (
      <Error403 />
    )),
    { info: Error403Docs }
  );
