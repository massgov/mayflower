import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgInputSuccess from './index';
import svgInputSuccessMarkdown from './SvgInputSuccess.md';

storiesOf('atoms/icons', module)
  .add('SvgInputSuccess', withInfo(svgInputSuccessMarkdown)(() => <SvgInputSuccess />));
