import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import SvgPhone from './index';
import SvgPhoneMarkdown from './SvgPhone.md';

storiesOf('atoms/icons', module)
  .add('SvgPhone', withInfo(`<div>${SvgPhoneMarkdown}</div>`)(() => <SvgPhone />));

