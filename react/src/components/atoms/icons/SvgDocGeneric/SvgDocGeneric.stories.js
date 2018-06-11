import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgDocGeneric from './index';

storiesOf('atoms/icons', module)
  .add('SvgDocGeneric', withInfo()(() => <SvgDocGeneric />));

