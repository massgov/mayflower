import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgDocPdf from './index';

storiesOf('atoms/icons', module)
  .add('SvgDocPdf', withInfo()(() => <SvgDocPdf />));

