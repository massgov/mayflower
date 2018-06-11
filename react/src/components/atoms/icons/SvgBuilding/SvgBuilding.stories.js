import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgBuilding from './index';

storiesOf('atoms/icons', module)
  .add('SvgBuilding', withInfo()(() => <SvgBuilding />));

