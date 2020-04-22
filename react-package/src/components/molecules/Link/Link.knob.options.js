import { text } from '@storybook/addon-knobs';

export default {
  info: (value) => text('info', value),
  text: () => text('linkText', 'Lorem ipsum dolor sit amet'),
  href: (value) => text('href', value),
  icon: (value) => text('icon', value)
};
