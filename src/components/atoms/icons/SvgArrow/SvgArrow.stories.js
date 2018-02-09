import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgArrow from './index';
import svgArrowMarkdown from './SvgArrow.md';

storiesOf('atoms/icons', module)
  .add('SvgArrow', withInfo(svgArrowMarkdown)(() => <SvgArrow />));

