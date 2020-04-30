import { addDecorator, addParameters } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';

const storyKindOrder = [
  'about', // storyKindOrder.indexOf -1 follow alphabetical order
  'brand', // storyKindOrder.indexOf -1 follow alphabetical order
  'dataviz', // storyKindOrder.indexOf -1 follow alphabetical order
  'forms|atoms',
  'forms|molecules',
  'forms|organisms',
  'forms|context',
  'atoms',
  'molecules',
  'organisms',
  'templates',
  'pages'
];

addParameters({
  options: {
    storySort: (a, b) => {
      const aKind = a[1].kind.split('/')[0];
      const bKind = b[1].kind.split('/')[0];
      return (storyKindOrder.indexOf(aKind) - storyKindOrder.indexOf(bKind)) || a[1].id.toLowerCase().localeCompare(b[1].id.toLowerCase(), undefined, { numeric: true });
    }
  }
});

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
          bottom: 0,
          right: 0,
          top: 'unset',
          borderRadius: '5px 0 0 0',
        }
      }
    }
  })
);

addDecorator(withA11y);
