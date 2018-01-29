import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgArrow from './SvgArrow';
import svgArrowMarkdown from './SvgArrow.md';

storiesOf('Atoms/Icons', module)
  .add('SvgArrow', withInfo(svgArrowMarkdown)(() => <SvgArrow />));

