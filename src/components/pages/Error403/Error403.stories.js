import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Error403 from '.';
import Error403Readme from './Error403.md';

storiesOf('pages', module)
  .add('Error403', withInfo(`<div>${Error403Readme}</div>`)(() => (<Error403 />)));
