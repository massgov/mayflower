import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, select } from '@storybook/addon-knobs/react';

import Button from './index';
import buttonOptions from './Button.knobs.options';

storiesOf('Atoms/Buttons', module).addDecorator(withKnobs)
  .add(
    'Button',
    withInfo(`
      This is the standard button pattern (with variants)
      
      @see [@atoms/buttons/button](https://mayflower.digital.mass.gov/?p=atoms-button&view=c)
    `)(() => {
      const defaultOutline = false;
      const props = {
        theme: select('button.theme', buttonOptions.theme),
        type: select('button.type', buttonOptions.type),
        size: select('button.size', buttonOptions.size),
        outline: boolean('button.outline', defaultOutline),
        info: text('button.info', 'this will be the tooltip text on hover'),
        buttonText: text('button.text', 'button'),
        href: text('button.href', '')
      };

      return(
        <Button {...props} />
      );
    })
  );
