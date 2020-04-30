import React from 'react';

import { storiesOf } from '@storybook/react';

import Divider from './index';
import DividerDocs from './Divider.md';

storiesOf('atoms', module)
  .add(
    'Divider', (() => (
      <Divider />
    )),
    { info: DividerDocs }
  );
