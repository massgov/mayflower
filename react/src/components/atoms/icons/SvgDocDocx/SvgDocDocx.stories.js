import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgDocDocx from './index';

storiesOf('atoms/icons', module)
  .add('SvgDocDocx', withInfo()(() => <SvgDocDocx />));

