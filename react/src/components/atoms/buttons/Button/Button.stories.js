import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import Button from './index';
import ButtonDocs from './Button.md';
import buttonOptions from './Button.knobs.options';

storiesOf('atoms/buttons', module).addDecorator(withKnobs)
  .add('Button', withInfo(`<div>${ButtonDocs}</div>`)(() => {
    const props = {
      usage: select('button.usage', buttonOptions.usage),
      theme: select('button.theme', buttonOptions.theme),
      type: select('button.type', buttonOptions.type),
      size: select('button.size', buttonOptions.size),
      info: text('button.info', 'this will be the tooltip text on hover'),
      disabled: boolean('button.disabled', false),
      text: text('button.text', 'Button'),
      href: text('button.href', ''),
      onClick: action('button clicked')
    };
    return(
      <Button {...props} />
    );
  }));
