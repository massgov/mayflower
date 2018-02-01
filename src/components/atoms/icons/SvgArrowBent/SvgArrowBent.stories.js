import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgArrowBent from './index';
import svgArrowMarkdown from './SvgArrowBent.md';

storiesOf('atoms/icons', module)
  .add('SvgArrowBent', withInfo({ svgArrowMarkdown })(() => <SvgArrowBent />));
