import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Error500 from '.';
import Error500Readme from './Error500.md';

storiesOf('pages', module)
  .add('Error500', withInfo(`<div>${Error500Readme}</div>`)(() => (<Error500 />)));
