import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgLaptop from './index';
import SvgLaptopMarkdown from './SvgLaptop.md';

storiesOf('atoms/icons', module)
  .add('SvgLaptop', withInfo(`<div>${SvgLaptopMarkdown}</div>`)(() => <SvgLaptop />));

