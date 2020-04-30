import { text, boolean, select } from '@storybook/addon-knobs';

const levelOptions = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6
};

export default {
  title: () => text('CompHeading: title', 'Title text', 'CompHeading'),
  titleContext: (value) => text('CompHeading: titleContext', value, 'CompHeading'),
  id: (value) => text('CompHeading: id', value, 'CompHeading'),
  sub: (value) => boolean('CompHeading: sub', value, 'CompHeading'),
  level: (value) => select('CompHeading: level', levelOptions, value, 'CompHeading'),
  color: (value) => select('CompHeading: color', { 'green (default)': '', yellow: 'yellow', gray: 'gray' }, value, 'CompHeading'),
  centered: (value) => boolean('CompHeading: centered', value, 'CompHeading'),
  sidebar: (value) => boolean('CompHeading: sidebar', value, 'CompHeading')
};
