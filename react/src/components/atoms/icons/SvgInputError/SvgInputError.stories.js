import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgInputError from './index';
import svgInputErrorMarkdown from './SvgInputError.md';

storiesOf('atoms/icons', module)
  .add('SvgInputError', withInfo(svgInputErrorMarkdown)(() => <SvgInputError />));
