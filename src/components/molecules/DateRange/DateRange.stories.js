import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, select, object } from '@storybook/addon-knobs/react';

import DateRange from './DateRange';

storiesOf('Molecules/DateRange', module).addDecorator(withKnobs)
  .add('DateRange', 
    withInfo(`
      
      ### Description
      
      This is the standard date range pattern
    
      ~~~js
      <DateRange></DateRange>
      ~~~
    
    `)(() => {

      const label = text('Label','Filter by date')

      const defaultStartDate = {labelText: 'Select a start date', required: false, id: 'start-date', name: 'start-date', placeholder: 'today', restrict: 'min'};
      const startDate = object('startDate', defaultStartDate);

      const defaultEndDate = {labelText: 'Select an end date', required: false, id: 'end-date', name: 'end-date', placeholder: 'mm/dd/yy', restrict: ''};
      const endDate = object('endDate', defaultEndDate);

    	return(<DateRange label={label} startDate={startDate} endDate={endDate}></DateRange>)
    })
  );
