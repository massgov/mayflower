import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgCircleChevron from './index';

storiesOf('atoms/icons', module)
  .add('SvgCircleChevron', withInfo()(() => <SvgCircleChevron />));

