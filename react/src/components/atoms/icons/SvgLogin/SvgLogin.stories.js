import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgLogin from './index';

storiesOf('atoms/icons', module)
  .add('SvgLogin', withInfo()(() => <SvgLogin />));

