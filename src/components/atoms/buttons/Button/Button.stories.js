import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs/react';

import Button from './index';

storiesOf('Atoms/Buttons/Button', module).addDecorator(withKnobs)
  .add(
    'Button',
    withInfo(`
      
      ### Description
      
      This is the standard button pattern
    
      ~~~js
      <Button>Click Here</Button>
      ~~~
    
    `)(() => {
      const themeOptions = { '': 'default', secondary: 'secondary', quaternary: 'quaternary' };
      const theme = select('theme', themeOptions);

      const typeOptions = {
        submit: 'submit', reset: 'reset', button: 'button', '': 'default'
      };
      const type = select('type', typeOptions);

      const defaultValue = false;
      const outline = boolean('outline', defaultValue);

      const sizeOptions = { '': 'default', small: 'small' };
      const size = select('size', sizeOptions);

      const info = text('info', 'information');
      const buttonText = text('text', 'button');
      const href = text('href', '');

      return(
        <Button
          theme={theme}
          type={type}
          size={size}
          info={info}
          text={buttonText}
          href={href}
          outline={outline}
        />
      );
    })
  );
