import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Divider from './index';
import DividerDocs from './Divider.md';

storiesOf('atoms', module)
  .addDecorator(withInfo)
  .add(
    'Divider', (() => (
      <Divider />
    )),
    { info: DividerDocs }
  );
