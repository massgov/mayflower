import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, select, object } from '@storybook/addon-knobs/react';

import OrgSelector from './index';

storiesOf('Molecules/OrgSelector', module).addDecorator(withKnobs)
  .add('OrgSelector', 
    withInfo(`
      
      ### Description
      
      This is the standard date range pattern
    
      ~~~js
      <DateRange></DateRange>
      ~~~
    
    `)(() => {
    	return(<OrgSelector></OrgSelector>)
    })
  );
