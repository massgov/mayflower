import { text, select } from '@storybook/addon-knobs';

const levelOptions = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6
};

export default {
  title: (value) => text('sidebarHeading.title', value),
  level: (value) => select('sidebarHeading.level', levelOptions, value)
};
