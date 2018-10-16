import { text } from '@storybook/addon-knobs/react';

export default {
  info: (value) => text('info', value),
  text: (value) => text('linkText', value),
  href: (value) => text('href', value),
  icon: (value) => text('icon', value)
};
