import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import SelectBox from './index';
import selectOptions from './SelectBox.knobs.options';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add(
    'SelectBox',
    withInfo()(() => {
      const label = text('info', 'Color Scheme:');
      const id = text('id', 'color-select');
      // selectOptions imported above
      const options = object('options', selectOptions.options.colors);

      const defaultValue = true;
      const required = boolean('required', defaultValue);

      const onChangeCallback = () => {
        console.log('This is a custom onChange callback passed to the select!');
      };

      return(<SelectBox label={label} options={options} id={id} required={required} onChange={action('on-change')} onChangeCallback={onChangeCallback} />);
    })
  );
