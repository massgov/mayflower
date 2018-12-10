import { text, boolean, select } from '@storybook/addon-knobs/react';

const levelOptions = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6
};

export default {
  title: () => text('compHeading.title', 'Title text'),
  titleContext: (value) => text('compHeading.titleContext', value),
  id: (value) => text('compHeading.id', value),
  sub: (value) => boolean('compHeading.sub', value),
  level: (value) => select('compHeading.level', levelOptions, value),
  color: (value) => select('compHeading.color', { '': 'green (default)', yellow: 'yellow' }, value),
  centered: (value) => boolean('compHeading.centered', value),
  sidebar: (value) => boolean('compHeading.sidebar', value),
  visuallyHidden: (value) => boolean('compHeading.visuallyHidden', value)
};
