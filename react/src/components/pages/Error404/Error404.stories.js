import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Error404 from '.';
import Error404Docs from './Error404.md';

storiesOf('pages', module)
  .addDecorator(withInfo)
  .add(
    'Error404', (() => (
      <Error404 />
    )),
    { info: Error404Docs }
  );
