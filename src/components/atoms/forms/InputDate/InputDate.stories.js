import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs/react';

import InputDate from './index';
// import InputDate from './InputDate.md';

storiesOf('Atoms/Forms/InputDate', module).addDecorator(withKnobs)
  .add('InputDate', 
    withInfo(`
      
      ### Description
      
      This is the standard date input pattern
    
      ~~~js
      <InputDate></InputDate>
      ~~~
    
    `)(() => {

      const labelText = text('label','Select a date:');
      const placeholder = ('placeholder','mm/dd/yy');
      
      const defaultRequired = true;
      const required = boolean('required', defaultRequired);
      
      const id = text('id', 'date-input');
      const name = text('name', 'date-input');
      
      const restrictOptions = { '': 'default', min: 'min', max: 'max'};
      const restrict = select('restrict', restrictOptions);

    	return(<InputDate labelText={labelText} required={required} id={id} name={name} placeholder={placeholder} restrict={restrict}></InputDate>)
    })
  );
