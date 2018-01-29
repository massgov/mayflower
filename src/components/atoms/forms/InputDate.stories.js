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
    	return(<InputDate></InputDate>)
    })
  );
