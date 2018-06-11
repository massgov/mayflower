import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgDocXlxs from './index';

storiesOf('atoms/icons', module)
  .add('SvgDocXlxs', withInfo()(() => <SvgDocXlxs />));

