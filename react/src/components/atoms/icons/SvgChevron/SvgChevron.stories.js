import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgChevron from './index';

storiesOf('atoms/icons', module)
  .add('SvgChevron', withInfo()(() => <SvgChevron />));

