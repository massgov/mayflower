import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs/react';

import InputDate from './InputDate';

storiesOf('Atoms/Forms/InputDate', module).addDecorator(withKnobs)
  .add('InputDate', 
    withInfo(`
      
      ### Description
      
      This is the standard date input pattern
    
      ~~~js
      <InputDate></InputDate>
      ~~~
    
    `)(() => {
      
      const labelText = text('label','Select a date:')
      const defaultValue = true;
      const required = boolean('required', defaultValue);
      const id = text('id', 'date-input');
      const name = text('name', 'date-input');
      const placeholder = ('placeholder','mm/dd/yy');
      const restrictOptions = { '': 'default', min: 'min', max: 'max'};
      const restrict = select('restrict', restrictOptions);

    	return(<InputDate labelText={labelText} required={required} id={id} name={name} placeholder={placeholder} restrict={restrict}></InputDate>)
    })
  );
