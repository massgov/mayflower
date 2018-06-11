import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Divider from './index';
import DividerDocs from './Divider.md';

storiesOf('atoms', module)
  .add('Divider', withInfo(`<div>${DividerDocs}</div>`)(() => (
    <Divider />
  )));
