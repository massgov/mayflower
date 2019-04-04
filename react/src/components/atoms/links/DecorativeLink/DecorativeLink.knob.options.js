import { text, boolean } from '@storybook/addon-knobs';

export default {
  info: (value) => text('DecorativeLink: info', value, 'DecorativeLink'),
  text: (value) => text('DecorativeLink: linkText', value, 'DecorativeLink'),
  href: (value) => text('DecorativeLink: href', value, 'DecorativeLink'),
  showFileIcon: (value) => boolean('DecorativeLink: showFileIcon', value, 'DecorativeLink')
};
