import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

const Color = (color) => {
  <div className={`color-swatch ${color}`}></div>
};

storiesOf('base', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Colors', (() => {
      const props = {
        text: text('text', 'This is just a placeholder for templates')
      };
      return(<Color {...props} />);
    }));
