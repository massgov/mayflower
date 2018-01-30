import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgArrowBent from './index';
import svgArrowMarkdown from './SvgArrowBent.md';

storiesOf('Atoms/Icons', module)
  .add('SvgArrowBent', withInfo({ svgArrowMarkdown })(() => <SvgArrowBent />));
