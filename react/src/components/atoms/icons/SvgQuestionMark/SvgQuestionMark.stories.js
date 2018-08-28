import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgQuestionMark from './index';

storiesOf('atoms/icons', module)
  .add('SvgQuestionMark', withInfo()(() => <SvgQuestionMark />));
