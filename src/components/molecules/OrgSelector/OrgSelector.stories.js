import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import OrgSelector from './index';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add(
    'OrgSelector',
    withInfo(`
      
      ### Description
      
      This is the standard date range pattern
    
      ~~~js
      <DateRange></DateRange>
      ~~~
    
    `)(() => (<OrgSelector />))
  );
