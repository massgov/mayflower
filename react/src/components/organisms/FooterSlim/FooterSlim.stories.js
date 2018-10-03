import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import FooterSlim from './index';

storiesOf('organisms', module)
  .addDecorator(withKnobs)
  .add('FooterSlim', withInfo('{ FooterReadme }')(() => {
    return(<FooterSlim />);
  }));
