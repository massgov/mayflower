import { text, boolean } from '@storybook/addon-knobs';

export default {
  info: (value) => text('info', value),
  text: (value) => text('linkText', value),
  href: (value) => text('href', value),
  showFileIcon: (value) => boolean('showFileIcon', value)
};
