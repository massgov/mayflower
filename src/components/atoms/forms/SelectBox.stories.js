import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, select, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import SelectBox from './SelectBox';

storiesOf('Atoms/Forms/SelectBox', module).addDecorator(withKnobs)
  .add('SelectBox', 
    withInfo(`
      
      ### Description
      
      This is the standard pattern for a select box.
    
      ~~~js
      <SelectBox></SelectBox>
      ~~~
    
    `)(() => {

      const label = text('info','Color Scheme:')
      const id = text('id', 'color-select')

      const defaultOptions = [{text: "Green", value: "green",}, {text: "Blue", value: "blue",}];
      const options = object('options', defaultOptions);

      const defaultValue = true;
      const required = boolean('required', defaultValue);

      return(<SelectBox label={label} options={options} id={id} required={required} onChange={action('on-change')}/>) })
  );
