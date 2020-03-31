import { create } from '@storybook/theming/create';
import logo from './mayflower-react-logo.png';

export default create({
  base: 'dark',

  colorPrimary: 'hotpink',
  colorSecondary: '#14558F',

  // UI
  appBg: '#F2F2F2',
  appContentBg: 'silver',
  appBorderColor: '#DCDCDC',
  appBorderRadius: 6,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#707070',
  barSelectedColor: '#14558F',
  barBg: 'red',

  // Form colors
  inputBg: 'white',
  inputBorder: '#DCDCDC',
  inputTextColor: '#141414',
  inputBorderRadius: 4,

  brandTitle: 'Mayflower React',
  brandUrl: 'https://github.com/massgov/mayflower',
  brandImage: logo,
});