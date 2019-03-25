import {configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
  addDecorator(
    withInfo({
      styles: {
        button: {
          base: {
            fontFamily: 'sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            display: 'block',
            position: 'fixed',
            border: 'none',
            background: '#14558f',
            color: '#fff',
            padding: '5px 15px',
            cursor: 'pointer',
          },
          topRight: {
            top: 0,
            right: 0,
            borderRadius: '0 0 0 5px',
          }
        }
      }
    })
  );
  addDecorator(withA11y);
}
configure(loadStories, module);

