import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Error404 from '.';
import Error404Readme from './Error404.md';

storiesOf('pages', module)
  .add('Error404', withInfo(`<div>${Error404Readme}</div>`)(() => (<Error404 />)));
