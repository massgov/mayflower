import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgFax from './index';
import SvgFaxMarkdown from './SvgFax.md';

storiesOf('atoms/icons', module)
  .add('SvgFax', withInfo(`<div>${SvgFaxMarkdown}</div>`)(() => <SvgFax />));

